const { NotImplementedError } = require("../extensions/index.js");

/**
 * Given an email address, return it's domain.
 *
 * @param {String} email
 * @return {String}
 *
 * @example
 * For the input 'prettyandsimple@example.com', the output should be 'example.com'
 *npm test --g test/get-email-domain.test.js
 */
function getEmailDomain(email) {
  const coll = email.split("@");
  return email.match(/(?<=@)[^@]+$/g)[0];
}

module.exports = {
  getEmailDomain,
};
