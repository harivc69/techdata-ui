import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  // Mock data: predefined usernames and passwords
  const mockData = [
    { username: 'sabica', password: 'sabica@123' },
    { username: 'Alshuhada', password: 'Adminpass' },
    { username: 'user3', password: 'password3' },
    { username: 'user4', password: 'password4' },
  ];

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Use navigate hook from react-router-dom
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if the entered credentials match any in mockData
    const user = mockData.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      // If credentials match, navigate to the home page
      setSuccessMessage('Login successful!');
      setErrorMessage('');
      navigate('/home'); // This will redirect to the /home page
    } else {
      // If credentials don't match, show error message
      setErrorMessage('Invalid username or password.');
      setSuccessMessage('');
    }

    // Clear the input fields after submission
    setUsername('');
    setPassword('');
  };

  return (
    <div className="login-container" style={styles.container}>
      <div style={{display:'block'}}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="username" style={styles.label}>
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.button}>Login</button>
      </form>
      {errorMessage && <div style={styles.error}>{errorMessage}</div>}
      {successMessage && <div style={styles.success}>{successMessage}</div>}
    </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f7f7f7',
  },
  form: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '300px',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  error: {
    color: 'red',
    marginBottom: '15px',
    fontWeight: 'bold',
  },
  success: {
    color: 'green',
    marginBottom: '15px',
    fontWeight: 'bold',
  },
};

export default LoginPage;
