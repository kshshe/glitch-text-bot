const Creepify = require("lunicode-creepify");

Creepify.options.randomization = 30;

module.exports = (string, height = 2) => {
  Creepify.options.maxHeight = height;
  return Creepify.encode(string);
};
