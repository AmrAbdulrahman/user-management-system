var _ = require('lodash'),
    UserGroupTable = require('../helpers/user-group-table').get(),
    IDCounter = 1;

// class Group represents Group entity and wraps the logic of auto-increment ID
// and getting group users
var Group = function(group) {
  var that = this;
  this.id = IDCounter++;
  
  for (var key in group) {
    this[key] = group[key];
  }

  // this method to return a decorated object
  // holds a reference to associated user
  this.get = function() {
    var decoratedObject = {};

    for (var key in that) {
      if (_.isFunction(that[key]) === false) {
        decoratedObject[key] = that[key];
      }
    }

    // users holds user IDs
    decoratedObject.users = UserGroupTable.getGroupUsers(that.id);
    return decoratedObject;
  };
};

module.exports = Group;