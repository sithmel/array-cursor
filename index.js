
function ArrayCursor(data, begin, end) {
  this.data = data;
  this.begin = begin && begin > 0 ? begin : 0;
  end = end || this.data.length;
  this.end = end > 0 ? end : this.data.length + end;
  this.length = this.end > this.begin ? this.end - this.begin : 0;

  // if (Proxy) {
  //   var handler = {
  //     configurable: false,
  //     enumerable: true,
  //     get: function(target, name) {
  //       var index = Number(name);
  //       if (! isNaN(index) && index >= 0) {
  //         return target.get(index);
  //       }
  //       return target[name];
  //     }
  //   };
  //   return new Proxy(this, handler);
  // }
};

ArrayCursor.prototype.get = function get(i) {
  return i >= 0 && i < this.length ? this.data[this.begin + i] : undefined;
};

ArrayCursor.prototype.slice = function slice(begin, end) {
  begin = begin ? this.begin + begin : this.begin;
  end = end || this.end;
  end = end > 0 ? this.begin + end : this.end + end;
  return new ArrayCursor(this.data, begin, end);
};

ArrayCursor.prototype.forEach = function forEach(cb) {
  for (var i = 0; i < this.length; i++) {
    cb(this.get(i), i, this);
  }
};

ArrayCursor.prototype.map = function map(cb) {
  var output = [];
  for (var i = 0; i < this.length; i++) {
    output.push(cb(this.get(i), i, this));
  }
  return output;
};

ArrayCursor.prototype.filter = function map(cb) {
  var output = [];
  for (var i = 0; i < this.length; i++) {
    if (cb(this.get(i), i, this)) {
      output.push(this.get(i));
    }
  }
  return output;
};

ArrayCursor.prototype.reduce = function map(cb, initialValue) {
  var accumulator = initialValue === undefined ? this.get(0) : initialValue;
  for (var i = 0, len = this.length; i < len; i++) {
    accumulator = cb(accumulator, this.get(i), i, this);
  }
  return accumulator;
};

ArrayCursor.prototype.toArray = function toArray() {
  return this.data.slice(this.begin, this.end);
};

module.exports = ArrayCursor;
