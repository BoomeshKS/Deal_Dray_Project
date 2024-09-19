const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    course: {
        type: [String],
        required: true,
    },
    imgPath: { type: String, required: true },
    dateOfRegistration: { type: Date, default: Date.now },

});

const Employee = mongoose.model('Employee', EmployeeSchema);


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir); // store in uploads folder
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`; // use unique name
    cb(null, uniqueName); // store only the file name
  },
});


const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
    if (mimeType && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only .jpeg, .jpg, .png formats allowed!'));
    }
  },
});


app.post('/api/employees', upload.single('imgUpload'), async (req, res) => {
    try {
        const { name, email, mobile, designation, gender, course, dateOfRegistration  } = req.body;

        if (!req.file) {
          return res.status(400).json({ message: 'Image is required.' });
        }

        const imgPath = req.file.filename;
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({ message: 'Employee with this email already exists.' });
        }

        const newEmployee = new Employee({
            name,
            email,
            mobile,
            designation,
            gender,
            course: course.split(','), 
            imgPath,
            dateOfRegistration,
        });

        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.get('/api/listemployees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

app.put('/api/listemployees/:id', upload.single('imgUpload'), async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, course } = req.body;
    let imgPath = req.body.imgPath;

    if (req.file) {
      imgPath = req.file.filename;
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, email, mobile, designation, gender, course: course.split(','), imgPath },
      { new: true }
    );

    res.json(updatedEmployee);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

app.delete('/api/listemployees/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});




const userSchema = new mongoose.Schema({
    username: String,
    password: String,
  });
  
const User = mongoose.model('User', userSchema);


app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username });
      if (user && user.password === password) {
        res.json({ success: true, message: 'Login successful' });
      } else {
        res.json({ success: false, message: 'Invalid credentials' });
      }
    } catch (err) {
      res.json({ success: false, message: 'Error occurred' });
    }
  });



app.post('/api/signup', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const userExists = await User.findOne({ username });
      if (userExists) {
        return res.json({ success: false, message: 'User already exists' });
      }
  
      const newUser = new User({ username, password });
      await newUser.save();
      res.json({ success: true, message: 'Signup successful' });
    } catch (err) {
      res.json({ success: false, message: 'Error occurred' });
    }
  });
  


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
