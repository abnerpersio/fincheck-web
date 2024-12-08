export function formatCurrency(value: number | undefined | null) {
  if (!value) {
    return '';
  }

  return new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}
