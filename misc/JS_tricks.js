function shit(arr) {
  let i = 0
  let groups = []
  let collection = []
  let j = 0 
  while (arr.length > 0) {
    for (let el in arr) {
      let i = Object.keys(arr).indexOf(el) + 1;
      if (arr[i] - arr[el] > 1 || arr[i] === undefined) {
        groups = arr.slice(0,i);
        collection.push(groups);
        break;
      }
    }
     arr = arr.filter(x => groups.indexOf(x) == -1);
    j++;
  }
  collection = collection.filter(x => x.length > 2);
  return(collection)
}

function shit(arr) {
  averages = [];
  for (let el in arr) {
    let idx = parseInt(el);
    let a = arr.slice(0, idx+1);
    averages.push( (a.reduce( (a, b) => (a + b) ) ) / (idx+1) );
  }
  return (averages);
}

shit([1,2,3,4,5]);

// Array.sample
 // var rand = myArray[Math.floor(Math.random() * myArray.length)];

// Array flatten
// [].concat.apply([], news)
const flatten = function(arr, result = []) {
  for (let i = 0, length = arr.length; i < length; i++) {
    const value = arr[i];
    if (Array.isArray(value)) {
      flatten(value, result);
    } else {
      result.push(value);
    }
  }
  return result;
};


/* 
    JavaScript Array difference!! [1,2,3] - [1,2] = [3];
    
    Succinct, but very slow! O(N*K)!!! (Because indexOf is O(n) it must walk through the array)
        arr = arr1.filter(x => arr2.indexOf(x) == -1);
 
    Much better! Use a hash and filter from that since keying into hash is constant. Runs in O(n+b) time.
    function diff(a,b) {
       let hash = {};
       b.forEach(el => {hash[el] = true});
       return a.filter( el => {return !hash[el]});
     }
*/

// each_with_index in JavaScript!
/*   for (let el in arr) {
        where el is the index. Use arr[el]
      }
*/
//NOTE! 'el' is a STRING, so if you want to say arr[el+1] you must say arr[parseInt(el)+1]

// Array.inject(:+)
//arr.reduce( (a,b) => a * b)


// Array.all?
/* arr.every( (el) => {
  return el > 2;
}); 
*/

// .max == Math.max.apply(null, [-5, -1, -8]) // -1

// str.include? "lo" == str.indexOf('lo')

// a.delete_at(1) == a.splice(1,1) (the second param to splice is always 1, the first param is the idx you want to delete)

// a.last == a.slice(-1)[0]

// JavaScript array.uniq 
// uniqArray = Array.from(new Set(oldArray))

//JavaScript alpha hash
// var a = 97;
// var charArray = {};
// for (var i = 0; i<26; i++)
//     charArray[String.fromCharCode(a + i)] = String.fromCharCode(a + i);

// console.log(charArray);