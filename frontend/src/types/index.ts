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
}