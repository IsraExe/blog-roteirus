export interface FetchOptions {
    method: string;
    headers?: {
        'Cookie'?: string;
        'Content-Type'?: string;
        'Authorization'?: string;
    };
    body?: string;
    credentials?: 'include';
    signal?: AbortSignal | undefined;
};

export type TPost = {
    id_post: string;
    nm_title: string;
    de_content: string;
    cover_image: string;
    dt_created: string;
};