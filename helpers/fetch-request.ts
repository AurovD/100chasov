

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
        const response = await window.fetch(url, options);
        if (!response.ok) {
            throw new Error();
        }
        return await response.json();
}