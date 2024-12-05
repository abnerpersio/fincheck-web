import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAuth } from '../../../../app/hooks/use-auth';
import { useSignin } from '../../../../app/hooks/use-signin';

const createSchema = () =>
  z.object({
    email: z
      .string()
      .trim()
      .min(1, 'Email é obrigatório')
      .email('Informe um e-mail válido')
      .toLowerCase(),
    password: z.string().trim().min(1, 'Senha é obrigatória'),
  });

type FormValues = z.infer<ReturnType<typeof createSchema>>;

export function useLoginController() {
  const { mutateAsync, isPending } = useSignin();
  const { signin } = useAuth();

  const {
    formState: { errors, isValid },
    register,
    handleSubmit: handleFormSubmit,
  } = useForm<FormValues>({
    mode: 'all',
    resolver: zodResolver(createSchema()),
  });

  const handleSubmit = handleFormSubmit(async (formValues) => {
    const { token } = await mutateAsync(formValues);

    signin(token);
  });

  return {
    handleSubmit,
    register,
    errors,
    isValid,
    isLoading: isPending,
  };
}
