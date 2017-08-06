/*jshint esversion: 6 */

// Permutations

var permArr = [],
  usedChars = [];

function permute(input) {
  var i, ch;
  for (i = 0; i < input.length; i++) {
    ch = input.splice(i, 1)[0];
    usedChars.push(ch);
    if (input.length === 0) {
      permArr.push(usedChars.slice());
    }
    permute(input);
    input.splice(i, 0, ch);
    usedChars.pop();
  }
  return permArr;
}

function subs (arr) {

  var i, j, temp;
  var result = [];
  var arrLen = arr.length;
  var power = Math.pow;
  var permutations = power(2, arrLen);

  for (i = 0; i < permutations ; i++) {
    temp = '';
    for (j = 0; j < arrLen; j++) {
      if ((i & power(2, j))) {
        temp += arr[j];
        }
    }
    if (temp !== '') {
      result.push(temp);
    }
  }
  return result.join('\n');
}


function isWordBreakable (s, dict, answer) {
  // console.log(s + '  ' + answer);
  var strLen = s.length;
  if (strLen === 0) {
    console.log(answer);
    return true;
  } else {
    var prefix = '';
    for (var i = 0; i < strLen; i++) {
      // add one char at a time
      prefix += s.charAt(i);
      // check if prefix exists in dictionary
      // if (dict.includes(prefix)) { // Array.prototype.includes() is an ES7 Feature
      if (dict.indexOf(prefix) > -1) {
        //add prefix to the answer and make a recursive call
        answer += prefix + ' ';
        var suffix = s.slice(i + 1);
        if (isWordBreakable(suffix, dict, answer)) {
          return true;
        }
      } 
      //console.log(prefix + '  backtrack');
    }
  }
}



// Valid balanced parens O(n)

function parenthesesAreBalanced(str) {
  let parens = "{}[]()";
  let stack = [];
  let character;
  let position;
  
  for(let i = 0; character = str[i]; i++ ) {
    position = parens.indexOf(character);
    
    if (position === -1) {
      continue;
    }
    
    if (position % 2 === 0) {
      stack.push(position + 1);
    } else {
      if (stack.length === 0 || stack.pop() != position) {
        return false;
      }
    }
  }
  return stack.length === 0;
}

// Stock picker in O(n) time and O(1) space.
function getMaxProfit(stockPricesYesterday) {
  
    if (stockPricesYesterday.length < 2) {
        return 0;
    }
    
    let minPrice = stockPricesYesterday[0];
    let maxProfit = stockPricesYesterday[1] - stockPricesYesterday[0];

    for (let i = 1; i < stockPricesYesterday.length; i++) {
        let currentPrice = stockPricesYesterday[i];
        let potentialProfit = currentPrice - minPrice;
        maxProfit = Math.max(maxProfit, potentialProfit);
        minPrice = Math.min(minPrice, currentPrice);
    }
    return maxProfit;
}

function rearrange(str) {
  let freq = {};
  let strarr = str.split("");
  let answer = new Array(str.length);
  for (let i = 0; i < str.length; i++) {
    if (freq[str[i]]) {
      freq[str[i]] += 1;
    } else {
      freq[str[i]] = 1;
    }
  }
  
  for (let el in freq) {
    if (freq[el] >= (str.length / 2) + 1) {
      return "No valid solution";
    }
  }
  
  let k = 0;
  for (let j = 0; j < answer.length; j += 2) {
    answer[j] = strarr[k];
    strarr.shift();
  }
  for (let n = 1; n < answer.length; n += 2) {
    answer[n] = strarr[k]
    strarr.shift();
  }
  return (answer.join(""))
}

// Was looking for a good example of a Fisher–Yates shuffle
function shuffle(array) {
  let m = array.length;
  let t;
  let i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

// Reverse Doubly Linked List

function reverseDoublyLL(dll){
   var head = dll.head,
       current = dll.head,
       tmp;
   while(current){
      tmp = current.next;
      current.next = current.previous;
      current.previous = tmp;
      if(!tmp){
         //set the last node as header
         dll.head = current;
      }
      current = tmp;
   }
  return dll;
}
   // 1-><-4-><-5-><-3->null/
   /*
        tmp = 5
        4<-1->null
   */
// Delete Kth node from end


function deleteKthFromEnd(sll, k){
   var node = sll.head,
       i = 1,
       kthNode,
       previous;
   if(k<=0) return sll;

    while(node){
      if(i == k) kthNode = sll.head;
      else if(i-k>0){
       previous = kthNode;
       kthNode = kthNode.next;
      }
      i++;

      node = node.next;
    }
    //kth node is the head
    if(!previous)
       sll.head = sll.head.next;
    else{
     previous.next = kthNode.next;
   }
   return sll;
}


// Delete Node from DLL

function deleteNodeDLL(val){
   var current = dll.head,
       previous;
   
   //delete head
   if(current.value == val){
      dll.head = current.next;
      //if there is only one node, then dll.head is null
      if(dll.head) dll.head.previous = null;
      return dll;
   }

   while(current.next){
      if(current.value == val){
         previous.next = current.next;
         current.next.previous = previous;
         return dll;
     }
     previous = current;
     current = current.next;
   }
   
   //delete last node
   if(current.value == val){
     previous.next = null;
   }
   return dll;
}

// Detect Loop in SLL

function detectLoop(sll){
   var slowPointer = sll.head, 
       fastPointer = sll.head;

   while(slowPointer && fastPointer && fastPointer.next){
     slowPointer = slowPointer.next;
     fastPointer = fastPointer.next.next;

     if(slowPointer == fastPointer){
        return true;
     }
   }
   return false;
}

// Insert to Sorted LL

function pushSorted(sll, val){
   var head = sll.head,
       current = head,
       previous;
   //value lower than head value
   if(val < sll.head.value){
      sll.head = {value: val, next: head};
      return sll;
   }

   while(current){
      if(current.value > val){
         previous.next = {value: val, next: current};
         return sll;
      }
      previous = current;
      current = current.next;
   } 
   //value higher than the last node value
   previous.next = {value:val, next: null};
   return sll;
}

// Number of bits in a num

function bitSize(num) {
    return num.toString(2).length;
}


