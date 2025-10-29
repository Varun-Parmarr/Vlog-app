import { useState } from 'react';
import axios from 'axios';

 function SignIn() {
   
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const dataToSend = { username, password };

    try {
      const response = await axios.post('http://localhost:4000/signup', dataToSend);
      console.log("SIGNIN SUCCESSFUL", response.data);

      
    } catch (error) {
      console.log("Sign in error", error);
      if (error.response && error.response.data && error.response.data.msg) {
        setErrorMessage(error.response.data.msg);
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
          <div className='flex items-center justify-center mt-4'>
          <h2> This page is for SIGN IN</h2>
          </div>
        
        
        <div className='flex items-center justify-center p-3'>
          <label for="username"><b>Username:</b> </label>
          <input
            type="text"
            id="username"
            value={username}
            className='bg-blue-100 border-2 border-black'
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>

        <div className='flex items-center justify-center p-3 '>
          <label for="password"><b>Password:</b> </label>
          <input
            type="password"
            id="password"
            value={password}
            className='bg-blue-100 border-2 border-black'
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required
          />
        </div>
        
        <button 
    type="submit" 
    className="mx-auto block rounded-md bg-blue-500 p-2 text-white shadow hover:bg-blue-600">
    SIGNIN
</button>

      </form>
      
      {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}

    </div>
  );
}

export default SignIn;