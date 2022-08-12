declare module '*module.css' {
  const styles: {
    [className: string]: string;
  };
  export default styles;
}

declare namespace models {
  type ApiResponse<T> = {
    data?: T;
    statusCode: number;
    message?: string;
    error?: string;
  };
}
