const { NotImplementedError } = require("../extensions/index.js");

/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *npm test --g test/encode-line.test.js
 */
function encodeLine(str) {
  let encoded = "";
  let stack = [];

  for (let i = 0; i < str.length; i++) {
    if (stack.length === 0 || stack[stack.length - 1] === str[i]) {
      stack.push(str[i]);
    } else {
      encoded += `${stack.length === 1 ? "" : stack.length}${stack[0]}`;

      stack = [];
      stack.push(str[i]);
    }
  }

  if (stack.length) {
    encoded += `${stack.length === 1 ? "" : stack.length}${stack[0]}`;
  }

  return encoded;
}

module.exports = {
  encodeLine,
};
