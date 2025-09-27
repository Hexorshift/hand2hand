export interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
  customHeaders?: Record<string, string>;
}

const API_BASE = import.meta.env.VITE_BASE_URL;
if (!API_BASE) throw new Error('VITE_BASE_URL is not defined');

export async function apiRequest(path: string, options: ApiOptions = {}) {
  const method = options.method || 'GET';

  const headers = new Headers({
    ...(method !== 'GET' ? { 'Content-Type': 'application/json' } : {}),
    ...options.customHeaders
  });

  const fetchOptions: RequestInit = {
    method,
    ...(method !== 'GET' && options.body
      ? { body: JSON.stringify(options.body) }
      : {}),
    headers,
    credentials: 'include',
    cache: 'no-cache'
  };

  const res = await fetch(`${API_BASE}${path}`, fetchOptions);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API Error ${res.status}: ${text}`);
  }

  return await res.json();
}
