const { NotImplementedError } = require("../extensions/index.js");

/**
 * Given an array of domains, return the object with the appearances of the DNS.
 *
 * @param {Array} domains
 * @return {Object}
 *
 * @example
 * domains = [
 *  'code.yandex.ru',
 *  'music.yandex.ru',
 *  'yandex.ru'
 * ]
 *
 * The result should be the following:
 * {
 *   '.ru': 3,
 *   '.ru.yandex': 3,
 *   '.ru.yandex.code': 1,
 *   '.ru.yandex.music': 1,
 * }
 *npm test --g test/dns-stats.test.js
 */
function getDNSStats(domains) {
  let templates = {};
  for (let i = 0; i < domains.length; i++) {
    let domain = domains[i].split(".").reverse().join(".");
    let dot;
    let rest = "." + domain;

    while (1) {
      templates[rest] = 0;
      dot = rest.lastIndexOf(".");
      if (dot === 0) break;
      rest = rest.slice(0, dot);
    }
  }

  for (let i = 0; i < domains.length; i++) {
    let domain = "." + domains[i].split(".").reverse().join(".");
    for (let key in templates) {
      if (domain.indexOf(key) >= 0) {
        templates[key] = templates[key] + 1;
      }
    }
  }

  return templates;
}

module.exports = {
  getDNSStats,
};
