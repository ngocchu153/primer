declare namespace models {
  type ApiResponse<T = undefined> =
    | {
        data: T;
        message?: string;
      }
    | {
        data?: T;
        message: string;
      };
}
