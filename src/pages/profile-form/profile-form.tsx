import { FC, SyntheticEvent, useEffect, useState, ChangeEvent } from 'react';
import { Preloader } from '@ui';
import { ProfileFormUI } from '@ui-pages';
import { useUserStore } from 'services';

export const ProfileForm: FC = () => {
  const { user, error, update: updateUser } = useUserStore();
  const name = user?.name ?? '';
  const email = user?.email ?? '';
  const [formValue, setFormValue] = useState({ name, email, password: '' });

  useEffect(() => {
    setFormValue((state) => ({ ...state, name, email }));
  }, [name, email]);

  if (!user) return <Preloader />;

  const isFormChanged =
    formValue.name !== name ||
    formValue.email !== email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    updateUser(formValue);
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({ ...user, password: '' });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileFormUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      updateUserError={error || ''}
    />
  );
};
