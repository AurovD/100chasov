

export async function fetchRequest<T>(
    url: string,
    method: string = "GET",
    body?: Record<string, any>,
    token?: string
): Promise<T> {
    const options: RequestInit = {
        method,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": token ? `Bearer ${token}` : '',
        },
        credentials: "include",
        body: JSON.stringify(body),
    };

    const response = await window.fetch("http://localhost:3001/api" + url, options);

    const data = await response.json();

    if (!response.ok) {
      return data || "Something went wrong";
    }

    return data;
}