/*jshint esversion: 6 */

function range(n,k) {
  if (k - n === 2) {
    return [n+1];
  }
  let coll = range(n, k-1);
  coll.push(k-1);
  return coll;
  
}

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

// Write a recrusive function that takes an accumulator and any number of ints following
// and return the accumulator which should be the sum of all the ints. 
function f(x, ...y) {
  if (!y.length) {
    return x;
  } 
  else {
    x += y.shift();
    return f(x, ...y);
  }
}

f(10,2,4,7,8,4);
// To solve, simply use the ... rest operator. 

function inject(a) {
  if (a.length === 1) {
    return a[0];
  } else {
    return a.pop() + inject(a);
  }
}

function gcd(a,b) {
    a = Math.abs(a);
    b = Math.abs(b);
    
    // If the order is wrong, swap them
    if (b > a) {
        var temp = a;
        a = b;
        b = temp;
    }
    
    while (true) {
        if (b === 0) {
            return a;
        }
        
        a %= b;
        
        if (a === 0) {
            return b;
        }
        
        b %= a;
    }
} 

function lcm(a,b) {
    return  (a * b) / gcd(a,b);
}


function fibs(n) {
  if (n === 1) {
    return [0, 1];
  }
  fibsArray = fibs(n-1);
  fibsArray.push(fibsArray[fibsArray.length-1] + fibsArray[fibsArray.length-2]);
  return fibsArray;
}


function nPrimes(n) {
    let primes = [];
    for(let i = 3; primes.length < n-1; i += 2) {
        if (primes.every(prime => {return i % prime !== 0})) {
            primes.push(i);
        }
    }
    primes.unshift(2);
    console.log(primes);
    return primes;
}

function bsearch(array, target) {
  let midPoint = array[Math.floor(array.length / 2)];
  if (midPoint == target) {
    return true;
  }
  
  if (array.length <= 1) {
    return false;
  }
  // search RHS
  if (target > midPoint) {
    let truncatedArray = array.slice(array.indexOf(midPoint), array.length);
    return bsearch(truncatedArray, target);
  } 
  // search LHS
  else if (target < midPoint) {
    let truncatedArray = array.slice(0, array.indexOf(midPoint));
    return bsearch(truncatedArray, target);
  }
  else {
    return midPoint;
  }
}


let b = [1,2,4,6,9,11,19,22,34,55,67,99,104];
bsearch(b, 67);

function exponent(n,k) {
  if (k <= 1) {
    return n;
  }
  if (k === 0) {
    return 1;
  }
  return (n * exponent(n, k-1));
}

Array.prototype.br_search = function (target)   
{  
  var half = parseInt(this.length / 2);  
  if (target === this[half])   
  {  
    return half;  
  }  
  if (target > this[half])   
  {  
    return half + this.slice(half,this.length).br_search(target);  
  }   
  else  
  {  
    return this.slice(0, half).br_search(target);  
  }  
};  

Array.prototype.merge_Sort = function () {  
  if (this.length <= 1)   
  {  
    return this;  
  }  
  
  var half = parseInt(this.length / 2);  
  var left = this.slice(0, half).merge_Sort();  
  var right = this.slice(half,     this.length).merge_Sort();  
  var merge = function (left, right)   
  {  
    var merged = [];  

      while (left.length > 0 && right.length > 0)  
      {  
          merged.push((left[0] <= right[0]) ? left.shift() : right.shift());  
      }  

      return merged.concat(left).concat(right);  
  };  
  
  return merge(left, right);  
};  
  
var a = [34,7,23,32,5,62];  
console.log(a.merge_Sort()); 
  
l= [0,1,2,3,4,5,6];  

console.log(range(2,9))
console.log(inject([1,2,3]))
console.log(fibs(20))
console.log(exponent(2,3))