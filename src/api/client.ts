async function apiRequest<T>(url: string, options: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      `Server error: ${response.status}, ${JSON.stringify(data)}`,
    );
  }
  console.log(data.status, data.data);
  return data;
}

export { apiRequest };
