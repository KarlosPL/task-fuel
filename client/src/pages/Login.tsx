import React, { useState } from 'react';
import Field from '../components/Forms/Field';
import Header from '../components/Forms/Header';
import SubmitButton from '../components/Forms/SubmitButton';
import Section from '../components/Forms/Section';
import { RiShieldUserFill } from 'react-icons/ri';
import Redirect from '../components/Forms/Redirect';
import '../assets/styles/pages/LoginAndRegister.scss';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import background from "../assets/images/landscape1.jpg";
import DisplayError from '../services/utils/DisplayError';
import axios from 'axios';

interface LoginValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [loginValues, setLoginValues] = useState<LoginValues>({
    email: '',
    password: '',
  });

  const navigate: NavigateFunction = useNavigate();

  const [error, setError] = useState<any | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/login', loginValues, { responseType: 'json' });
      if (response.data.success) {
        localStorage.setItem('authorizationToken', response.data.authorizationToken);
        navigate('/dashboard');
      } else {
        const data = await response.data;
        setError(data.message);
      }
    } catch (error: any) {
      if (error.response.data) setError(error.response.data.message);
      else setError('An error occured while logging');
    }
  };

  return (
    <div className="Login" style={{ backgroundImage: `url(${background})`}}>
      <div className="Login--main">
        <Section id={1}>
          <RiShieldUserFill />
          <Redirect desc="Sign Up" link="/register" />
        </Section>
        <Section id={2}>
          <form className='gap-y-12' onSubmit={handleLogin} autoComplete="off">
            <Header title="Member Login" />
            <Field
              type="email"
              name="email"
              label="Email address"
              value={loginValues.email}
              placeholder="Type your email"
              onChange={handleInputChange}
            />
            <Field
              type="password"
              name="password"
              label="Password"
              value={loginValues.password}
              placeholder="Type your password"
              onChange={handleInputChange}
            />
            <DisplayError error={error} />
            <SubmitButton label="Login" />
          </form>
        </Section>
      </div>
    </div>
  );
};

export default Login;
