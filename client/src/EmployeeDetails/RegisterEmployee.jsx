import React, { useState } from 'react';
import axios from 'axios';
import './emp.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const RegisterEmployee = () => {

    const navigate = useNavigate()



  const [formData, setFormData] = useState({
      name: '',
      email: '',
      mobile: '',
      designation: '',
      gender: '',
      course: [],
      imgUpload: null
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      if (type === 'checkbox') {
          setFormData((prevData) => ({
              ...prevData,
              course: checked
                  ? [...prevData.course, value]
                  : prevData.course.filter((course) => course !== value)
          }));
      } else if (type === 'file') {
          setFormData({ ...formData, imgUpload: e.target.files[0] });
      } else {
          setFormData({ ...formData, [name]: value });
      }
  };

  const validateForm = () => {
      const { name, email, mobile, imgUpload } = formData;
      const emailRegex = /\S+@\S+\.\S+/;
      const mobileRegex = /^\d+$/;

      if (!name || !email || !mobile || !imgUpload) {
          setError('All fields are required.');
          return false;
      }
      if (!emailRegex.test(email)) {
          setError('Invalid email format.');
          return false;
      }
      if (!mobileRegex.test(mobile)) {
          setError('Mobile number must be numeric.');
          return false;
      }
      setError('');
      return true;
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validateForm()) return;
      const currentDate = new Date().toISOString();

      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
          if (Array.isArray(value)) {
              value.forEach((val) => formDataToSend.append(key, val));
          } else {
              formDataToSend.append(key, value);
          }
      });

      formDataToSend.append('dateOfRegistration', currentDate);

      try {
          const response = await axios.post('http://localhost:5000/api/employees', formDataToSend, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          });
          console.log(response.data);
          toast.success('Employee Data Saved Successfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          });          
          navigate('/employeelist')
      } catch (error) {
          console.error('Error submitting form', error);
      }
  };



  return (
    <div>
        
        <div className='emp-head'>
        <ToastContainer/>
            <h1>Employee Registration Page</h1>
            <section className="emp-container">
                <form className="emp-form" onSubmit={handleSubmit}>
                    <div className="emp-field">
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="emp-field">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="emp-field">
                        <label>Mobile No:</label>
                        <input
                            type="text"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="emp-field">
                        <label>Designation:</label>
                        <select
                            name="designation"
                            value={formData.designation}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select</option>
                            <option value="HR">HR</option>
                            <option value="Manager">Manager</option>
                            <option value="Sales">Sales</option>
                        </select>
                    </div>

                    <div className="emp-field">
                        <label>Gender:</label>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="Male"
                                checked={formData.gender === 'Male'}
                                onChange={handleChange}
                            />
                            Male
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={formData.gender === 'Female'}
                                onChange={handleChange}
                            />
                            Female
                        </label>
                    </div>

                    <div className="emp-field">
                        <label>Course:</label>
                        <label>
                            <input
                                type="checkbox"
                                name="course"
                                value="MCA"
                                checked={formData.course.includes('MCA')}
                                onChange={handleChange}
                            />
                            MCA
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="course"
                                value="BCA"
                                checked={formData.course.includes('BCA')}
                                onChange={handleChange}
                            />
                            BCA
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="course"
                                value="BSC"
                                checked={formData.course.includes('BSC')}
                                onChange={handleChange}
                            />
                            BSC
                        </label>
                    </div>

                    <div className="emp-field">
                        <label>Image Upload:</label>
                        <input
                            type="file"
                            name="imgUpload"
                            accept="image/jpeg, image/png"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {error && <p className="emp-error">{error}</p>}

                    <div className="emp-field">
                        <button type="submit" className="emp-submit">
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </div>
    </div>
  )
}

export default RegisterEmployee