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

function diff(a) {

    let max = Math.max.apply(null, a);
    let maxIdx = a.indexOf(max);
    /* We get the min by only searching the subarray of elements that are behind the max in the array, 
       so if the array were [2,3,10,4,6], the max is 10, and we only care about the smallest el before it.
       meaning we search for the min in the subarray [2,3,10];
    */
    let min = Math.min.apply(0, a.slice(0, maxIdx));

    /* If there are still nums in the array and the max is at the first index, drop the first
       element and try again */
    if(a.length && !maxIdx){
        return diff(a.slice(1));
    }

    return max - min;
}

//diff([7, 9, 5, 6, 3, 2]) == 2
//diff([666, 555, 444 , 33, 22, 23]) == 1
