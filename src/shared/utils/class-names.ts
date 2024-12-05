const getKeysFromObject = (value: Record<string, boolean>) => {
  try {
    return Object.entries(value)
      .filter(([, value]) => Boolean(value))
      .flatMap(([key]) => key);
  } catch {
    return false;
  }
};

export const classNames = (...classes: (string | Record<string, boolean> | undefined | null)[]) => {
  return classes
    .map((value) => {
      if (value && typeof value === 'object') {
        return getKeysFromObject(value);
      }

      return value;
    })
    .filter(Boolean)
    .join(' ');
};
