import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AuthService, SigninPayload, SigninResult } from '../services/auth/auth';

type Options = {
  onSucess?: (data: SigninResult) => void;
};

export function useSignin(options?: Options) {
  return useMutation({
    mutationKey: ['auth', 'signin'],
    mutationFn: (payload: SigninPayload) =>
      new AuthService().sigin(payload).then((result) => result?.data),
    onSuccess: (data) => options?.onSucess?.(data),
    onError: () => toast.error('Credenciais inválidas!'),
  });
}
