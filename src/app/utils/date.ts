export function formatDate(date: string | Date) {
  if (!date) {
    return '';
  }

  return Intl.DateTimeFormat('pt-BR').format(new Date(date));
}
