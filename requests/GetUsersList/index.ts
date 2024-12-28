import Catch404 from '@/services/Catch404';
import Comm from '@/services/Comm';
import Uri from '@/services/Uri';

/**
 * Asynchronous function to fetch user data based on the provided login.
 * @param {string} login - The login username of the user to fetch.
 * @returns {Promise<object>} - A promise that resolves to the user data or rejects with an error.
 * @throws {object} - An object with `code` and `message` properties representing the error details.
 * @example
 * try {
 *   const userData = await GetUser('exampleUser');
 *   console.log(userData);
 * } catch (error) {
 *   console.error(`Error ${error.code}: ${error.message}`);
 * }
 */
const GetUsersList = async (query: string) => {
  let result;
  let error: {code: number; message: string} = {
    code: 0,
    message: '',
  };

  // Perform an asynchronous HTTP GET request using the Comm service
  await Comm.request({
    url: Uri.searchList({query}),
    method: 'get',
  })
    .then(res => {
      result = res.data;
    })
    .catch(
      // Catch 404 errors using the Catch404 service
      Catch404(err => {
        error.code = err.response.status;
        error.message = err.response.data.message;
      }, error),
    );

  // If an error occurred during the request, reject the promise with the error details
  if (error.code) {
    return Promise.reject(error);
  }

  // If successful, resolve the promise with the fetched user data
  return Promise.resolve(result);
};

export default GetUsersList;
