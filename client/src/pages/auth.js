import React, { useState } from 'react';
import axios from 'axios';
import {useCookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';

export const Auth = () => { 
    return (
        <div className="auth">
            <Login />
            <Register />
        </div>
    );
}

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [_,setCookies] = useCookies(["access_token"])
    const navigate = useNavigate();

    const onSubmit= async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/auth/login', {username, password});
            console.log(response);
            setCookies("access_token", response.data.token);
            window.localStorage.setItem("userID",response.data.user.id);
            navigate('/');

        } catch (error) {
            console.log(error);
        }   
    }

    return <Form username={username}
                 setUsername={setUsername}
                 password={password} 
                 setPassword={setPassword} 
                 Label='Login'  
                 onSubmit={onSubmit}/>
}

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/auth/register', {username, password});
            alert("Registered successfully, Now you can login!")
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return <Form username={username} 
                 setUsername={setUsername} 
                 password={password} 
                 setPassword={setPassword} 
                 Label='Register'
                 onSubmit={onSubmit} />
}
const Form = ({username, setUsername, password, setPassword, Label , onSubmit}) => {
    return (
        <div className='auth-container'>
            <form onSubmit={onSubmit}>
                <h1>{Label}</h1>
                <div className='form-group'>
                    <label htmlFor='username'>Username</label>
                    <input type='text' id='username' value = {username} onChange={(e) => setUsername(e.target.value)} />
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password'  value={password} onChange={(e) => setPassword(e.target.value)} />
                    
                </div>
                <button type='submit'>{Label}</button>
            </form>

        </div>
    )
}
