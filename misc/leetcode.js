/*jshint esversion: 6 */

// Doesn't mutate array but can easily be changed to do so.
// array returned will be like ['1','2'] but JS says typeof is number...
// could just call .map to convert them to numbers.
function dedup(arr) {
    
    let hash = arr.reduce( (obj, el) => {
        obj[el] = (obj[el] + 1) || 1;
        return obj;
    }, {});
    
    return Object.keys(hash);
    
}
// Dedup in O(n) time and O(1) space
function d(arr) {
    for (let el in arr) {
        if (arr[Math.abs(arr[el])] >= 0) {
            arr[Math.abs(arr[el])] = -arr[Math.abs(arr[el])];
        }
        else {
            console.log(Math.abs(arr[el]));
        }
    }
}

// That really contrived difference problem where you need the max diff between two elements ONLY when the first value
// has a bigger idx than the value being subtracted from it.
function diff(a) {

    let currentMax = a[1] - a[0];
    let currentMin = a[0];
    
    for (let el in a) {
        if (a[el] - currentMin > currentMax) {
            currentMax = a[el] - currentMin;
        }
        else {
            currentMin = a[el];
        }
    }
    return currentMax;
}

//diff([7, 9, 5, 6, 3, 2]) == 2
//diff([666, 555, 444 , 33, 22, 23]) == 1
//cma -110
//cmn 666

function isValid(s) {
    
    let freq = {};
    let chars = s.split("");
    
    for (let c in chars) {
        
        let char = chars[c];
        
        if (!freq[char]) {
            freq[char] = 1;
        }
        else
        {
            freq[char] += 1;
        }
        
        if (freq[char] === 0) {
            delete freq[char];
        }
    }
    
    // could use Object.values(freq) if ES2017 is available.
    let total = Object.keys(freq).map(k => freq[k]).reduce( (a,b) => {return a + b});
    let divisor = Object.keys(freq).length;
    let first = Object.keys(freq).map(k => freq[k])[0];
    
    return (total / divisor) == first || ((total - 1) / divisor) == first || ((total - 1) / (divisor - 1)) == first ? 'YES' : 'NO';
    
    /* The logic is this: the values of the dictionary will look something like 
       [111,111,111,1] or [1,1,2,2] or [1,1,2]. We can simply take the sum of all elements, 
       divide it against the total number of elements (essentially taking the mean)
       and if the mean is equal to the first element, then we're good (IE [1,1,1] would
       have a mean of 1, so all chars are represented equally). But we must also 
       account for the clause that lets us delete one char. We do this by 
       first subtracting 1 from the total, and dividing it against BOTH the original
       total number of chars and the number of chars - 1. You'll see why we need 
       to divide by two divisors to cover this case. I just realized there is an edge
       case. If the value of `first` is not the true representative value, it
       doesn't work. [111,111,1] presumes the first value 111 is the standard,
       but if it were [1,111,111] it would not work. So instead of `first` pick the
       most frequent element in the array. for [1,1,2,2]... it looks like it fails
       either way.
    */
}

isValid('hfchdkkbfifgbgebfaahijchgeeeiagkadjfcbekbdaifchkjfejckbiiihegacfbchdihkgbkbddgaefhkdgccjejjaajgijdkd'); //yes
isValid('aabbcd'); //no
