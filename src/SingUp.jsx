// SignUp.jsx

import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import styles from './SignUp.module.css';
import AxiosService from './common/ApiService';
import { toast } from 'react-toastify';
import { useNavigate,Link  } from 'react-router-dom';

function SignUp() {
  const [inputVal, setInputVal] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputVal((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (inputVal.password !== inputVal.confirmPassword) {
        toast.error('Password and Confirm Password do not match.');
        return;
      }

      const response = await AxiosService.post(`users/createUser`, inputVal);

      // Handle the response as needed
      toast.success(response.data.message);
      navigate('/');

    } catch (error) {
      console.error('Error creating User:', error);
      // Handle error, show a message, etc.
      toast.error(error.response?.data?.message || 'Error occurred');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
    
      <form onSubmit={handleSubmit} className={styles.formContainer}>
          <h1 className={styles.signupContainer}>SignUp</h1>
        <label htmlFor="username">UserName:</label>
        <input className={styles.signupinput}
          type="text"
          value={inputVal.username}
          name="username"
          onChange={handleChange}
        />
        <label htmlFor="email">Email:</label>
        <input className={styles.signupinput}
          type="email"
          value={inputVal.email}
          name="email"
          onChange={handleChange}
        />
        <label htmlFor="password">Password:</label>
        <div className={styles.passwordInputContainer}>
          <input className={styles.signupinput}
            type={showPassword ? 'text' : 'password'}
            value={inputVal.password}
            name="password"
            onChange={handleChange}
          />
          <span  className={styles.signupspan}onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <div className={styles.passwordInputContainer}>
          <input className={styles.signupinput}
            type={showConfirmPassword ? 'text' : 'password'}
            value={inputVal.confirmPassword}
            name="confirmPassword"
            onChange={handleChange}
          />
          <span  className={styles.signupspan}onClick={toggleConfirmPasswordVisibility}>
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <button type="submit">Signup</button>
        <p>
        Already have an account? <Link to="/">Sign In</Link>
      </p>
      </form>
      
    </>
  );
}

export default SignUp;
