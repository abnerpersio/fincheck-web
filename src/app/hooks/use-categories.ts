import { useQuery } from '@tanstack/react-query';
import { CategoriesService } from '../services/categories';

export function useCategories() {
  const { data, ...query } = useQuery({
    queryKey: ['transaction-categories'],
    queryFn: () => new CategoriesService().list().then((result) => result?.data),
    staleTime: Infinity,
  });

  return {
    ...query,
    categories: data ?? [],
  };
}
