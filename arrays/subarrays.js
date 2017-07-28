/*jshint esversion: 6 */

// Return the maximum average subarray of size k. O(n);
function maxSubarrayAverage(arr,k) {
    
    let max = 0;
    for (let i = 0; i < k; i++) {
        max += arr[i];
    }

    for (let i = k; i < arr.length; i++) {
        if (max - arr[i-k] + arr[i] > max) {
            max = max - arr[i-k] + arr[i];
        }
    }
    
    return max / k;
}

//maxSubarrayAverage([1,12,-5,-6,50,3], 4); should be 12.75 because 12,-5,-6,50 has the highest average.

/* Explanation: Start by setting the max to equal the sum of the first k elements,
   then, starting from the kth element, see if you add the current element to the max
   and subtract the value of the i-k(current - k)th element, if that value is bigger than
   the max, if so, then you set the max to that, and just return max / k. If you want to
   return the subarray itself, when the above condition is met, set the start index to
   i-k+1, and the end idx to k+1, and just return that slice. */

// Same as above, but instead, return the subarray itself. O(n + k);
function maxSubarrayAverageWithArray(arr,k) {
    
    if (k === arr.length) return arr;

    let max = 0;
    let start, end = 0;
    for (let i = 0; i < k; i++) {
        max += arr[i];
        values.push(arr[i]);
    }
    
    let j = 0;
    for (let i = k; i < arr.length; i++) {
        if (max - arr[i-k] + arr[i] > max) {
            max = max - arr[i-k] + arr[i];
            end = i+1;
            start = i-k+1;
        }
    }
    
    return arr.slice(start, end);
}

//maxSubarrayAverageWithArray([1,12,-5,-6,50,3], 4); // start at idx 1
//maxSubarrayAverageWithArray([1,12,3,-5,20,2,-6,50,300,7], 4); // the last 4
