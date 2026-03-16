class ServerError extends Error {
  status: number;
  data: Record<string, string>;

  constructor(message: string, status: number, data: Record<string, string>) {
    super(message);
    this.name = "ServerError";
    this.status = status;
    this.data = data;
  }
}

async function apiRequest<T>(url: string, options: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new ServerError(
      `${response.status}, ${data.error}`,
      response.status,
      data,
    );
  }
  console.log(data.status, data.data);
  return data;
}

export { apiRequest, ServerError };
