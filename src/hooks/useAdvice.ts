import { useState, useEffect } from 'react';

interface AdviceResponse {
  slip: { id: number; advice: string };
}

export function useAdvice() {
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.adviceslip.com/advice', { cache: 'no-store' })
      .then((r) => r.json())
      .then((data: AdviceResponse) => setAdvice(data.slip.advice))
      .catch(() => setAdvice(null))
      .finally(() => setLoading(false));
  }, []);

  return { advice, loading };
}
