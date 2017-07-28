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


// ====================================================================================================================================

// Find maximum element in each subarray of size k. 
class Deque {
    constructor(size)
    {
        this.contents = [];
        this.size = size;
    }
    
    push(el, arr) {
        while(this.contents.length > 0 && (arr[this.contents[this.contents.length-1]] < arr[el] || this.contents[0] < el - this.size + 1)) {
            this.contents.pop();
            //this.contents.shift(); // cheating. This current implementation doesn't quite work. Prolly needs linked list implementation.
        }
        this.contents.push(el);
    }
    
    max() {
        return this.contents[0];
    }
    
    min() {
        return this.contents[this.contents.length-1];
    }
    
    print()
    {
        console.log(this.contents);
    }
}

var maxSlidingWindow = function(nums, k) {

    if (k === 1 ) return nums;
    if (k === 0) return [];
    if (k === nums.length) return [Math.max.apply(null, nums)];
    
    let maxes = [];
    let d = new Deque(k);
    
    for (let el in nums) {
        d.push(el, nums);
        
        if (el >= k - 1) {
            maxes.push(nums[d.max()]);
        }
    }
    
    return maxes;
};

// Alternate somewhat cheating solution because it uses shift().
var maxSlidingWindow = function(nums, k) {
    
    if (k === 1 ) return nums;
    if (k === 0) return [];
    if (k === nums.length) return [Math.max.apply(null, nums)];
    
    let deque = [];
    let answer = [];
    
    for (let i = 0; i < nums.length; i++) {
        
        while (deque[0] !== null && deque[0] < i - k + 1 ) {
            deque.shift();
        }

        while(deque[deque.length - 1] && nums[deque[deque.length - 1]] < nums[i]) {
            deque.pop();
        }
        
        deque.push(i);
        
        if (i === k - 1 ) {
            answer.push(Math.max.apply(null, nums.slice(0,i+1)));
        }
        else if(i + 1 >= k) {
            answer.push(nums[deque[0]]);
        }
    }
    
    return answer;
};


//maxSlidingWindow([1,-1], 1);
//maxSlidingWindow([1,3,1,2,0,5],3);

/*
    Explanation: Trivial to do this in O(nk) time but we can do O(n).
    Use a deque (double ended queue). Push elements in to the deque based on the following.
    if the element you are trying to add to the deque (current) is smaller than the head (last)
    element in the deque, push it. If it is bigger, then continually pop items from the deque
    until it is empty of you reach an element that is larger. Check also to make sure that the
    head of the deque is still in range of the window and pop accordingly. The deque stores 
    indeces of the whole array. Once you have reached i=k while walking through the array
    you can start pushing elements into an answers array by fetching the 0th index of the deque.
    It will always be the max.
*/


// ====================================================================================================================================


// Maximum subarray. Find the sum of the largest contiguous subarray.




