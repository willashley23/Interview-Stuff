# JavaScript
A list of key JS questions you must know the answer to for interviewing.

## Event Delegation/Bubbling
When an event is fired from an element, the event will be bubbled up to its parent nodes. However, the original element where the event occurs, called 'target', stays the same in the event object. Using the target property, we can always keep tracking which element actually causes an event captured by its parent, and it can help use reduce the number of event handlers as we sometimes don't need to add event listeners for every element.

## Explain 'this'
The this keyword behaves differently in JavaScript compared to other language. In Object Oriented languages, the this keyword refers to the current instance of the class. In JavaScript the value of this is determined mostly by **the invocation context** of function (context.function()) and where it is called.

## Explain Prototypal inheritance
JavaScript only one construct: objects. Each object has internal link to another object - it's prototype. That has prototype of it's own and so on until object with null as a prototype. All derive from Object.prototype unless set to null

Objects are just collections of properties. objects inherit the properties of the objects up the prototype chain. They can be overwritten. If you try to access a property of an object, it will check itself, then it's prototype, then up until it either finds one or returns null.

Can add properties to prototype and any instances of object created with new constructor will immediately have them.

### `.prototype` vs `.__proto__`
`__proto__` is the actual object that is used in the lookup chain to resolve methods, etc. prototypeis the object that is used to build `__proto__` when you create an object with new. `prototype` store the `__proto__`

## Scope

JavaScript has **lexical scope** aka **static scoping** and **function scoping**. `let` messes with this a bit. But basically, every time a `function` is declared, a new scope is created. JavaScript starts at the innermost scope and looks outward to resolve variables. `let` is block scoped, whereas `var` is function scoped. 

```
function foo() {
	if (true) {
	   let a = 3; 
	   // this is scoped strictly to the if block
	}
	
	if (true) {
		console.log(a) // throws error.
	} 

}
```

### Closures
A function that can be stored as a variable in order to implement lexically scoped name binding, that has a special ability to access other variables local to the scope it was created in…. implementing lexically scoped name binding in languages with first-class functions. Operationally, a closure is a record storing a function[a] together with an environment:[1] a mapping associating each free variable of the function (variables that are used locally, but defined in an enclosing scope) with the value or reference to which the name was bound when the closure was created.[b] A closure—unlike a plain function—allows the function to access those captured variables through the closure's copies of their values or references, even when the function is invoked outside their scope.
Useful in functions that create other functions. Also used in module pattern to specify "public" methods and encapsulate "private" ones. A good use case is onClick.


### Hoisting
What is going on here? It turns out that JavaScript treats variables which will be declared later on in a function differently than variables that are not declared at all. Basically, the JavaScript interpreter "looks ahead" to find all the variable declarations and "hoists" them to the top of the function. 


### Arrow functions

* Arrow functions are always anonomous. 
* They cannot recieve `arguments`.
* They cannot be constructors.
*  They do not introduce a new scope, so `this` will retain the context of the enclosing function.
*   You only need parenthesis for the params if you are using more than one parameter.

*Refer to the App Academy curriculum on arrow functions for explanation of these.*

### Pros/Cons of anon functions
* If no name is needed because the function is only ever called in one place, then why add a name to whatever namespace you're in.
* The code seems more self-contained and readable when handlers are defined right inside the code that's calling them. You can read the code in almost sequential fashion rather than having to go find the function with that name.

Good explanation of anon functions and function declaration vs function operator: http://helephant.com/2008/08/23/javascript-anonymous-functions/


## AMD vs. CommonJS (Dependency Injection)

*tl;dr AMD = requireJS, good for async loading, CommonJS is node backend module.exports and require, both will be irrelevant once node and browsers support import/export module loading natively*

AMD is preferred where async loading is common (i.e. the browser). Server-side, CommonJS/Node.js style "require" is the norm. Eventually it will all be ES2015 modules, so there's really no point in committing to one or the other. Pick the best tool for the job and wait for ES2015 modules.

AMD (async module…D) aka requireJS or Dojo, is used to load modules asynchronously. CommonJS is module.exports and ‘require’. It is a part of Node and is the norm. None of this matters because eventually ES6 import export will be the norm once Node gets its shit together and starts supporting it natively. Until then, you will need to just transpile it using Babel.  


## Host objects vs Native objects

Native objects: `Object (constructor)`, `Date`, `Math`, `parseInt`, `eval`, string methods like indexOf and replace, array methods, ...

Host objects (assuming browser environment): `window`, `document`, `location`, `history`, `XMLHttpRequest`, `setTimeout`, `getElementsByTagName`, `querySelectorAll`


## Call vs Apply

C for comma, A for array.
Call takes in arguments separated by commas, Apply takes arguments as an array.
`Math.max.apply(null, nums);`


## HTTP

### Ajax
Simply put, AJAX is the use of JavaScript to send and receive using HTTP without reloading the page. AJAX is an acronym for asynchronous JavaScript and XML, and is used as a technique for creating client-side asynchronous web applications. AJAX is considered a group of technologies. HTML and CSS can be used in combination to mark up and style information. JavaScript and the XMLHttpRequest object provide the method for exchanging data asynchronously between the browser and the server.
What is AJAX used for, and what companies use it?
Login forms — digg.com
Auto-complete with the search bar — google.com
Voting and rating content — reddit.com
Updating user content — twitter.com
Why do developers use AJAX?
AJAX provides more efficient and smoother running applications, which gives users better interactive experiences.
How does AJAX work?
AJAX, sends and retrieves data from a server asynchronously. This enables the web application to continue running and dynamically display. It allows the user to interact with the information presented on the page, avoiding full page reloads.
The image below shows the process the execution of AJAX.
A user interaction in the browser triggers the event, such as a button click
The AJAX call fires. This creates and AJAX request, browsers use the XMLHttpRequest object. When the server responds to the browser’s request, the same XMLHttpRequest object will process the result.
3. The server-side script receives the input from JavaScript, and processes the data.
4. After the data is processed, the script sends the data back to the original client-side page that made the request via XML
5. Once the data is received, a second JavaScript callback function, is called this function captures the data, and updates the web page accordingly.
Newer technologies have slowly been replacing the XML in AJAX with JSON. The reason being, XML is a lot stricter than HTML, thus having larger file sizes, and harder to extract the data that is returned. JSON is less verbose, has proven to be more efficient, and working with data is much easier.


### Explain how JSONP works (and how it's not really AJAX).

A JSONP response contains a callback function usually written in JavaScript, and when the response is flushed, the callback will be launched. It's more like script tag injection, rather than AJAX. JSONP is just a way of getting around the same origin policy. you create a script tag and set its src to the url you want to GET.


## document.load vs document.ready

load is for when the HTML page and all its assets are loaded and rendered. ready is for when just the HTML page is loaded and rendered. load happens after ready.


## What's the difference between an "attribute" and a "property"?
Attribute: specified in HTML, always in the form of string
Property: specified in DOM object, can have any type of JavaScript


## What is "use strict";? what are the advantages and disadvantages to using it?

**Advantages**

Cannot assign a value to an undefined global variable
Fire TypeError for not-allowed assignments like var infinity = 5
this in a normal function refers to undefined, instead of global
In short, it secures JavaScript.

**Disadvantage**

When using global strict mode and concatenating the script with other scripts not using strict mode, the other scripts can be broken.


## Explain why the following doesn't work as an IIFE: function foo(){ }();.
Key word expression. a function expression can be invoked with parentheses. But a statement beginning with 'function' is a function declaration and can't be called with parenthesis after.

### Differentiate function Person(){}, var person = Person(), var person = new Person() 
First is a function declaration, essentially assigning a function to the namespace Person. Capitalization signals it is intended to be used as a constructor.
Second assigns person to be result of executing Person as a function, in this case nothing. 
Third creates a new object using Person as a constructor, with a prototype inherited from Person. Object.getPrototypeOf(person) == Person.prototype


## Expressions vs Statements 
Expression produces a value and can be written wherever a value is expected, for ex as an argument in a function call
- myvar
- 3 + x
- myfunc(a,b)
Roughly, statement performs an action. Loops and if statements.


## Difference between variable that is null, undefined, or undeclared. 
Null is a special value used to assign to a variable the representation of no value, undefined is the type, after declaration and before assignment, undeclared means does not exist, not bound to current environment.

can use typeof on undeclared var and will return undefined instead of error

null == undefined
null !== undefined
null != 0

### What are falsey values? 
0, false, undefined, null, NaN
"" == 0 == false
undefined == null 
undefined != false
null != false
NaN != anything
' ' == 0 but not falsey
== does type conversion usually by calling toNumber(toPrimitive(operand)), === does not

### Undefined vs Null:

typeof undefined is undefined. typeof null is object (but null is not really an object, it is a primitive

common trick, why should you check for null with === and not == because == null will return true if the value is undefined. 
https://stackoverflow.com/questions/9032856/what-is-the-explanation-for-these-bizarre-javascript-behaviours-mentioned-in-the/9033306#9033306


##Explain Function.prototype.bind 
It creates a new function with the same body as the one being called on, and assigns it to the value given for 'this'.
Can be used to set default arguments, not setting value for this but supplying arg.


## What are the JavaScript Types? 
Boolean, Undefined, Number, String, Symbol (new in ECMA6), Object, function object
null is primitive value but type of object
all except object is immutable (can't change)


## Optimize a static webpage:
* Host images using a CDN (contend delivery network) like Cloudinary or S3 rather than locally storing them in assets.
* Use CSS sprites for layout graphics.
* Combine CSS files (minify)
* Merge JS files (if you have many script tags) so you can make fewer HTTP requests, which are by far the most expensive. 
* Set the EXPIRES header for purely static pages, set the date far in the future, so that when an asset is downloaded once, it is cached by the browser and never requested again. In **apache it’s ExpiresActive ON**
* Serve Gzipped content.


##Web APIs you have used 
(window.history.push)
window.history
	window.history.forward()/back() – they push and pop items on the session history stack
window.location.href/origin. altering location pushes to history stack
window.location.hash
window.on(‘hashChange’), ‘resize’, etc.


## Pass By Reference or Pass By Value
JavaScript is pass by value, but with some caveats. Every parameter passed in to a function is passed in by value, however for objects, that value is itself a reference. First, understand what pass by reference means. PBR means you are passing a function the literal address in memory for an object. You are giving the function a direct pointer to that object. So if inside the function, you reassign that param to something else, the address in memory changes, and you would see those changes propagate outside the scope of the function. In a PBV language, you are only passing the objects value as a parameter, not a pointer to its location in memory. Reassigning it inside the scope of the function does nothing to the object outside the function because of this. Anyway, JS passes by value, but values are references. So, if we say a.foo = “new!” we are accessing the property of the reference and that will propagate. But saying a = “different!” will not, because you are changing the reference to a new object (which immediately goes out of scope when the function exits). This is called reference-by-value or call-by-sharing


## Ajax Tidbit

AJAX returns a promise if no success function is specified. An interview question might go something like this… make an ajax request to get a string back and then decode the message bit by bit.

```
function decode(str)
{
	var promises = [];
	for(let char in str)
	{
		promises.push(
			$.ajax({
			 	type: 'GET',
   				url: 'http://example.com'
			})
		);
	}
	$.when.apply(null, promises).done(function() {
		// do something
	});

}
```
