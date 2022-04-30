const { NotImplementedError } = require("../extensions/index.js");

/**
 * Extract season from given date and expose the enemy scout!
 *
 * @param {Date | FakeDate} date real or fake date
 * @returns {String} time of the year
 *
 * @example
 *
 * getSeason(new Date(2020, 02, 31)) => 'spring'
 * npm test --g test/what-season.test.js
 *
 */

function getSeason(date) {
  if (!date) {
    return "Unable to determine the time of year!";
  }

  if (!isCorrectDate(date)) {
    throw Error("Invalid date!");
  }

  const month = date.getMonth();
  let season;

  switch (month) {
    case 11:
    case 0:
    case 1:
      season = "winter";
      break;
    case 2:
    case 3:
    case 4:
      season = "spring";
      break;
    case 5:
    case 6:
    case 7:
      season = "summer";
      break;
    case 8:
    case 9:
    case 10:
      season = "autumn";
      break;
  }
  return season;
}

function isCorrectDate(date) {
  return Object.prototype.toString.call(date) === "[object Date]"
    ? Object.keys(date).length === 0
    : false;
}

module.exports = {
  getSeason,
};
