

export async function fetchRequest<T>(
    url: string,
    method: string = "GET",
    body?: Record<string, any>,
): Promise<T> {
    const options: RequestInit = {
        method,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
    };

    // try {
    const response = await window.fetch(url, options);

    const data = await response.json();

    if (!response.ok) {
      return data || "Something went wrong";
    }

    return data;
}