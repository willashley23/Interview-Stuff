/*jshint esversion: 6 */

class PriorityQueue {

    constructor() {
        this.nodes = [];
    }

    enqueue(priority, key) {
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
        this.infinity = 1/0;
    }

    addVertex(name, edges) {
        this.vertices[name] = edges;
    }

    dijkstra(start, finish) {

        let nodes = new PriorityQueue();
        let distances = {};
        let previous = {};
        let path = [];
        let smallest, vertex, neighbor, alt;

        for (vertex in this.vertices) {
            if (vertex === start) {
                distances[vertex] = 0;
                nodes.enqueue(0, vertex);
            } 
            else {
                distances[vertex] = this.infinity;
                nodes.enqueue(this.infinity, vertex);
            }
        }

        while(!nodes.isEmpty()) {

            smallest = nodes.dequeue();

            if (smallest === finish) {
                path = [];

                while(previous[smallest]) {
                    path.push(smallest);
                    smallest = previous[smallest];
                }

                break;
            }

            if (!smallest || distances[smallest] === this.infinity) {
                continue;
            }

            for(neighbor in this.vertices[smallest]) {
                alt = distances[smallest] + this.vertices[smallest][neighbor];

                if (alt < distances[neighbor]) {
                    distances[neighbor] = alt;
                    previous[neighbor] = smallest;

                    nodes.enqueue(alt, neighbor);
                }
            }
        }

        return path;
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

