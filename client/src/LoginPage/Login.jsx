import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the toast CSS
import './login.css';

const Login = () => {
  const [sign, setSign] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState("");
  const [loginuser, setLoginuser] = useState('');
  const [loginpass, setLoginpass] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (loginuser && loginpass) {
      try {
        const response = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: loginuser, password: loginpass }),
        });

        const data = await response.json();

        if (data.success) {
          toast.success('Login Successful!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          localStorage.setItem('username', loginuser);
          setTimeout(() => {
            navigate('/');
          }, 3000); // Navigate after 3 seconds (when toast auto-closes)
        } else {
          toast.error(data.message || 'Login failed', {
            position: "top-right",
            autoClose: 3000,
          });
        }
      } catch (err) {
        console.error('Error:', err);
        toast.error('Error occurred during login', {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } else {
      toast.error("Please Enter the username and password", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (username && password) {
      try {
        const response = await fetch('http://localhost:5000/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (data.success) {
          toast.success('Signup Successful!', {
            position: "top-right",
            autoClose: 3000,
          });
          setSign(false);
          navigate('/login');
        } else {
          toast.error(data.message || 'Signup failed', {
            position: "top-right",
            autoClose: 3000,
          });
        }
      } catch (err) {
        console.error('Error:', err);
        toast.error('Error occurred during signup', {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } else {
      toast.error("Please fill all the fields", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const Pageopen = () => {
    setSign(true);
  };

  return (
    <div>
      <ToastContainer />
      <div className="log-container">
        {!sign && (
          <section>
            <h1 className="log-title">Login Page</h1>
            <form onSubmit={handleLoginSubmit}>
              <div className="log-input-container">
                <i className="fas fa-user log-input-icon"></i>
                <input
                  type="text"
                  value={loginuser}
                  onChange={(e) => setLoginuser(e.target.value)}
                  className="log-input"
                  placeholder="Username"
                  required
                />
              </div>
              <div className="log-input-container">
                <i className="fas fa-lock log-input-icon"></i>
                <input
                  type="password"
                  value={loginpass}
                  onChange={(e) => setLoginpass(e.target.value)}
                  className="log-input"
                  placeholder="Password"
                  required
                />
              </div>
              <button type="submit" className="log-button">Login</button>
              <button type="button" onClick={Pageopen} className="log-alt-button">Signup</button>
            </form>
          </section>
        )}
        {sign && (
          <section>
            <h1 className="log-title">Signup Page</h1>
            <form onSubmit={handleSignupSubmit}>
              <div className="log-input-container">
                <i className="fas fa-user log-input-icon"></i>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="log-input"
                  placeholder="Username"
                  required
                />
              </div>
              <div className="log-input-container">
                <i className="fas fa-lock log-input-icon"></i>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="log-input"
                  placeholder="Password"
                  required
                />
              </div>
              <button type="submit" className="log-button">Signup</button>
              <button
                type="button"
                onClick={() => setSign(false)}
                className="log-alt-button"
              >
                Back to login
              </button>
            </form>
          </section>
        )}
      </div>
    </div>
  );
};

export default Login;
