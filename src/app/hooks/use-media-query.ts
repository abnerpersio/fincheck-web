import { useEffect, useState } from 'react';

export function useMediaQuery(size: number) {
  const [matches, setMatches] = useState(window.innerWidth >= size);

  useEffect(() => {
    const handleResize = () => {
      setMatches(window.innerWidth >= size);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [size]);

  return matches;
}
