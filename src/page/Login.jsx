import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Validation
  const [validation, setValidation] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/home');
    }
  }, []);

  const loginHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('email', email);
    formData.append('password', password);

    await axios
      .post('http://127.0.0.1:8000/api/auth/login', formData)
      .then((response) => {
        localStorage.setItem('token', response.data.access_token);

        navigate('/home');
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
                <div className="card-header">Login</div>
                <div className="card-body">
                  {validation.error && (
                    <div className="alert alert-danger" role="alert">
                      {validation.error}
                    </div>
                  )}
                  <form onSubmit={loginHandler}>
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
                    <button type="submit" className="btn btn-primary">
                      Masuk
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

export default Login;
