const { NotImplementedError } = require("../extensions/index.js");

/**
 * There's a list of file, since two files cannot have equal names,
 * the one which comes later will have a suffix (k),
 * where k is the smallest integer such that the found name is not used yet.
 *
 * Return an array of names that will be given to the files.
 *
 * @param {Array} names
 * @return {Array}
 *
 * @example
 * For input ["file", "file", "image", "file(1)", "file"],
 * the output should be ["file", "file(1)", "image", "file(1)(1)", "file(2)"]
 * npm test --g test/file-names.test.js
 */
function renameFiles(names) {
  let existingNames = new Set();
  let namesObj = {};
  let res = [];

  for (let i = 0; i < names.length; i++) {
    if (!existingNames.has(names[i])) {
      res.push(names[i]);
      existingNames.add(names[i]);
      namesObj[names[i]] = 1;
    } else {
      res.push(names[i] + `(${namesObj[names[i]]})`);
      namesObj[names[i]] = namesObj[names[i]] + 1;
      namesObj[res[res.length - 1]] = 1;
      existingNames.add(res[res.length - 1]);
    }
  }

  return res;
}

module.exports = {
  renameFiles,
};
