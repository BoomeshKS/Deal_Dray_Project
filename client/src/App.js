import './App.css';
import Navbar from './Navbar/Navbar';
import Home from './Dashboard/Home';
import Login from './LoginPage/Login';
import RegisterEmployee from './EmployeeDetails/RegisterEmployee';
import EmployeeList from './EmployeeList/EmployeeList';
import EditEmployee from './EmployeeList/EditEmployee';
import { BrowserRouter,Route, Routes } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
      <Route path='/' element={<Home/>} />
      <Route
        path='/login'
        element={<Login/>}
      />
      <Route path='/registeremployee' exact element={<RegisterEmployee/>} />
      <Route path="/employeelist"  exact element={<EmployeeList/>} />
      <Route path="/edit-employee/:id"  exact element={<EditEmployee/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
