import { useCallback, useState } from "react";

export const useLoading = (init = false) => {
  const [loading, setLoading] = useState(init);
  const stopLoading = useCallback(() => setLoading(false), []);
  const startLoading = useCallback(() => setLoading(true), []);
  return { loading, stopLoading, startLoading };
};
