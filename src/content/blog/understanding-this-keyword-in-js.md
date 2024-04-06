---
author: Serhat Oner
pubDatetime: 2023-03-05
title: Understanding the This keyword in JavaScript
postSlug: understanding-this-keyword-in-js
featured: true
draft: false
tags:
  - javascript
  - this
  - functions
  - objects
  - constructor functions
ogImage: "https://livecodestream.dev/post/understanding-this-keyword-in-javascript/featured.jpg"
description: A short explanation of this keyword in JavaScript language.
---

## Table of contents

In JavaScript, the `this` keyword refers to the object that the current function is a property of. The value of `this` depends on how the function is called, not where it is defined.

Here are some common use cases of `this`:

## With Objects

When a function is called as a method of an object, `this` refers to the object.

```javascript
const person = {
  name: "John",
  greet: function () {
    console.log("Hello, my name is " + this.name);
  },
};

person.greet(); // outputs: "Hello, my name is John"`
```

## With Constructor Functions

When a function is called as a constructor, `this` refers to the new object being constructed.

```javascript
function Person(name) {
  this.name = name;
  this.greet = function () {
    console.log("Hello, my name is " + this.name);
  };
}

const john = new Person("John");
john.greet(); // outputs: "Hello, my name is John"
```

## With Standalone Functions

When a function is called as a standalone function, `this` refers to the global object (`window` in a web browser, or `global` in Node.js).

```javascript
function greet() {
  console.log("Hello, my name is " + this.name);
}

greet(); // outputs: "Hello, my name is undefined"`
```

## With Arrow Functions

In an arrow function, `this` refers to the value of `this` in the surrounding code. Always shows one block up. In this example, greet is an arrow function, its a method of **person object**. One block up from the `person` object is the global area, value of the variable name is mike.

```javascript
window.name = "mike";

const person = {
  name: "John",
  greet: () => {
    console.log("Hello, my name is " + this.name);
  },
};

person.greet(); // outputs: "Hello, my name is mike"`
```

In the above example, `this` inside the arrow function refers to the global `this` value, not the `person` object, because arrow functions do not have their own `this` value.

## Conclusion

In JavaScript, the reference value being hold by `this` keyword depends on where it's used.

- When used within an object function, `this` refers to the object itself.
- When used within a constructor function, `this` refers to the new object being created.
- When used within a standalone function, `this` refers to the global object (i.e. "window" in web browsers and "global" in NodeJS).
- When used within an arrow function, `this` refers to the one-block up of the enclosing scope (i.e. the scope in which the arrow function is defined).
