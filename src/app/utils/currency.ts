export function formatCurrency(value: number | undefined | null) {
  if (!value) {
    return '';
  }

  return new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function currencyToNumber(value: string | number) {
  if (typeof value === 'number') {
    return value;
  }

  const sanitizedString = value.replace(/\./g, '').replace(',', '.');

  return Number(sanitizedString);
}
