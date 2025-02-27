import { FC, SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import { RegisterUI } from '@ui-pages';
import { useUserStore } from 'services';

export const Register: FC = () => {
  const navigate = useNavigate();
  const { error, register: registerUser } = useUserStore();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const payload = {
      email,
      password,
      name: userName
    };
    await registerUser(payload);
    if (!error) navigate('/login', { replace: true });
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
