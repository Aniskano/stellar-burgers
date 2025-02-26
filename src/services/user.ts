import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  getUserApi,
  handleApiError,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { IApiError, TUser } from '@utils-types';
import { deleteCookie, setCookie } from 'utils/cookie';

type TUserState = {
  checked: boolean;
  loading: boolean;
  user: TUser | null;
  error: string | null;
  fetch: () => Promise<void>;
  login: (data: TLoginData) => Promise<void>;
  logout: () => Promise<void>;
  update: (data: Partial<TRegisterData>) => Promise<void>;
  register: (data: TRegisterData) => Promise<void>;
};

export const useUserStore = create<TUserState>()(
  devtools(
    (set) => ({
      checked: false,
      loading: false,
      user: null,
      error: null,
      fetch: async () => {
        try {
          const { user } = await getUserApi();
          set({ user });
        } catch (error) {
          set({ error: handleApiError(error, 'Failed to fetch user') });
        } finally {
          set({ loading: false, checked: true });
        }
      },
      login: async (data: TLoginData) => {
        try {
          set({ loading: true, error: null });
          const response = await loginUserApi(data);
          const { user, accessToken, refreshToken } = response;
          setCookie('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          set({ user, checked: true });
        } catch (error) {
          set({ error: handleApiError(error, 'Failed to login user') });
        } finally {
          set({ loading: false, checked: true });
        }
      },
      logout: async () => {
        try {
          set({ loading: true, error: null });
          await logoutApi();
          deleteCookie('accessToken');
          localStorage.removeItem('refreshToken');
          set({ user: null });
        } catch (error) {
          const errorResponse = error as IApiError;
          set({ error: 'Failed to logout user: ' + errorResponse.message });
        } finally {
          set({ loading: false });
        }
      },
      update: async (data: Partial<TRegisterData>) => {
        try {
          set({ loading: true, error: null });
          const { user } = await updateUserApi(data);
          set({ user });
        } catch (error) {
          set({ error: handleApiError(error, 'Failed to update user') });
        } finally {
          set({ loading: false });
        }
      },
      register: async (data: TRegisterData) => {
        try {
          set({ loading: true, error: null });
          const { user, accessToken, refreshToken } = await registerUserApi(
            data
          );
          setCookie('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          set({ user });
        } catch (error) {
          set({ error: handleApiError(error, 'Failed to register user') });
        } finally {
          set({ loading: false });
        }
      }
    }),
    { name: 'user' }
  )
);
