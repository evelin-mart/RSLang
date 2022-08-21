

export class HttpError extends Error {
  public status: number;
  public error: string | Object;

  constructor(res: Response, error: string | Object) {
    super(`Http error: ${res.statusText}`);
    this.status = res.status;
    this.error = error;
  } 
}
