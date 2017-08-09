# JavaScript
This is a compilation of JS questions I have encountered in interviews or found online. It also contains general web knowledge, and stuff that is tangentially related to JS.

## Event Delegation/Bubbling
When an event is fired from an element, the event will be bubbled up to its parent nodes. However, the original element where the event occurs, called 'target', stays the same in the event object. Using the target property, we can always keep tracking which element actually causes an event captured by its parent, and it can help use reduce the number of event handlers as we sometimes don't need to add event listeners for every element.

## Explain 'this'
The this keyword behaves differently in JavaScript compared to other language. In Object Oriented languages, the this keyword refers to the current instance of the class. In JavaScript the value of this is determined mostly by **the invocation context** of function (context.function()) and where it is called.

## Explain Prototypal inheritance
JavaScript only one construct: objects. Each object has internal link to another object - it's prototype. That has prototype of it's own and so on until object with null as a prototype. All derive from Object.prototype unless set to null

Objects are just collections of properties. objects inherit the properties of the objects up the prototype chain. They can be overwritten. If you try to access a property of an object, it will check itself, then it's prototype, then up until it either finds one or returns null.

Can add properties to prototype and any instances of object created with new constructor will immediately have them.

#### `.prototype` vs `.__proto__`
`__proto__` is the actual object that is used in the lookup chain to resolve methods, etc. prototypeis the object that is used to build `__proto__` when you create an object with new. `prototype` store the `__proto__`

## Scope

JavaScript has **lexical scope** aka **static scoping** and **function scoping**. `let` messes with this a bit. But basically, every time a `function` is declared, a new scope is created. JavaScript starts at the innermost scope and looks outward to resolve variables. `let` is block scoped, whereas `var` is function scoped. 

```
function foo() {
	if (true) {
	  
	   // this is scoped strictly to the if block
	   let a = 3;
	   
	   // This is scoped to the function foo;
	   var b = 4;
	}
	
	if (true) {
		console.log(a) // throws error.
		console.log(b) // 4.
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
* They do not introduce a new scope, so `this` will retain the context of the enclosing function.
* You only need parenthesis for the params if you are using more than one parameter.

*Refer to the App Academy curriculum on arrow functions for explanation of these.*

### Pros/Cons of anon functions
* If no name is needed because the function is only ever called in one place, then why add a name to whatever namespace you're in.
* The code seems more self-contained and readable when handlers are defined right inside the code that's calling them. You can read the code in almost sequential fashion rather than having to go find the function with that name.

[Good explanation of anon functions and function declaration vs function operator](http://helephant.com/2008/08/23/javascript-anonymous-functions/)


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

### Explain HTTP
HTTP is a protocol used to facilitate request-response transactions between clients and servers. The client send the HTTP request over the wire, containing headers (optional bits of info like access tokens, CORS shit), an HTTP verb (such as GET, implied by the url), and optional body. 

The server uses a regex to parse the request url, and then sends it to the application layer to look up the requested resource, which may involve the application layer connecting to a db. It then sends the request back over the wire, with the status code in the header, which is one of the first things the browser checks. 

This whole process is called an *HTTP Transaction*. A key point about these transactions is that they are *stateless*. Once the connection is closed, the server has no state or memory of that connection. You cannot request `/img/23` and then request `/img/next` because the server has no idea you were on 23, unless you specify that in the body.

* Cookies are expensive to constantly send back and forth, especially on **mobile web**. Consider using `localStorage` instead.

### HTTPS
First, let's state the problem. When you make a request to a site, your request passes through many different networks, through routers, network switches, each of which could be tampered with or eavesdropped: they can see what's going through the wire. In traditional HTTP reqests, requests are sent as plain text. Not good if you're sending passwords.

#### TLS
Transport Layer Security, the successor to Secure Socket Layer (SSL) is a protocol used to implement HTTPS. It secures the connection with:

**public key encryption:** each party has a privte and public key. The public key encrypts the the plain text request and the private key decrypts it.

#### HTTP/2
HTTP 2.0 is a binary protocol that multiplexes numerous streams going over a single (normally TLS-encrypted) TCP connection.

The contents of each stream are HTTP 1.1 requests and responses, just encoded and packed up differently. HTTP2 adds a number of features to manage the streams, but leaves old semantics untouched.

A stream is an independent, bi-directional sequence of frames exchanged between the client and server within an http2 connection.

A single http2 connection can contain multiple concurrently-open streams, with either endpoint interleaving frames from multiple streams. Streams can be established and used unilaterally or shared by either the client or server and they can be closed by either endpoint. The order in which frames are sent within a stream is significant. Recipients process frames in the order they are received.

Multiplexing the streams means that packages from many streams are mixed over the same connection. Two (or more) individual trains of data are made into a single one and then split up again on the other side. 

In summary: 

* Supports multiplexing queries
* Header compression
* Reduced latency and download times

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

## Web sockets

Web sockets use a TCP based protocol (ws://)
[sockety!!!](https://github.com/willashley23/TechnicalConceptsForInterviews/blob/master/WebSocket.md)

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

## Addition
This is super granular and anyone who asks you this in an interview is probably out of their mind but anyway:

`{} + [] // 0`: left hand gets parsed as an empty block, leaving the right hand which considering we are doing addition, tries to convert the array into a primitive, so 0.

`({} + []) // [object Object]`: The parenthesis change the object from being parsed as an empty block to being parsed as an empty object, so it tries to convert it to a primitive, in this case, `object Object`, the string representation of an object. Then it basically tries to perform string concatination with the remaining operand, so it must call `toString(toPrimitive([]))` on the array, which is an empty string.

`[] + {} // [object Object]`: JS calls `toPrimitive` on the first array, which calls `valueOf` on the array. If that does not return a primitive, it then tries to convert it to a string. [More on this in 1.1](http://2ality.com/2012/01/object-plus-object.html)


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

Is S3 really a CDN? What are some common problems ppl run into with CDNs. What should you CDN? Big images, small images? Should you CDN your .html files? 

## Webpack, bundling, and tree shaking
Webpack:  a module bundler. Create a single bundle.js. Make only one `script` tag request in the html. But this doesnt work for big apps. Solution? 

### Tree shaking
What is it? How does webpack help?

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

## Security

### XSS
How do you inject code into the foreign page? inject the script tag?

#### XSS Defense

[page 7](https://web.stanford.edu/~ouster/cgi-bin/cs142-winter14/downloads/Final%20(Fall%202010)%20Solution.pdf)
## iframes

What is an iframe. What considerations do you need to make when making a plugin that another site will use. Consider JS and CSS. How will you contain it to make sure it doesnt mess up the user's site?

How does the JS in an iframe communicate with BOTH the iframe's server AND the current user's server? Like how does it surface information to both?

## ES6 Features
* Arrow functions
* `let` `const`
* `import`/`export`
* class syntax and inheritance
* `Symbol` type
* misc: `Array.from()`

## Angular function black magic 
how does it work? what is it? What does it have to do with `arguments`? How can we simulate this with vanilla JS?

## Arguments
`arguments` is an array-like object. Notice how it includes all arguments including the extra ones? You can simply key into them via indeces.

```
function foo (a,b) {
	console.log(arguments)
}

foo("this","is","an","argument")
// { '0': 'this', '1': 'is', '2': 'an', '3': 'argument' }
```

## What else can you specify on a `<script>` tag?

besides `type` and `src` and how does it help us with downloading the script...or iframes or some shit.

`async`: A boolean attribute indicating that the browser should, if possible, execute the script asynchronously.

`crossorigin`: Normal script elements pass minimal information to the window.onerror for scripts which do not pass the standard CORS checks. To allow error logging for sites which use a separate domain for static media, use this attribute.

`defer`: This Boolean attribute is set to indicate to a browser that the script is meant to be executed after the document has been parsed, but before firing `DOMContentLoaded`. 

`integrity`: Contains inline metadata that a user agent can use to verify that a fetched resource has been delivered free of unexpected manipulation.

Also, look up dynamic script tags!

## Can you reassign an const declared object's properties?

```
const foo = {
	bar: "I'm just me!"
}

foo.bar = "not anymore!"
console.log(foo.bar) // not anymore!
```
Yes, you can. What you *cannot* do is reassign foo to another value entirly. `const` protects the reference to the location in memory. Changing that memory address is illegal, but changing properties of what rests in that memory address is fine.

Follow up: how could we make it so the props were read only? Proxies...and what else?

`Object.freeze` will prevent writing, deleting, and adding to an object's props.

```
const foo = Object.freeze( {
	bar: "neva gonna change"
});

foo.bar = "plz";
console.log(foo.bar) // neva gonna change

```

There is also `Object.defineProperty` which lets you pass in an object of params such as `writable: false`


## Promises and ES7 `async`

`In the beginning` there was callback hell. The callback christmas tree. You know the horror. At each callback, you had to either specify an error function or use an if block to catch the error before starting the next callback. 

`Promises` came a long as a way to try and clean that up. Promises represent a value that will eventually be something. Instead of passing a callback, you just call `.then( (params) => {dosomething(params)})` and at the end you call `.catch( e => {console.error(e)})`. It gave us a nice linear progression that was much more readable. `async` does this even better.

`async function foo()` is the declaration syntax. When an async function is called, it returns a Promise. When the async function returns a value, the Promise will be resolved with the returned value.  When the async function throws an exception or some value, the Promise will be rejected with the thrown value. 

An async function can contain an `await` expression, that pauses the execution of the async function and waits for the passed Promise's resolution, and then resumes the async function's execution and returns the resolved value. It takes a promise, waits for it to return a value, then returns that value. 
`var user = await User.get(request.user);`

This code returns a promise:

`require("popsicle").get("http://www.google.com");`

This code returns the value of that promise once it is ready:

`await require("popsicle").get("http://www.google.com");`


But JavaScript's model hasn't changed, it's still single threaded. The code is only interrupted by your explicit command to "await". You can still mess up by sharing state, but that's nothing new. Follow up: go in detail about JavaScript threading, what it means, concurrency, etc.

`await` gives you explicit control over concurrency. You can combine this with powerful promise utilities like Promise.all, which will wait for every promise to finish and then finish itself, to write powerful and yet easy to understand asynchronous code.

[Source](http://rossboucher.com/await/#/)