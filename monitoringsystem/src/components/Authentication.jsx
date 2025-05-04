import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/authentication.css';  // Assuming the CSS is saved as auth.css

const Authentication = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'password') {
      // Successful login (you can redirect or do other logic here)
      navigate('/home');
     
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            className="auth-input" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
          <input 
            type="password" 
            className="auth-input" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" className="auth-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Authentication;
