import Catch404 from "@/services/Catch404";
import Comm from "@/services/Comm";
import Uri from "@/services/Uri";

/**
 * Asynchronous function to fetch the list of users following the specified user.
 * @param {string} login - The login username of the user whose followers are to be fetched.
 * @returns {Promise<object>} - A promise that resolves to the list of followers or rejects with an error.
 * @throws {object} - An object with `code` and `message` properties representing the error details.
 * @example
 * try {
 *   const followingList = await GetFollowing('exampleUser');
 *   console.log(followingList);
 * } catch (error) {
 *   console.error(`Error ${error.code}: ${error.message}`);
 * }
 */
const GetFollowing = async (login: string) => {
  let result;
  let error: {code: number; message: string} = {
    code: 0,
    message: '',
  };

  // Perform an asynchronous HTTP GET request using the Comm service
  await Comm.request({
    url: Uri.following({login}), // Generate the following-specific URL using the Uri service
    method: 'get',
  })
    .then(res => {
      result = res.data;
      // console.log(res)
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

  // If successful, resolve the promise with the fetched list of following users
  return Promise.resolve(result);
};

export default GetFollowing;
