export interface Category {
    id: number;
    imageUrl: string;
    name: string;
    description: string;
    created_at: Date;
    updated_at: Date;
    slug: string;
}

export interface CategoryRequest {
    name: string;
    imageUrl: string;
    description: string;
}

export interface CategoryAddRequest {
    name: string;
    imageUrl: string;
    description: string;
    slug: string;
}