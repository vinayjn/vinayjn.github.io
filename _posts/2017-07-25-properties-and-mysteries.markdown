---
layout: post
title:  "Demystifying @property and attributes"
date:   2017-07-25 01:09:25
tags: [ios, objc]
keywords : koder, koder.me, vinayjn, Vinay Jain, vinay, blog, objective c, swift, closures, objc, How to code in IOS, strong, weak, atomic, nonatomic, retain, copy, property, @property, @dynamic, @synthesize, nscopying, nsstring,
description: "Understanding what the keywords in between those parentheses mean."
---

Whenever we declare properties in Objective-C there are some keywords between the parentheses like `strong`, `weak`,  `atomic`, `nonatomic`. There can be multiple comma separated words in between the parentheses, sometimes we don't add any keywords there and keep the default compiler behavior. In this post we'll discuss what these keywords/attributes actually mean and what are the effects of using one over the other. `@property` are specific to Objective-C but the concepts can be applied to Swift as well, if you are a Swift only dev I still recommend going through this post once.

Broadly, the change in behavior of a property with these words fall into three categories, lets see what they are:

### Atomicity (atomic, nonatomic)

- #### atomic
atomic is the default behavior, if we don't type atomic or nonatomic then the property is atomic. atomic ensures that if we try to read the property we always get some valid value, it will never be junk or garbage data.

    Lets say, multiple threads are reading and writing the property simultaneously, at each and every instant the value read from the property is a good value. We don't know what the value will be, it can be the value before the new value gets written or it can be the new value.

- #### nonatomic
As it is (non)atomic it doesn't do whatever atomic does. To make a property nonatomic we have to add this keyword in between the parentheses. With nonatomic properties you lose the guarantee on the validity of values, reading a nonatomic property can return a garbage value.

Since atomic somehow manages the validity of the value, it has some performance limitations. Access to atomic properties are relatively slower than nonatomic properties. If you are creating properties which involve frequent write operations then it is recommended to make the properties nonatomic.

There's a confusion in most developer's mind that creating a property atomic makes it thread-safe. Atomicity has nothing to do with thread-safety. There are other ways to make the properties thread-safe but that discussion is beyond the scope of this post.

### Write Access (readonly, readwrite)

Both of these keywords are self explanatory. The default behavior is readwrite, so if we don't specify any of these the property will allow write access to the instance variable. readonly restricts write access from everyone including the class it is declared in.

To allow write access to the property in the class then we have to create an interface extension in the implementation file and override the property by making it readwrite. This way the classes importing this class will be restricted to modify its value.

````
// MyClass.h

@interface MyClass: NSObject

@property (nonatomic, readonly) NSString *value;

@end

// MyClass.m

@interface MyClass()

@property (nonatomic, readwrite) NSString *value;

@end

@implementation MyClass

- (void)setSomeValue:(NSString *)newValue {
    self.value = newValue;
}

@end

````
<br/>

### Storage & Ownership (strong, weak, copy)

Memory management in iOS is done with Automatic Reference Counting(ARC) and cleanup is dependent on the reference count or retain count of the objects in memory. An object sends a `dealloc` message as soon as its retain count reaches 0.

- #### strong
strong is the default behavior, if you don't specify any of the storage or ownership attributes the property holds a strong reference to the instance variable. A strong reference always owns the object is pointing to. Every strong reference to a variable increases its retain count by 1. Since the strong reference is owning the object, as longs as there is at least one strong reference to the variable it will not be deallocated from the memory.

- #### weak
weak is analogous to strong. When a property is weak, it holds a weak reference to the instance variable but doesn't own it. A weak reference doesn't increase the retain count of the object. If there are no strong references to the object the object will be deallocated and all the weak reference to this object are set to nil so that the weak pointers doesn't point to garbage data and the operations with these pointers doesn't crash the app.


    No discussion of strong and weak can end without talking about retain cycles.

Languages like Objective-C and C# depends on reference count to manage memory and these languages don't like retain cycles because when a retain cycle is present the memory management techniques fail.

A retain cycle occurs when properties hold strong references to each other's instance variables and when this happens both the objects cannot be deallocated because their reference count is not 0. Smart compilers give warnings about probable retain cycle on compile time only. To avoid retain cycles in these situations you can make one of the properties weak so that the object it is pointing to can be cleared by ARC.

We usually use this practice in setting the delegate and datasource properties of protocols. Retain cycles are the reason why it is recommended to keep the delegate and datasource properties in protocols as weak. The view controller holds a strong reference to the delegate and if the delegate was strong, then it will also hold a strong reference back to the view controller and will create a retain cycle.

> Bonus: I just explained you how ARC works in Objective-C!

- #### copy
copy is similar to strong but instead of owning and increasing the retain count of the object, it creates a new copy of that object and holds a strong reference to the copied object. This way if we change the new object we will still be able to get the old value from other references. copy properties works great with mutable objects and `NSString`s. The instance variable backed by the copy must conform to `NSCopying` protocol to make this work.


There are some pre-ARC attributes also which we'll discuss now, but who doesn't use ARC today?

- #### assign
assign is the default for all non pointer(\*) properties i.e. the primitive C datatypes like int, float, long.

- #### retain
It is the pre-ARC strong which owns the object by increasing its retain count, since its pre-ARC you will have to manually release the object after setting the pointer to nil.

I've tried to keep things short and easy to understand, if you find any issues in the post or have any feedback like adding or removing content please feel free to write in comments. I welcome tech discussions. 😉
