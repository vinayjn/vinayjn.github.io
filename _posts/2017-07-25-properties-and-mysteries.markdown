---
layout: post
title:  "Demystifying @property and attributes"
date:   2017-07-25 01:09:25
tags: [ios, objc]
keywords : koder, koder.me, vinayjn, Vinay Jain, vinay, blog, objective c, swift, closures, objc, How to code in IOS, strong, weak, atomic, nonatomic, retain, copy, property, @property, @dynamic, @synthesize
description: "Understanding what the keywords in between those parentheses mean."
---

Whenever we declare properties in Objective-C there are some keywords between the parentheses like `strong`, `weak`,  `atomic`, `nonatomic`. There can be multiple comma separated words in between the parentheses, sometimes we don't add any keywords there and keep the default compiler behavior. In this post we'll discuss what these keywords/attributes actually mean and what are the effects of using one over the other. `@property` are specific to Objective-C but the concepts can be applied to Swift as well, if you are a Swift only dev I still recommend going through this post once.

Broadly, the change in behavior of a property with these words fall into three categories, lets see what they are:

- ### Atomicity (atomic, nonatomic)

    - #### atomic
    atomic is the default behavior, if we don't type atomic or nonatomic then the property is atomic. atomic ensures that if we try to read the property we always get some valid value, it will never be junk or garbage data.

        Lets say, multiple threads are reading and writing the property simultaneously, at each and every instant the value read from the property is a good value. We don't know what the value will be, it can be the value before the new value gets written or it can be the new value.

    - #### nonatomic
    As it is (non)atomic it doesn't do whatever atomic does. To make a property nonatomic we have to add this keyword in between the parentheses. With nonatomic properties you lose the guarantee on the validity of values, reading a nonatomic property can return a garbage value.

    Since atomic somehow manages the validity of the value, it has some performance limitations. Access to atomic properties are relatively slower than nonatomic properties. If you are creating properties which involve frequent write operations then it is recommended to make the properties nonatomic.

    There's a confusion in most developer's mind that creating a property atomic makes it thread-safe. Atomicity has nothing to do with thread-safety. There are other ways to make the properties thread-safe but that discussion is beyond the scope of this post.

- ### Write Access (readonly, readwrite)

    Both of these keywords are self explanatory. The default behavior is readwrite, so if we don't specify any of these the property will allow write access to the variable. readonly restricts write access from everyone including the class it is declared in.

    To allow write access to the property in the class then we have to create an interface extension in the implementation file and override the property by making it readwrite. This way the classes importing this class will be restricted to modify its value.

````objc
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
