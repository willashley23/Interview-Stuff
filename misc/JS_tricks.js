/*jshint esversion: 6 */

// Array.sample
let rand = arr[Math.floor(Math.random() * arr.length)];

// Array flatten
[].concat.apply([], news);

// Array/Set Difference (eg: [1,2,3] - [1,2] = [3])
function diff(a,b) {
    // Best solution, O(a + b) time.
    let hash = {};
    b.forEach(el => {hash[el] = true;});
    return a.filter( el => {return !hash[el];});
}

// Succint but slow, (O ab) time.
let difference = a.filter(x => b.indexOf(x) === -1);

// each_with_index
// NOTE! 'el' is a string, so if you want to say arr[el+1] you must say arr[parseInt(el)+1]

// Array.inject(:+)
arr.reduce( (a,b) => a * b);

// Array.all?
arr.every( (el) => {
    return el > 2;
}); 

// Array max
Math.max.apply(null, [-5, -1, -8]);

// string.include?
str.indexOf('lo');

// Array delete at index. O(n) time because you have to shift indeces.
a.splice(1,1); //(the second param to splice is always 1, the first param is the idx you want to delete)

// Array.last
arr.slice(-1)[0];

// Dedup ... probably O(n) time.
let uniqArray = Array.from(new Set(oldArray));

// Alphabet Hash
var a = 97;
var charArray = {};
for (var i = 0; i<26; i++) {
    charArray[String.fromCharCode(a + i)] = String.fromCharCode(a + i);
}