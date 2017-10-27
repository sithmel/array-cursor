var ArrayCursor = require('.');

ArrayCursor.prototype[Symbol.iterator] = function * iterator() {
  for (var i = 0; i < this.length; i++) {
    yield this.get(i);
  }
};

module.exports = ArrayCursor;
