function ArrayCursor(data, begin, end) {
  this.data = data;
  this.begin = begin && begin > 0 ? begin : 0;
  end = end || this.data.length;
  this.end = end > 0 ? end : this.data.length + end;
  this.length = this.end > this.begin ? this.end - this.begin : 0;
};

ArrayCursor.prototype.get = function get(i) {
  return i >= 0 && i < this.length ? this.data[this.begin + i] : undefined;
};

ArrayCursor.prototype.slice = function slice(begin, end) {
  begin = begin ? this.begin + begin : this.begin;
  end = end ? this.end + end : this.end;
  return new ArrayCursor(this.data, begin, end);
};

ArrayCursor.prototype.forEach = function forEach(cb) {
  for (var i = 0; i < this.length; i++) {
    cb(this.get(i), i, this);
  }
};

ArrayCursor.prototype.toArray = function toArray() {
  return this.data.slice(this.begin, this.end);
};

module.exports = ArrayCursor;
