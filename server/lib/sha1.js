//create a sha1 from a string
const crypto = require("crypto");

/**
 * @param {String} data String to be hashed.
 */

module.exports = (data) => {
  const generator = crypto.createHash("sha1");
  generator.update(data);
  return generator.digest("hex");
};
