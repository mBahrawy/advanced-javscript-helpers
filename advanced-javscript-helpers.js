
// https://www.paulsblog.dev/advanced-javascript-functions-to-improve-code-quality/

// Debounce
// ----------
// A debounce function is a method for preventing a quick series of events from 
// repeatedly activating a function. It works by postponing function execution 
// until a certain period has passed without the event being fired. The Debounce 
// function is a useful solution that could be applied in real-world applications to
// increase performance by preventing the execution of functions if a user is rapidly 
// clicking the buttons.

export function debounce(func, delay) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), delay);
    };
  }



// Throttle
// ----------
// The Throttle function is similar to the Debounce function but with slightly 
// different behavior. Instead of limiting the rate at which the function is called, 
// the Throttle function limits the rate at which the function is executed. 
// This means it will forbid executing if the function was invoked before within a given period. 
// It guarantees that a certain function runs at a consistent rate and won't be triggered too often.

export function throttle(func, delay) {
    let wait = false;
  
    return (...args) => {
      if (wait) {
          return;
      }
  
      func(...args);
      wait = true;
      setTimeout(() => {
        wait = false;
      }, delay);
    }
  }


// Once
// ----------
// The Once function is a method that will prevent executing if already called. 
// This is especially useful while working with event listeners, 
// where you often encounter functions that only should run once. 
// Instead of removing event listeners every time you can use the Once function in JavaScript.
export function once(func) {
    let ran = false;
    let result;
    return function() {
      if (ran) return result;
      result = func.apply(this, arguments);
      ran = true;
      return result;
    };
  }





// Memoize
// ----------
// Memoize is a JavaScript function, that is used to cache the results of a given function 
// to prevent calling computationally expensive routines multiple times with the same arguments.

export function memoize(func) {
    const cache = new Map();
    return function() {
      const key = JSON.stringify(arguments);
      if (cache.has(key)) {
          return cache.get(key);
      }
      const result = func.apply(this, arguments);
      cache.set(key, result);
      return result;
    };
  }



// Curry
// ----------
// The Curry function (also known as Currying) is an advanced JavaScript function 
// used to create a new function from an existing one by "pre-filling" some of its arguments. 
// Currying is often used when working with functions that take multiple arguments 
// and transform them into functions that take some arguments because the other will always stay the same.

// Using the Curry function has several benefits:
// - It helps to avoid using the same variable again and again
// - It makes code more readable
// - It divides functions into multiple smaller functions that can handle one responsibility

export function curry(func, arity = func.length) {
    return function curried(...args) {
      if (args.length >= arity) return func(...args);
      return function(...moreArgs) {
        return curried(...args, ...moreArgs);
      };
    };
  }


// Partial
// ----------
// The Partial function in JavaScript is similar to the Curry function. 
// The significant difference between Curry and Partial is that a call 
// to a Partial function returns the result instantly instead of returning another function down the currying chain.

export function partial(func, ...args) {
  return function partiallyApplied(...moreArgs) {
    return func(...args, ...moreArgs);
  }
}


// Pipe
// ----------
// The Pipe function is a utility function used to chain multiple functions 
// and pass the output of one to the next one in the chain. It is similar to 
// the Unix pipe operator and will apply all functions left-to-right by using the JavaScript reduce() function:

export function pipe(...funcs) {
  return function piped(...args) {
    return funcs.reduce((result, func) => [func.call(this, ...result)], args)[0];
  };
}

// Compose
// ----------
// The Compose function is the same as the Pipe function, but it will use reduceRight to apply all functions:

export function compose(...funcs) {
  return function composed(...args) {
    return funcs.reduceRight((result, func) => [func.call(this, ...result)], args)[0];
  };
}



// Pick
// ----------
// The Pick function in JavaScript is used to select specific values from an object. 
// It is a way to create a new object by selecting certain properties from a provided project. 
// It is a functional programming technique that allows extracting a subset of properties from any object if the properties are available.

// - obj: Original object where the new object will be created from
// - keys: Array of keys to select into the new object.

export function pick(obj, keys) {
  return keys.reduce((acc, key) => {
    if (obj.hasOwnProperty(key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}


// Omit
// ----------
// The Omit function is the opposite of the Pick function, as it will remove certain properties from an existing object. 
// This means you can avoid over-fetching by hiding properties. 
// It can be used as a replacement for the Pick function if the amount of properties to hide is smaller than the number of properties to pick.

// - obj: Original object where the new object will be created from
// - keys: Array of keys to select into the new object.

export function omit(obj, keys) {
  return Object.keys(obj)
    .filter(key => !keys.includes(key))
    .reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});
}


// Zip
// ----------
// The Zip function is a JavaScript function that matches each passed array of elements 
// to another array element and is used to combine multiple arrays into a single array of tuples. 
// The resulting array will contain the corresponding elements from each array. 
// Often, this functionality is used when working with data from multiple sources that need to be merged or correlated in some way.

// Unlike Python, JavaScript does not provide the Zip function out of the box. But, the implementation is easy:

export function zip(...arrays) {
  const maxLength = Math.max(...arrays.map(array => array.length));
  return Array.from({ length: maxLength }).map((_, i) => {
    return Array.from({ length: arrays.length }, (_, j) => arrays[j][i]);
  });
}
