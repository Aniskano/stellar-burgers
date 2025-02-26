import { FC } from 'react';
import { Button, Input } from '@zlden/react-developer-burger-ui-components';

import { ProfileFormUIProps } from './type';

import styles from './profile-form.module.css';
import commonStyles from '../common.module.css';

export const ProfileFormUI: FC<ProfileFormUIProps> = ({
  formValue,
  isFormChanged,
  updateUserError,
  handleSubmit,
  handleCancel,
  handleInputChange
}) => (
  <form className={styles.form} onSubmit={handleSubmit}>
    {/** @ts-expect-error: ignore typing onPointerEnterCapture/onPointerLeaveCapture events */}
    <Input
      type={'text'}
      placeholder={'Имя'}
      onChange={handleInputChange}
      value={formValue.name}
      name={'name'}
      error={false}
      errorText={''}
      size={'default'}
      icon={'EditIcon'}
    />
    {/** @ts-expect-error: ignore typing onPointerEnterCapture/onPointerLeaveCapture events */}
    <Input
      type={'email'}
      placeholder={'E-mail'}
      onChange={handleInputChange}
      value={formValue.email}
      name={'email'}
      error={false}
      errorText={''}
      size={'default'}
      icon={'EditIcon'}
    />
    {/** @ts-expect-error: ignore typing onPointerEnterCapture/onPointerLeaveCapture events */}
    <Input
      type={'password'}
      placeholder={'Пароль'}
      onChange={handleInputChange}
      value={formValue.password}
      name={'password'}
      error={false}
      errorText={''}
      size={'default'}
      icon={'EditIcon'}
    />
    {isFormChanged && (
      <div className={styles.actions}>
        <Button
          type='secondary'
          htmlType='button'
          size='medium'
          onClick={handleCancel}
        >
          Отменить
        </Button>
        <Button type='primary' size='medium' htmlType='submit'>
          Сохранить
        </Button>
      </div>
    )}
    {updateUserError && (
      <p className={`${commonStyles.error} pt-5 text text_type_main-default`}>
        {updateUserError}
      </p>
    )}
  </form>
);
