class Foo {
  
    constructor() {

        this.handlers = {
          
            get(target, key) {
              
                if (Reflect.has(target, key)) {
                    return Reflect.get(target, key);
                }

                return (...args) => {
                    throw new Error(`no such method ${key} in ${target.constructor.name}`);
                };

            }
        };

        return new Proxy(this, this.handlers);
    }
  
    fooMethod() {
        return "I'm a real method";
    }
  
}

const bar = new Foo();

bar.fooMethod();

try {
    bar.barMethod();
} 
catch(e) {
    Foo.prototype.barMethod = () => {
        console.log("Function definition! Metaprogramming!");
    };
    bar.barMethod();
}



