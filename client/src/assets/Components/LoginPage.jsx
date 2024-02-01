import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const LoginPage = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Call the login function from the AuthContext
            await login(username, password);
            navigate('/')
            // Redirect or perform any other actions after successful login
        } catch (error) {
            // Handle login error
        }
    };

    return (

        <body className="login-body">
        <div className="login-container">
            <div className="login-form">
    
                <form className="inputs" onSubmit={handleLogin}>
    
                    <label htmlFor="username" className="login-label">Username:</label>
                    <input type="text" id="username" name="username" className="login-input" required
                        placeholder="Vendos emrin e përdoruesit" onChange={(e)=>setUsername(e.target.value)}/>
                 
    
                    <label htmlFor="password" className="login-label">Fjalëkalimin:</label>
                    <div className="login-password-container">
                        <input type="password" id="password" name="password" className="login-input" required
                            placeholder="Vendos fjalëkalimin" onChange={(e)=>setPassword(e.target.value)}>
                       </input>
                   
                    </div>
    
                    <button className="login-button">Hyr</button>
                </form>
            </div>
            <div className="blue-banner">
    
            </div>
        </div>
    
   
    
    </body>
    
    );
};

export default LoginPage;