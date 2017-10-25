Array cursor
============
Data structure that wraps an array. It allows to slice it without mutate the array itself.
It just takes into consideration two indexes (begin and end).

Example:
```js
var a = new ArrayCursor([1, 2, 3, 4]);
var b = a.slice(1, -1);

a.length; // 2
a.get(0); // 1
a.get(1); // 2
a.get(3); // 3
a.get(4); // 4

b.length; // 2
b.get(0); // 2
b.get(1); // 3

a.toArray(); // [1, 2, 3, 4] this creates a new array!
b.toArray(); // [2, 3] this creates a new array!
```
The API is quite limited but, if you don't need to mutate the array and you only need to see different slices, it is crazy fast! (try running **npm run benchmarks**).

API
===
You create an ArrayCursor with:
```js
var arrayCursor = new ArrayCursor(array, begin, end);
```
begin and end follow the same rules as [Array.prototype.slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice).

Attributes
----------
The length of the array is in the **length** attribute.
Then original array is in **data** but you can only see from **begin** to **end**.

Methods
-------
The object has the following methods:
* get(n) : return the n item
* slice(begin, end): return a new instance of ArrayCursor sliced in a different way (same API as [Array.prototype.slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice))
* forEach(cb): it is equivalent to [Array.prototype.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
* toArray(): it returns a new array that is the slice of the array contained in this.data.
