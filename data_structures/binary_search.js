// Iterative solution
function binarySearch(array, target) {
  let lo = 0,
      hi = array.length - 1,
      mid, 
      element;

  while ( lo <= hi) {
    mid = Math.floor((lo + hi) / 2, 10);
    element = array[mid];
    if (element < target) {
      lo = mid + 1;
    } else if (element > target) {
      hi = mid - 1;
    } else {
      return mid;
    }
  }
  return -1;
}

// Recursive solution, use 0 for left and array.length for right
function bsearch(array, target, left, right) {
  if (left > right) {
    return -1;
  }

  let middle = Math.floor( (right + left) / 2);
  if (array[middle] === target) {
    return middle;
  } else if (array[middle] > target) {
    return bsearch(array, target, left, middle - 1)
  } else {
    return bsearch(array, target, middle + 1, right);
  }
}