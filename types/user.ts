export interface User {
    phone: string,
    login?: string,
    id: number,
}

export type UserStatus = 'offline' | 'online';