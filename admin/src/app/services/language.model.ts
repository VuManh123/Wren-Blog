export interface Language {
    id: number;
    name: string;
    code: string;
    region: string;
    status: string;
    createdAt: Date;
}

export interface AddLanguageRequest {
    code: string;
    name: string;
    region: string;
    status: string;
  }
  
  