
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
        body: JSON.stringify(body),
    };
    console.log(url, options)
    const response = await window.fetch(url, options);
    console.log(response, "khl");
    if (!response.ok) {
        throw new Error(`Error`);
    }

    return await response.json();
}