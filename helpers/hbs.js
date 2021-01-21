const Handlebars = require("handlebars");

module.exports = {
  stripTags: function (input) {
    //   replace tags html of CKEditor by ' '
    return input.replace(/<(?:.|\n)*?>/gm, "");
  },
};
