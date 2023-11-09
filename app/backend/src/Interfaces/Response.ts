interface Error {
  message: string;
}

export interface Response<T = unknown> {
  status: string;
  data: T | Error;
}

type ServiceResponse<T = unknown> = Promise<Response<T>>;

export default ServiceResponse;
