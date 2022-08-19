export class HttpError extends Error {
  public status: number;
  public error: string | Object;

  constructor(res: Response, error: string | Object) {
    super(`Http error: ${res.statusText}`);
    this.status = res.status;
    this.error = error;
  }
}

export const withToken = (token: string, requestInit: RequestInit = {}) => {
  return { ...requestInit, headers: {
    'Authorization': `Bearer ${token}`,
  }}
}

export const getResponseBody = async (res: Response): Promise<string | Object> => {
  const contentType = res.headers.get('Content-Type');
  const isJson = contentType?.includes('application/json');
  return isJson ? res.json() : res.text();
}

export const processRequest = async <T>(url: string, requestInit: RequestInit = {}): Promise<T> => {
  const res = await fetch(url, requestInit);
  if (!res.ok) {     
    const error = await getResponseBody(res);
    throw new HttpError(res, error);
  }
  return await res.json();
}

export const processAuthorizedRequest = async <T>(url: string, requestInit: RequestInit = {}): Promise<T> => { 
  try {
    return processRequest<T>(url, requestInit);
    
  } catch (error) {
    if (error instanceof HttpError && [401, 402, 403].includes(error.status)) {
      // handle authorization errors
      // - handler for tokens request 
      // - handler for regular request: 
      //  1. send tokens request
      //  2. 
      //  ...
      //  
      const newTokens = {};
      return processAuthorizedRequest(url, requestInit);
    }
    throw error;
  }
}