export interface User {
    phone: string,
    login?: string,
    id: string,
    code?: string,
    permissions: UserPermissions[],
    role: User,
    active_count: number,    
    isBanned: boolean,
    count: number,
    email: string,
    avatarUrl: string,
    acciess_token?: string,
    createdAt: Date,
    updatedAt: Date
}


export interface UserResponse  {
  success: boolean, 
  message?: string, 
  access_token?: string,
    attempts?: number,
  user: User
}

export type UserStatus = 'offline' | 'online';

export const USER_ROLES = ['user', 'admin', 'moderator', 'superadmin'] as const;

export type UserRole = typeof USER_ROLES[number];


export const USER_PERMISSIONS = [
  'read',
  'write',
  'delete',
  'update',
  'manage_users',
  'view_reports'
] as const;

export type UserPermissions = typeof USER_PERMISSIONS[number];