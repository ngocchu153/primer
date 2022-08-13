type ParsedResponse<T = undefined> = {
  status: number;
  data: models.ApiResponse<T>;
};

/**
 * Parses the JSON returned by a network request
 *
 * @param  {Response} response A response from a network request
 *
 * @return {Promise<ParsedResponse>}          The parsed JSON from the request
 */
function parseJSON(response: Response): Promise<ParsedResponse> {
  return new Promise((resolve) =>
    response.json().then((json: models.ApiResponse) =>
      resolve({
        status: response.status,
        data: json,
      })
    )
  );
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {Promise<void | models.ApiResponse<any>} The response data
 */
export default function request(url: string, options?: RequestInit) {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(parseJSON)
      .then((response) => {
        if (response.status < 400) {
          return resolve(response.data);
        }
        return reject(response.data);
      })
      .catch((error) =>
        reject({
          networkError: error.message,
        })
      );
  });
}
