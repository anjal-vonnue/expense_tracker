export async function meApi(token: string) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Authentication Failed");
  }
  const result = await response.json();

  return result;
}
