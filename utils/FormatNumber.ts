/**
 * Function to format a number for display, adding 'K' or 'M' suffixes as appropriate.
 * @param {number} number - The input number to format.
 * @returns {string} - The formatted number as a string.
 * @example
 * const formattedNumber = FormatNumber(1200); // '1.2K'
 */
const FormatNumber = function (number: number): string {
  if (number < 1000) {
    return number.toString();
  } else if (number < 1000000) {
    return (number / 1000).toFixed(1) + 'K';
  } else {
    return (number / 1000000).toFixed(1) + 'M';
  }
};

export default FormatNumber;
