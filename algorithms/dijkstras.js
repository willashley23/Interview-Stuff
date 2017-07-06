/*jshint esversion: 6 */

class PriorityQueue {

    constructor() {
        this.nodes = [];
    }

    enqueue(key, priority) {
        this.nodes.push({key: key, priority: priority});
        this.sort();
    }

    dequeue() {
        return this.nodes.shift().key;
    }

    sort() {
        this.nodes.sort( (a, b) => {
            return a.priority - b.priority;
        });
    }

    isEmpty() {
        return !this.nodes.length;
    }
}

/* ========================================== */


class Graph {

    constructor() {
        this.vertices = {};
    }

    addVertex(name, edges) {
        this.vertices[name] = edges;
    }

    dijkstra(start, finish) {

    }

}


var g = new Graph();

g.addVertex('A', {B: 7, C: 8});
g.addVertex('B', {A: 7, F: 2});
g.addVertex('C', {A: 8, F: 6, G: 4});
g.addVertex('D', {F: 8});
g.addVertex('E', {H: 1});
g.addVertex('F', {B: 2, C: 6, D: 8, G: 9, H: 3});
g.addVertex('G', {C: 4, F: 9});
g.addVertex('H', {E: 1, F: 3});

// Log test, with the addition of reversing the path and prepending the first node so it's more readable
console.log(g.dijkstra('A', 'H').concat(['A']).reverse());

