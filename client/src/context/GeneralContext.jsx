import { createContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const GeneralContext = createContext();

const GeneralContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, setUsertype] = useState('');

  // ---------------- LOGIN ----------------
  const login = async () => {
    try {
      const loginInputs = { email, password };
      const { data } = await axios.post('http://localhost:6001/auth/login', loginInputs);

      localStorage.setItem('userId', data._id);
      localStorage.setItem('usertype', data.usertype);
      localStorage.setItem('username', data.username);
      localStorage.setItem('email', data.email);

      if (data.usertype === 'freelancer') navigate('/freelancer');
      else if (data.usertype === 'client') navigate('/client');
      else if (data.usertype === 'admin') navigate('/admin');
    } catch (err) {
      alert('Login failed!!');
      console.error(err);
    }
  };

  // ---------------- REGISTER ----------------
  const register = async () => {
    try {
      const inputs = { username, email, password, usertype };
      const { data } = await axios.post('http://localhost:6001/auth/register', inputs);

      localStorage.setItem('userId', data._id);
      localStorage.setItem('usertype', data.usertype);
      localStorage.setItem('username', data.username);
      localStorage.setItem('email', data.email);

      if (data.usertype === 'freelancer') navigate('/freelancer');
      else if (data.usertype === 'client') navigate('/client');
      else if (data.usertype === 'admin') navigate('/admin');
    } catch (err) {
      alert('Registration failed!!');
      console.error(err);
    }
  };

  // ---------------- LOGOUT ----------------
  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <GeneralContext.Provider
      value={{
        login,
        register,
        logout,
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        usertype,
        setUsertype
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
