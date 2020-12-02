const orm = require("../config/orm.js");

const burger = {
    all: function(cb) {
      orm.selectAll("burgers", function(res) {
        cb(res);
      });
    },

    insert: function(cols, vals, cb) {
      orm.insertOne("burgers", cols, vals, function(res) {
        cb(res);
      });
    },

    update: function(objColVals, condition, cb) {
      orm.updateOne("burgers", objColVals, condition, function(res) {
        console.log("yes?*****************");
        cb(res);
      });
    },

    delete: function(condition, cb) {
      orm.deleteOne("burgers", condition, function(res) {
        cb(res);
      });
    }
}
  

  module.exports = burger;
  