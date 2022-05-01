const { NotImplementedError } = require("../extensions/index.js");

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * npm test --g test/transform-array.test.js
 */
function transform(arr) {
  if (!arr || !Array.isArray(arr)) {
    throw Error("'arr' parameter must be an instance of the Array!");
  }

  if (arr.length === 0) {
    return arr;
  }

  const control = [
    "--discard-prev",
    "--double-prev",
    "--discard-next",
    "--double-next",
  ];

  let trans = [];
  for (let i = 0; i < arr.length; i++) {
    const tail =
      i > 0
        ? control.find((item) => item.endsWith("next") && item === arr[i - 1])
        : null;

    const head =
      i < arr.length - 1
        ? control.find((item) => item.endsWith("prev") && item === arr[i + 1])
        : null;

    if (tail) {
      if (tail === "--double-next") {
        trans.push(arr[i]);
      } else {
        continue;
      }
    }

    if (head) {
      if (head === "--double-prev") {
        trans.push(arr[i]);
      } else {
        continue;
      }
    }

    if (arr[i] !== control.find((item) => item === arr[i])) {
      trans.push(arr[i]);
    }
  }

  return trans;
}

module.exports = {
  transform,
};
