import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { faSave, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const EditEmployee = () => {
  const { state } = useLocation();
  const { employee: initialEmployee } = state;
  const { id } = useParams();


  const [employee, setEmployee] = useState({
    name: initialEmployee.name,
    email: initialEmployee.email,
    mobile: initialEmployee.mobile,
    designation: initialEmployee.designation,
    gender: initialEmployee.gender,
    course: initialEmployee.course.join(','),
    imgPath: initialEmployee.imgPath, 
  });
  const [newImage, setNewImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployeeDetails();
  }, []);

  const fetchEmployeeDetails = async () => {
    try {
      const response = await axios.get(`/api/employees/${id}`);
      setEmployee(response.data);
    } catch (error) {
      console.error('Error fetching employee details:', error);
    }
  };

  const handleInputChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', employee.name);
    formData.append('email', employee.email);
    formData.append('mobile', employee.mobile);
    formData.append('designation', employee.designation);
    formData.append('gender', employee.gender);
    formData.append('course', employee.course);
    if (newImage) {
      formData.append('imgUpload', newImage);
    }

    try {
      await axios.put(`http://localhost:5000/api/listemployees/${id}`, formData);
      navigate('/employeelist');
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };


  return (
    <div className="edit-form-container">

      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          className="edit-input"
          value={employee.name}
          onChange={handleInputChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          className="edit-input"
          value={employee.email}
          onChange={handleInputChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="mobile"
          className="edit-input"
          value={employee.mobile}
          onChange={handleInputChange}
          placeholder="Mobile"
        />
        <input
          type="text"
          name="designation"
          className="edit-input"
          value={employee.designation}
          onChange={handleInputChange}
          placeholder="Designation"
        />
        <input
          type="text"
          name="gender"
          className="edit-input"
          value={employee.gender}
          onChange={handleInputChange}
          placeholder="Gender"
        />
        <input
          type="text"
          name="course"
          className="edit-input"
          value={employee.course}
          onChange={handleInputChange}
          placeholder="Course"
        />
        <div className="edit-image-preview">
          <img
            src={`http://localhost:5000/uploads/${employee.imgPath}`}
            alt={employee.name}
          />
        </div>
        <input
          type="file"
          className="edit-file-input"
          onChange={handleFileChange}
        />
        <button type="submit" className="edit-button">
          Save Changes
        </button>
      </form>

      <div className="edit-icons-container">
        <span className="edit-icon edit-save-icon" title="Save">
          <FontAwesomeIcon icon={faSave} />
        </span>
        <span className="edit-icon edit-delete-icon" title="Delete">
          <FontAwesomeIcon icon={faTrash} />
        </span>
        <span className="edit-icon edit-upload-icon" title="Upload">
          <FontAwesomeIcon icon={faUpload} />
        </span>
      </div>
    </div>
  );
};

export default EditEmployee;
