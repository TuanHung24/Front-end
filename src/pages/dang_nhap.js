//import { NavLink } from 'react-router-dom';
import '../bootstrap-5.2.3-dist/css/bootstrap.min.css';
import '../App';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

function DangNhap() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const token = localStorage.getItem('token');
  const handleLogin = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/dang-nhap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Lưu token vào local storage hoặc context để sử dụng trong ứng dụng
        console.log('Token:', data.token);
      } else {
        console.error('Login failed:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <>
      <div className="row d-flex justify-content-center">
                <div className="col-12 col-md-8 col-lg-6 col-xl-6">
                    <div className="card shadow-2-strong">
                        <div className="card-body p-5 text-center">
                            <h3 className="mb-5">Sign in</h3>

                            <div className="form-outline mb-4">
                                <input
                                    type="email"
                                    id="typeEmailX-2"
                                    name='email'
                                    className="form-control form-control-lg"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label className="form-label" htmlFor="typeEmailX-2">
                                    Email
                                </label>
                                <div className="form-notch">
                                    <div className="form-notch-leading"></div>
                                    <div className="form-notch-middle"></div>
                                    <div className="form-notch-trailing"></div>
                                </div>
                            </div>

                            <div className="form-outline mb-4">
                                <input
                                    type="password"
                                    name='password'
                                    id="typePasswordX-2"
                                    className="form-control form-control-lg"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <label className="form-label" htmlFor="typePasswordX-2">
                                    Password
                                </label>
                                <div className="form-notch">
                                    <div className="form-notch-leading"></div>
                                    <div className="form-notch-middle"></div>
                                    <div className="form-notch-trailing"></div>
                                </div>
                            </div>

                            <div className="form-check d-flex justify-content-start mb-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="form1Example3"
                                />
                                <label className="form-check-label" htmlFor="form1Example3">
                                    Remember password
                                </label>
                            </div>

                            <button
                                className="btn btn-primary btn-lg btn-block mb-3"
                                type="button"
                                onClick={handleLogin}
                            >
                                Login
                            </button>
                            <p>
                                Don't have an account?{' '}
                                <NavLink className="btn btn-primary btn-lg btn-block" to="/dang-ky">
                                    Sign up
                                </NavLink>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
    </>
  )
}
export default DangNhap;