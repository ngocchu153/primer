declare namespace models {
  type ApiResponse<T = undefined> = {
    data?: T;
    statusCode: number;
    message?: string;
  };
}
