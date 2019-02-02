![image](https://malcoded.com/v1/api/asset/angular-web-assembly.webp)
# Using Web Assembly to speed up your Angular Application

For some applications, JavaScript just isn't fast enough...

But there is hope!

Web Assembly is faster than JavaScript and can run in the most popular browsers today!

In this tutorial, we are going to take a look at Web Assembly in angular. 

We will discover how we can compile any C program into Web Assembly and the use inside of a simple angular service to speed things up!

Ready?

Let's get started!

[Read the full article on malcoded.com](https://malcoded.com/posts/web-assembly-angular)

## Building WASM

```
emcc wasm/fibonacci.c -Os -s WASM=1 -s MODULARIZE=1 -o wasm/fibonacci.js
```

## Starting the Angular app

```
yarn start
```
