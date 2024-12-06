import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { UsersService } from '../services/users';

type Options = {
  enabled?: boolean;
};

export function useUserDetails(options?: Options) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['users', 'me'],
    queryFn: () => new UsersService().getMeDetails().then((result) => result?.data),
    enabled: options?.enabled,
    staleTime: Infinity,
  });

  const remove = useCallback(() => {
    queryClient.removeQueries({
      queryKey: ['users', 'me'],
    });
  }, [queryClient]);

  return { ...query, remove };
}
