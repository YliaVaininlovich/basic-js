const { NotImplementedError } = require("../extensions/index.js");

const MODERN_ACTIVITY = 15;
const HALF_LIFE_PERIOD = 5730;

/**
 * Determine the age of archeological find by using
 * given MODERN_ACTIVITY and HALF_LIFE_PERIOD values
 *
 * @param {String} sampleActivity string representation of current activity
 * @return {Number | Boolean} calculated age in years or false
 * in case of incorrect sampleActivity
 *
 * @example
 *
 * dateSample('1') => 22387
 * dateSample('WOOT!') => false
 *
 */
function dateSample(sampleActivity) {
  if (
    typeof sampleActivity != "string" ||
    sampleActivity === null ||
    sampleActivity === undefined ||
    sampleActivity === NaN
  )
    return false;
  let y = Number.parseFloat(sampleActivity);

  if (y <= 0 || y >= 9000) return false;
  let year = Math.ceil(
    (Math.log(MODERN_ACTIVITY / y) * HALF_LIFE_PERIOD) / 0.693
  );
  if (year <= 0 || isNaN(year)) return false;

  return year;
}

module.exports = {
  dateSample,
};
