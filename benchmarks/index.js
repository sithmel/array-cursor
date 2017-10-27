var measureSpeedSync = require('measure-speed').measureSpeedSync;

var ArrayCursor = require('..');

var ARRAY_SIZE = 150000;
var SLICES = 1000;

console.log('Slicing an array');
console.log('================');
console.log('Array length: ', ARRAY_SIZE);
console.log('Number of slices: ', SLICES);

function getRandomArray(n) {
  var randomArray = [];
  for (var i = 0; i < n; i++) {
    randomArray.push(Math.random() * 10);
  }
  return randomArray;
}

var array1 = getRandomArray(ARRAY_SIZE);
var array2 = new ArrayCursor(getRandomArray(ARRAY_SIZE));

var ms = measureSpeedSync(function () {
  var result;
  for (var i = 0; i < SLICES; i++) {
    result = array1.slice(1);
  }
}, { samples: 10, discard: 2 });

console.log('Using real array', ms);

var ms = measureSpeedSync(function () {
  var result;
  for (var i = 0; i < SLICES; i++) {
    result = array2.slice(1);
  }
}, { samples: 10, discard: 2 });

console.log('Using ArrayCursor', ms);


var ARRAY_SIZE = 150000;
var NITEMS = 10;

console.log('');
console.log('Slicing the array and calculating the average');
console.log('=============================================');
console.log('Array length: ', ARRAY_SIZE);
console.log('Number of items: ', NITEMS);

var array3 = getRandomArray(ARRAY_SIZE);
var array4 = new ArrayCursor(getRandomArray(ARRAY_SIZE));

var ms = measureSpeedSync(function () {
  var result, output = [];
  for (var i = 0; i < ARRAY_SIZE/NITEMS; i++) {
    result = array3.slice(i * NITEMS, i * NITEMS + NITEMS)
      .reduce((acc, item) => acc + item, 0);
    output.push(result);
  }
}, { samples: 10, discard: 2 });

console.log('Using real array', ms);

var ms = measureSpeedSync(function () {
  var result, output = [];
  for (var i = 0; i < ARRAY_SIZE/NITEMS; i++) {
    result = array4.slice(i * NITEMS, i * NITEMS + NITEMS)
      .reduce((acc, item) => acc + item, 0);
    output.push(result);
  }
}, { samples: 10, discard: 2 });

console.log('Using ArrayCursor', ms);
