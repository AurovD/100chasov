export interface User {
    phone: string,
    login?: string,
    id: number,
    code?: string,
}

export type UserStatus = 'offline' | 'online';