export interface Extracts{
    [key: string]: any;
    id: number;
    created_at: Date;
    pages_process: number;
    doc_type: string;
    user_id: number;
}

export interface Users{
    [key: string]: any;
    id: number;
    name: string;
    segment: string;
};