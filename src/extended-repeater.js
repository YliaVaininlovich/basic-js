const { NotImplementedError } = require("../extensions/index.js");

/**
 * Create a repeating string based on the given parameters
 *
 * @param {String} str string to repeat
 * @param {Object} options options object
 * @return {String} repeating string
 *
 *
 * @example
 *
 * repeater('STRING', { repeatTimes: 3, separator: '**',
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 * npm test --g test/extended-repeater.test.js
 */
function repeater(str, options) {
  const {
    repeatTimes = 1,
    separator = "+",
    addition = "",
    additionRepeatTimes = 1,
    additionSeparator = "|",
  } = options;

  function repeatString(str, times, separator) {
    let strArr = [];
    for (let i = 0; i < times; i++) {
      strArr.push(String(str));
    }
    return strArr.join(separator);
  }

  let result = repeatString(
    str + repeatString(addition, additionRepeatTimes, additionSeparator),
    repeatTimes,
    separator
  );

  return result;
}

module.exports = {
  repeater,
};
