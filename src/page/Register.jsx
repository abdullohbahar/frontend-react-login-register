import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  // Validation
  const [validation, setValidation] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/home');
    }
  }, []);

  const registerHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('password_confirmation', passwordConfirmation);

    await axios
      .post('http://127.0.0.1:8000/api/auth/register', formData)
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        setValidation(error.response.data);
        console.log(error.response.data);
      });
  };

  return (
    <div className="container">
      <div className="d-flex align-items-center" style={{ height: '100vh' }}>
        <div style={{ width: '100%' }}>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">Register</div>
                <div className="card-body">
                  <form onSubmit={registerHandler}>
                    <div className="mb-3">
                      <label htmlFor="fullname" className="form-label">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="fullname"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      {validation.name && (
                        <small className="text-danger">
                          {validation.name[0]}
                        </small>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {validation.email && (
                        <small className="text-danger">
                          {validation.email[0]}
                        </small>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {validation.password && (
                        <small className="text-danger">
                          {validation.password[0]}
                        </small>
                      )}
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="password_confirmation"
                        className="form-label"
                      >
                        Password Confirmation
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password_confirmation"
                        value={passwordConfirmation}
                        onChange={(e) =>
                          setPasswordConfirmation(e.target.value)
                        }
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Daftar
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
