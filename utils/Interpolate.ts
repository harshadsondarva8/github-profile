/**
 * Function to perform string interpolation by replacing placeholders in a string with values from a data object.
 * @param {string} str - The input string containing placeholders to be replaced.
 * @param {Record<string, string>} data - An object containing key-value pairs for replacing placeholders.
 * @returns {string} - The string after interpolation.
 * @example
 * const template = '/users/:login';
 * const userData = { login: 'john_doe' };
 * const interpolatedString = Interpolate(template, userData); // '/users/john_doe'
 */
const Interpolate = (str: string, data: Record<string, string>): string => {
  for (const item in data) {
    if (Object.prototype.hasOwnProperty.call(data, item)) {
      str = str.replace(new RegExp(`:${item}`, 'gi'), data[item]);
    }
  }
  return str;
};

export default Interpolate;
