import {log} from "node:util";

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
    const response = await window.fetch(url, options);
    if (!response.ok) {
        return  await response.json();
    }

    return await response.json();
}