let replaceOnce = /\w/;
let replaceEachInstance = /\w/g;
let str = "abcdef";
str.replace(replaceEachInstance, ' \\\\_(ツ)_/¯ ');

const reverseVowels = str => {
    
    let re = /[aeiouy]/g; // O(1) space because it is fixed?
    let vowels = str.match(re); // O(n) cost to find matches where n is the number of length of the string.
    return str.replace(re, function() { // O(n) - must walk through entire string to find matches
        return vowels.pop() // O(1)
    });
    
    // total, O(2n) => O(n) time, O(1) space. I suppose the natural follow up to this question would be to do it in-place with 2 pointers
}

String.prototype.replaceAt=function(index, character) {
      return this.substr(0, index) + character + this.substr(index+character.length);
   }

function reverseInPlace(str) {
    
    /*
    The only way I see to reverse in place is to use two pointers, one starting at the beginning, and the other, at the end.
    Move each one until they are both at a vowel, then use the specially defined replaceAt function to swap. String are immutable
    in JS, which makes this really a pain, and I'm not sure if the replaceAt function blows away any gains we may have gotten from
    doing this in place. The looping condition is if the left pointer has moved past the right pointer.
    */
    let left = 0;
    let right = str.length;
    let vowels = 'aeiouy';
    
    while(left < right) {
        if (vowels.indexOf(str[left]) !== -1 && vowels.indexOf(str[right]) !== -1) {
            let temp = str[left];
            str = str.replaceAt(left, str[right]);
            str = str.replaceAt(right, temp);
            left++;
            right--;
        }
        if (vowels.indexOf(str[left]) === -1) {
            left++;
        }
        if(vowels.indexOf(str[right]) === -1) {
            right--;
        }

    }
    return str;
}

reverseInPlace('aeiou')