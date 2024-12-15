import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AuthService, SigninPayload, SigninResult } from '../services/auth';

type Options = {
  onSuccess?: (data: SigninResult) => void;
};

export function useSignin(options?: Options) {
  return useMutation({
    mutationKey: ['auth', 'signin'],
    mutationFn: (payload: SigninPayload) =>
      new AuthService().sigin(payload).then((result) => result?.data),
    onSuccess: (data) => options?.onSuccess?.(data),
    onError: () => toast.error('Credenciais inválidas!'),
  });
}
