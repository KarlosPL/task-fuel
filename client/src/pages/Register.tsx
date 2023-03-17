import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RiShieldUserLine } from 'react-icons/ri';
import Field from '../components/Forms/Field';
import Header from '../components/Forms/Header';
import SubmitButton from '../components/Forms/SubmitButton';
import Section from '../components/Forms/Section';
import Redirect from '../components/Forms/Redirect';
import DisplayError from '../services/utils/DisplayError';
import background from '../assets/images/landscape2.jpg';
import '../assets/styles/pages/LoginAndRegister.scss';


interface RegisterValues {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [registerValues, setRegisterValues] = useState<RegisterValues>({
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  const [error, setError] = useState<any | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRegisterValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (registerValues.password !== registerValues.repeatPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/api/register', registerValues, { responseType: 'json' });
      if (response.status >= 200 && response.status < 300) {
        navigate('/login');
      } else {
        const data = await response.data;
        setError(data.message);
      }
    } catch (error: any) {
      if (error.response.data) setError(error.response.data.message);
      else setError('An error occured while registering');
    }
  };

  return (
    <div className="Register" style={{ backgroundImage: `url(${background})` }}>
      <div className="Register--main">
        <Section id={1}>
          <RiShieldUserLine />
          <Redirect desc="Sign In" link="/login" />
        </Section>
        <Section id={2}>
          <form
            className="gap-y-4"
            onSubmit={handleRegister}
            autoComplete="off"
          >
            <Header title="Member Register" />
            <Field
              type="username"
              name="username"
              label="Username"
              value={registerValues.username}
              placeholder="Type your username"
              onChange={handleInputChange}
            />
            <Field
              type="email"
              name="email"
              label="Email address"
              value={registerValues.email}
              placeholder="Type your email"
              onChange={handleInputChange}
            />
            <Field
              type="password"
              name="password"
              label="Password"
              value={registerValues.password}
              placeholder="Type your password"
              onChange={handleInputChange}
            />
            <Field
              type="password"
              name="repeatPassword"
              label="Repeat password"
              value={registerValues.repeatPassword}
              placeholder="Repeat your password"
              onChange={handleInputChange}
            />
            <DisplayError error={error} />
            <SubmitButton label="Register" />
          </form>
        </Section>
      </div>
    </div>
  );
};

export default Register;
