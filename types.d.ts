declare namespace models {
  type ApiResponse<T = undefined> = {
    data?: T;
    message?: string;
  };
}
