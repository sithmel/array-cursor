var assert = require('chai').assert;
// var ArrayCursor = require('..');
var ArrayCursor = require('../es6');

describe('ArrayCursor', function () {
  it('can be instantiated', function () {
    assert.typeOf(ArrayCursor, 'function');
    assert.instanceOf(new ArrayCursor([]), ArrayCursor);
  });

  it('uses default begin/end', function () {
    var a = new ArrayCursor([1, 2, 3, 4]);
    assert.equal(a.length, 4);
    assert.deepEqual(a.toArray(), [1, 2, 3, 4]);
    assert.equal(a.get(0), 1);
    assert.equal(a.get(1), 2);
    assert.equal(a.get(2), 3);
    assert.equal(a.get(3), 4);
    assert.equal(a.get(-1), undefined);
    assert.equal(a.get(4), undefined);
  });

  it.skip('uses proxy if available', function () {
    var a = new ArrayCursor([1, 2, 3, 4]);
    assert.equal(a.length, 4);
    assert.equal(a[0], 1);
    assert.equal(a[1], 2);
    assert.equal(a[2], 3);
    assert.equal(a[3], 4);
  });

  it('uses begin', function () {
    var a = new ArrayCursor([1, 2, 3, 4], 1);
    assert.equal(a.length, 3);
    assert.deepEqual(a.toArray(), [2, 3, 4]);
    assert.equal(a.get(0), 2);
    assert.equal(a.get(1), 3);
    assert.equal(a.get(2), 4);
    assert.equal(a.get(3), undefined);
    assert.equal(a.get(-1), undefined);
    assert.equal(a.get(4), undefined);
  });

  it('uses end', function () {
    var a = new ArrayCursor([1, 2, 3, 4], 0, 3);
    assert.equal(a.length, 3);
    assert.deepEqual(a.toArray(), [1, 2, 3]);
    assert.equal(a.get(0), 1);
    assert.equal(a.get(1), 2);
    assert.equal(a.get(2), 3);
    assert.equal(a.get(3), undefined);
    assert.equal(a.get(-1), undefined);
    assert.equal(a.get(4), undefined);
  });

  it('uses negative end', function () {
    var a = new ArrayCursor([1, 2, 3, 4], 0, -1);
    assert.equal(a.length, 3);
    assert.deepEqual(a.toArray(), [1, 2, 3]);
    assert.equal(a.get(0), 1);
    assert.equal(a.get(1), 2);
    assert.equal(a.get(2), 3);
    assert.equal(a.get(3), undefined);
    assert.equal(a.get(-1), undefined);
    assert.equal(a.get(4), undefined);
  });

  it('uses begin/end', function () {
    var a = new ArrayCursor([1, 2, 3, 4], 1, -1);
    assert.equal(a.length, 2);
    assert.deepEqual(a.toArray(), [2, 3]);
    assert.equal(a.get(0), 2);
    assert.equal(a.get(1), 3);
    assert.equal(a.get(2), undefined);
    assert.equal(a.get(3), undefined);
    assert.equal(a.get(-1), undefined);
    assert.equal(a.get(4), undefined);
  });

  it('uses slice', function () {
    var a = new ArrayCursor([1, 2, 3, 4]);
    var b = a.slice(1, -1);
    assert.equal(b.length, 2);
    assert.deepEqual(b.toArray(), [2, 3]);
    assert.equal(b.get(0), 2);
    assert.equal(b.get(1), 3);
    assert.equal(b.get(2), undefined);
    assert.equal(b.get(3), undefined);
    assert.equal(b.get(-1), undefined);
    assert.equal(b.get(4), undefined);
  });

  it('uses slice twice', function () {
    var a = new ArrayCursor([0, 1, 2, 3, 4, 5]);
    var b = a.slice(1, -1);
    var c = b.slice(1, -1);
    assert.equal(c.length, 2);
    assert.deepEqual(c.toArray(), [2, 3]);
    assert.equal(c.get(0), 2);
    assert.equal(c.get(1), 3);
    assert.equal(c.get(2), undefined);
    assert.equal(c.get(3), undefined);
    assert.equal(c.get(-1), undefined);
    assert.equal(c.get(4), undefined);
  });

  it('uses map', function () {
    var a = new ArrayCursor([0, 1, 2, 3, 4, 5])
      .map(function (i) { return i + 5; });
    assert.deepEqual(a, [5, 6, 7, 8, 9, 10]);
  });

  it('uses reduce', function () {
    var a = new ArrayCursor([0, 1, 2, 3, 4, 5])
      .reduce(function (acc, i) { return acc + i; }, 0);
    assert.equal(a, 15);
  });

  it('uses forEach', function () {
    var copy = [];
    new ArrayCursor([0, 1, 2, 3, 4, 5])
      .forEach(function (i) { copy.push(i); });
    assert.deepEqual(copy, [0, 1, 2, 3, 4, 5]);
  });
});
