export function formatDate(date: string | Date) {
  if (!date) {
    return '';
  }

  try {
    const parsed = new Date(date).toISOString();

    const [year, month, day] = parsed.split('T')[0].split('-');

    return `${day}/${month}/${year}`;
  } catch {
    return '';
  }
}
