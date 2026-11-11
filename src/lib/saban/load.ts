import { useCallback, useEffect, useState } from "react";
import { messageOf } from "@/components/kit";

export function useLoad<T>(loader: () => Promise<T>, deps: readonly unknown[]) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const reload = useCallback(() => {
    let live = true;
    setLoading(true);
    setError("");
    loader()
      .then((value) => {
        if (live) setData(value);
      })
      .catch((error: unknown) => {
        if (live) setError(messageOf(error));
      })
      .finally(() => {
        if (live) setLoading(false);
      });
    return () => {
      live = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => reload(), [reload]);

  return { data, error, loading, reload, setData };
}
