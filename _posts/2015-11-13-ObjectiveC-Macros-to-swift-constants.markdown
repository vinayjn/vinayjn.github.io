---
layout: post
title:  "Convert Objective C Macros To Swift Constants"
date:   2015-11-13 23:24:55
comments : true
categories: ios
keywords : convert, objective c, macros, swift, constants, closures, let, \#define, objc

description : Learn basic and advanced techniques to use complex Objective C macros in Swift.
---

[Objective C]() inherits the capabilities and features of [C]() so you can write C like [directives]() or preprocessors and the Objective C compiler([LLVM]()) won't complain. 

\#define is one such preprocessor which asks the compiler to replace the occurrence of a particular set of characters with another set of characters before compiling the source file. #define is also a great way of defining constants

	#define REPLACE_ME @"With This String"

This is a simple Macro, just by looking at it you can understand what it does. At compile time every occurrence of `REPLACE_ME` will be replaced by `With This String`.

After the introduction of Swift Programming Language app developers started porting their apps to Swift's modern syntax. The above macro can be easily ported to Swift with the `let` keyword.

	let REPLACE_ME = "With This String"

The new syntax : its clean, its short and it isn't scary. The code porting was easy. However, if you have worked on an app with thousands of source files(yes, .m files) then you may be used to see these type of complex macros. 

	#define DISPATCH_BACKGROUND_QUEUE(name,function) dispatch_queue_t backgroundQueue = dispatch_queue_create(name, 0); dispatch_async(backgroundQueue, ^{function});
	
	#define DISPATCH_MAIN_QUEUE(function) dispatch_async(dispatch_get_main_queue(), ^{function});

If you have seen macros like these and you are going to port these to Swift then read further.

Lets see this code in action. I am considering the background queue. 

	DISPATCH_BACKGROUND_QUEUE("BackgroundQueue",
			
			// Do some background stuff like file / database read write
			// Do some thing else
			// May be print some logs to debug 
		)

The code block above is a simpler way of writing this : 

	dispatch_queue_t backgroundQueue = dispatch_queue_create(name, 0); 
	dispatch_async(backgroundQueue, ^{
			
			// Do some background stuff like file / database read write
			// Do some thing else
			// May be print some logs to debug 
		});

Just to keep you in sync, this block of code executes the code between `^{ }` in a background thread without blocking the main thread. You can read more about it by referring to [Grand Central Dispatch]().

###Porting Complex Objective C macros to Swift Constants ###

If you are new to Swift and not comfortable in writing closures I would highly recommend the following references on Swift Closures

- [Swift Closures - Apple Docs](https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/Closures.html)
- [How Do I Declare a Closure in Swift?](http://fuckingclosuresyntax.com/)
- [Swift closures and functions](http://fuckingswiftblocksyntax.com/)

If you have gone through the following referrence I can expect you knowing that the complex macro in Objective C can be ported to Swift with the help of functions. I will try to make it as simple as I can by porting it word by word.

	#define DISPATCH_BACKGROUND_QUEUE(name,function) dispatch_queue_t backgroundQueue = dispatch_queue_create(name, 0); 									dispatch_async(backgroundQueue, ^{function});

ObjC : 
	
	#define DISPATCH_BACKGROUND_QUEUE

Swift : 
	
	func DISPATCH_BACKGROUND_QUEUE

The macro accepts two parameters one is a string and another is a code block. In Swift we can easily pass a block of code to another function with the help of Closures.

ObjC : 
	
	#define DISPATCH_BACKGROUND_QUEUE(name,function)

Swift : 
	
	func DISPATCH_BACKGROUND_QUEUE(queueName : String, codeBlock:()->())

A Swift function with two parameters, as simple as that.

ObjC : 

	#define DISPATCH_BACKGROUND_QUEUE(name,function) dispatch_queue_t backgroundQueue = dispatch_queue_create(name, 0); 																	dispatch_async(backgroundQueue, ^{function});

Swift : 

	func BGQueue(codeBlock:()->(), queueName : String){
	    let queue = dispatch_queue_create(queueName, nil)
	    dispatch_async(queue) { () -> Void in
	        codeBlock()
	    }
	}
