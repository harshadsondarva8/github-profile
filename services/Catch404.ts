import Errors from './Errors';

// Define the shape of the error response
interface ErrorResponse {
  code?: number;
}

// Define the shape of the error handler function
type ErrorHandler = (error: any) => void;

/**
 * Higher-order function that creates a custom error handler for catching 404 errors.
 * @param {ErrorHandler} errorHandler - The function to be executed if the error is not a 404 error.
 * @param {ErrorResponse} errorResponse - The object to store error details, specifically the error code.
 * @returns {Function} - A function that can be used as a middleware for catching 404 errors.
 */
const Catch404 = (errorHandler: ErrorHandler, errorResponse: ErrorResponse) => {
  return (error: any) => {
    // Check if the error is not a 404 error
    if (!Errors.is404(error)) {
      // Execute the provided error handler function if it is a function
      if (typeof errorHandler === 'function') {
        errorHandler(error);
      }
    } else {
      // Set the error code to 404 in the error response object
      errorResponse.code = 404;
    }
  };
};

export default Catch404;
