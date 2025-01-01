export interface User {
    id: number;
    name: string;
    profileImage: string;
    email: string;
    role_id: number;
    created_at: Date;
    updated_at: Date;
    active: number;
  }

  export interface AddAdminRequest {
    username: string;
    email: string;
    password: string;
    role_id: number;
    active: number;
  }