export function responseJson<T>({
  payload,
  error,
}: {
  payload?: T;
  error?: string;
}) {
  if (error) {
    return { error };
  }
  return { res: payload };
}
