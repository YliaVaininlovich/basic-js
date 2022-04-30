const { NotImplementedError } = require("../extensions/index.js");

/**
 * Create name of dream team based on the names of its members
 *
 * @param {Array} members names of the members
 * @return {String | Boolean} name of the team or false
 * in case of incorrect members
 *
 * @example
 *
 * createDreamTeam(['Matt', 'Ann', 'Dmitry', 'Max']) => 'ADMM'
 * createDreamTeam(['Olivia', 1111, 'Lily', 'Oscar', true, null]) => 'LOO'
 *
 * npm test --g test/dream-team.test.js
 */
function createDreamTeam(members) {
  var team = [];
  let nameTeam = "";
  if (members == null) return false;
  for (let i = 0; i < members.length; i++) {
    if (members[i] !== null && typeof members[i] == "string") {
      team[i] = members[i].toUpperCase();
      team[i] = team[i].trim();
    }
  }

  team.sort();

  console.log(team);
  for (let i = 0; i < team.length; i++) {
    if (team[i] !== null && typeof team[i] == "string") nameTeam += team[i][0];
  }
  if (nameTeam == "") return false;
  return nameTeam;
}
module.exports = {
  createDreamTeam,
};
