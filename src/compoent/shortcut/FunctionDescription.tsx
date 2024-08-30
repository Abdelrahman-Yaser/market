/**
 * FunctionDescription function.
 * Truncates the given text to a maximum length.
 * 
 * @param {string} text - The text to be truncated.
 * @param {number} [max=50] - The maximum length of the truncated text. Default is 50.
 * @returns {string} The truncated text.
 */
const FunctionDescription = (text: string, max: number = 500): string => {
  if (text.length >= max) {
    return `${text.slice(0, max)}...`;
  }
  return text;
};

export default FunctionDescription;
