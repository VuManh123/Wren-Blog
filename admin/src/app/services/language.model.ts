export interface Language {
    id: number;
    name: string;
    code: string;
    flag: string;
    createdAt: Date;
}

export interface AddLanguageRequest {
    code: string;
    name: string;
    flag: string;
  }
  
  