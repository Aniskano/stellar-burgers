import { FC, SyntheticEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { LoginUI } from '@ui-pages';
import { useUserStore } from 'services';

export const Login: FC = () => {
  const navigate = useNavigate();
  const { error, login: loginUser, fetch: fetchUser } = useUserStore();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!email || !password) return;

    try {
      await loginUser({ email, password });
      await fetchUser();
      const from = location.state?.from || { pathname: '/' };
      navigate(from);
    } catch (err) {
      console.error(
        `Failed to complete the request: ${(err as Error).message}`
      );
    }
  };

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
