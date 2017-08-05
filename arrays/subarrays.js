/*jshint esversion: 6 */

// Return the maximum average subarray of size k. O(n);
function maxSubarrayAverage(arr, k) {
    
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
function maxSubarrayAverageWithArray(arr, k) {
    
    if (k === arr.length) return arr;

    let max = 0;
    let start, end = 0;
    for (let i = 0; i < k; i++) {
        max += arr[i];
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

function maxiumumContiguousSubarray(nums) {
    let maxEndingHere = 0,
        maxSoFar = 0;

    for (let el in nums) {
        maxEndingHere += nums[el];
        if (maxEndingHere < 0) {
            maxEndingHere = 0;
        }

        if (maxEndingHere > maxSoFar) {
            maxSoFar = maxEndingHere;
        }
    }

    return maxSoFar;

}

// Same as above but returns the array itself. Keep a pointer akin to what you did in the example at the top
// Start it at 0, and set the end to the current idx whenever the sum is greater than what we had before. 
// If the max ever turns neg, we must move the start to idx + 1, because we know [1,2,-100] will never be a part 
// of the max if [4,100000] follows, since it is neg. 
function maxiumumContiguousSubarray(nums) {
    let maxEndingHere = 0,
        maxSoFar = 0,
        start = 0,
        end = 0,
        s = 0;

    for (let el in nums) {
        
        maxEndingHere += nums[el];

        if (maxEndingHere < 0) {
            maxEndingHere = 0;
            s = parseInt(el) + 1;
        }

        if (maxEndingHere > maxSoFar) {
            maxSoFar = maxEndingHere;
            start = s;
            end = parseInt(el);
        }
    }

    return nums.slice(start, end + 1);

}

/* 
    maxiumumContiguousSubarray([100, -4, 100, 4, -100, 6]); maxiumumContiguousSubarray([1, 40, -10000, 39, 1, 3]); maxiumumContiguousSubarray([1,2,-100,4,100000]);
*/

// ====================================================================================================================================

// Longest arithmatic subsequence
function arithmaticPairOfThree(nums) {
    let length = nums.length;
    
    for (let i = 1; i < length - 1; i++) {
        let j = i - 1,
            k = i + 1;
            
        while (j >= 0 && k <= length - 1) {
            let sum = nums[j] + nums[k];
            if (sum === nums[i] * 2) return true;
            sum < nums[i] * 2 ? k++ : j--;
        }
    }
    
    return false;
}

/*
    So this one is actually really hard. The optimal DP solution is O(n^2) and involves creating either a hash table or a 2x2 matrix
    let me explain the above though. We can find an arithmatic sequence of three by using that algorithm. Lets use [10,15,19,20]
    as the example. Assume it will be sorted or sort it if necessary, as the final solution will be a degree higher in complexity anyway.
    We start at the second element, and check the adjacent two elements, 10, and 19. We sum them up, and if their sum is equal to double
    the current element (15), then viola, we have a sequence of three. If not... then we check to see whether our sum is too large or 
    too small. If it is too large, we need to try using a smaller left hand side number, so we decrement the lhs, in this case, it 
    would automatically end the loop. In the other case, we increase k, so i = 0, k = 3, and we try again, and this time, we see
    a sequence. We repeat this process for every element, so next iteration, we would have taken 19 as the center. 
*/

// ====================================================================================================================================

// Longest increasing subsequence




