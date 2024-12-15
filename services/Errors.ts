interface ErrorsFunctions {
  is404: (error: any) => boolean;
}

// Create an object with error-related functions
const Errors: ErrorsFunctions = (() => {
  const ret: ErrorsFunctions = {} as ErrorsFunctions;

  // Check if the error is a 404 error
  ret.is404 = (error: any) => {
    if (error?.response?.status === 404) {
      return true;
    }
    return false;
  };
  return ret;
})();

export default Errors;
