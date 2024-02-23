import React, { useState } from 'react';
import styles from './SignIn.module.css'; // Import the CSS module
import AxiosService from './common/ApiService';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

function SignIn() {
  const [inputValues, setInputValues] = useState({
    email: '',
    password: '',
  });
  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res = await AxiosService.post('users/login', {
        email: inputValues.email,
        password: inputValues.password,
      });

      if (res && res.data && res.status === 200) {
        toast.success(res.data.message);
        sessionStorage.setItem('token', res.data.token);
        sessionStorage.setItem('userData', JSON.stringify(res.data.userData));
        // Assuming you have imported the 'useNavigate' hook
        // and have it declared using 'const navigate = useNavigate();'
        navigate('/todo');
      } else {
        toast.error('Unexpected response format');
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Error Occurred! Please try again later'
      );
    }
  };

  return (
    <>
         <div className={styles['signin-container']}>
        <h2>SignIn</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            value={inputValues.email}
            name="email"
            onChange={handleChange}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            value={inputValues.password}
            name="password"
            onChange={handleChange}
          />
          <button type="submit">SignIn</button>
        </form>
        <p>
          Don't have an account?{' '}
          <Link to="/signup">Signup</Link>
        </p>
      </div>
    </>
  );
}

export default SignIn;
