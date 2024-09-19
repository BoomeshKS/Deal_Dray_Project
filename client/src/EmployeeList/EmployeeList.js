import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './listemp.css'

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const num = employees.length

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/listemployees');
      const sortedEmployees = response.data.sort((a, b) => new Date(b.dateOfRegistration) - new Date(a.dateOfRegistration));
      setEmployees(sortedEmployees);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/listemployees/${id}`);
      setEmployees(employees.filter(employee => employee._id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleEdit = (employee) => {
    navigate(`/edit-employee/${employee._id}`, { state: { employee } });
  };
  

  return (
  <div className="list-container">
    <h1>Employee List</h1>
    <h2 style={{position:"relative", top:"50px",left:"50px", right:"50px"}}>
      Total Count : {num}
    </h2>
    <Link to="/registeremployee" style={{textDecoration:"none", fontFamily:"Poppins", position:"relative", right:"12px", bottom:"12px",float:"right", backgroundColor:"white", padding:"10px 50px", borderRadius:"10px", fontSize:"20px",fontWeight:"bold",color:"black",}}>Create Employee</Link>
    <input 
      type="text" 
      placeholder="Enter Search Keyword" 
      value={searchTerm} 
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <table className="list-table">
      <thead>
        <tr>
          <th>Unique No</th>
          <th>Image</th>
          <th>Name</th>
          <th>Email</th>
          <th>Mobile No</th>
          <th>Designation</th>
          <th>Gender</th>
          <th>Course</th>
          <th>Create date</th>
          <th>Action</th>
        </tr>
      </thead>
      {num===0 &&
      <h1 style={{position:"relative" ,textAlign:"center"}}>No Employee Details</h1>}
      <tbody>
        {employees
          .filter(employee => 
            employee.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((employee, index) => (
            <tr key={employee._id}>
              <td>{index + 1}</td>
              <td><img src={`http://localhost:5000/uploads/${employee.imgPath}`} alt={employee.name} width="50" /></td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.mobile}</td>
              <td>{employee.designation}</td>
              <td>{employee.gender}</td>
              <td>{employee.course.join(', ')}</td>
              <td>{employee.dateOfRegistration}</td>
              <td className="action-buttons">
                  <button className="edit-button" onClick={() => handleEdit(employee)}>Edit</button>
                  <button className="delete-button" onClick={() => deleteEmployee(employee._id)}>Delete</button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>

  );
};

export default EmployeeList;
