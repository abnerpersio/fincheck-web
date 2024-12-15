import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AuthService, SignupPayload, SignupResult } from '../services/auth';

type Options = {
  onSuccess?: (data: SignupResult) => void;
};

export function useSignup(options?: Options) {
  return useMutation({
    mutationKey: ['auth', 'signup'],
    mutationFn: (payload: SignupPayload) =>
      new AuthService().signup(payload).then((result) => result?.data),
    onSuccess: (data) => options?.onSuccess?.(data),
    onError: () => toast.error('Erro ao criar conta!'),
  });
}
