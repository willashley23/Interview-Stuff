/*jshint esversion: 6 */

class PriorityQueue {

    constructor() {
        this.contents = [];
    }

    enqueue(data) {
        
        if (this.contents.length <= 0) {
            this.contents.push(data);
        } 
        else if (this.contents[0] > data) {
            let temp = this.contents[0];
            this.contents[0] = data;
            this.contents.push(temp);
        }
        else {
            this.contents.push(data);
        }

        return this.contents;
    }

    dequeue() {
        if (this.contents.length <= 0) {
            return null;
        }
        else {
            // First, remove the first element and store its value
            let temp = this.contents.shift();
            // Get the min from the remaining set
            let min = Math.min.apply(null, this.contents);
            // Find its index
            let minIdx = this.contents.indexOf(min);
            // Take the last element in the queue and move it to the idx currently occupied by the min we just found
            this.contents[minIdx] = this.contents[this.contents.length - 1];
            // Now the min we found is at the end of the list - remove it
            this.contents.pop();
            // Put it at the head of the list
            this.contents.unshift(min);

            // All of this occurs in O(n) time.
            return temp;
        }

    }

    getMin() {
        return this.contents[0];
    }

    sort() {

    }

    print() {
        return this.contents;
    }
}

let q = new PriorityQueue();
q.enqueue(10);
q.enqueue(5);
q.enqueue(3);
q.enqueue(1);
q.enqueue(42);
q.enqueue(7);




