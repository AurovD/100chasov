
export async function fetchRequest<T>(url: string): Promise<T> {
    const response = await window.fetch(url);
    return await response.json();
}