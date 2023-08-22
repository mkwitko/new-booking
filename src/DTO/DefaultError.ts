export type DefaultError = {
  code: number;
  message: string;
  detail: string;
  errorDomainId: string;
  qualifiedErrCode: string;
};

export interface IAxiosError {
  response: {
    data: {
      error: DefaultError;
    };
    status: number;
    statusText: string;
  };
}
