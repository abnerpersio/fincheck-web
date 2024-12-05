import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAuth } from '../../../../app/hooks/use-auth';
import { useSignup } from '../../../../app/hooks/use-signup';
import { regex } from '../../../../infra/regex';

const createSchema = () =>
  z.object({
    name: z
      .string()

      .trim()
      .min(1, 'Nome é obrigatório')
      .regex(regex.fullName, 'Informe nome e sobrenome'),
    email: z
      .string()
      .trim()
      .min(1, 'Email é obrigatório')
      .email('Informe um e-mail válido')
      .toLowerCase(),
    password: z
      .string()
      .trim()
      .min(1, 'Senha é obrigatória')
      .min(8, 'Senha deve conter pelo menos 8 digitos'),
  });

type FormValues = z.infer<ReturnType<typeof createSchema>>;

export function useRegisterController() {
  const { mutateAsync, isPending } = useSignup();
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
