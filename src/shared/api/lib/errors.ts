

export class HttpError extends Error {
  public status: number;
  public error: string | unknown;

  constructor(res: Response, error: string | unknown) {
    super(`Http error: ${res.statusText}`);
    this.status = res.status;
    this.error = error;
  } 
}
