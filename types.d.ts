declare namespace models {
  type ApiResponse<T> = {
    data?: T;
    statusCode: number;
    message?: string;
    error?: string;
  };
}
