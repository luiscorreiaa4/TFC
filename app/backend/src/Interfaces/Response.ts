export interface Response<T = unknown> {
  status: string;
  data: T | string;
}

type ServiceResponse<T = unknown> = Promise<Response<T>>;

export default ServiceResponse;
