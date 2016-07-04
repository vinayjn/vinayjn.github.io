---
layout: post
title:  "Writing better UITableView code with Swift Generics"
date:   2016-07-04 12:24:55
comments : true
categories: ios
keywords : koder, koder.me, Vinay Jain, vinay, blog, generics, functions, swift, UITableView, reuseIdentifier, UITableViewController

description : With Generics write reusable UITableViewControllers in Swift.
---

I was obsessed with `Protocol Oriented Programming`, read a lot of blogs, watched so many videos and somewhat got the idea behind its working. So now I know the basic protocol based programming stuff in `Swift` (the new cool 😎), but I was still struggling to use POP in our current codebase. Tried tried but couldn't get through. 

I tried the other way of writing reusable code and converted some of codebase classes to follow this pattern. 

### Swift + Generics + UITableViewController

In most of the `UITableViewController`(TVC) subclasses or in `UITableView` containing ViewControllers we override/implement these three methods of `UITableViewDataSource`

{% highlight swift %}

override func numberOfSectionsInTableView(tableView: UITableView) -> Int { .. }

override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int { .. }

override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell { .. }

{% endhighlight %}

Lets pull these methods and put them in a `GenericTVC`, our `GenericTVC.swift` now has  

{% highlight swift %}

override func numberOfSectionsInTableView(tableView: UITableView) -> Int { .. }

override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int { .. }

{% endhighlight %}

Every TVC we create from now will be a subclass of GenericTVC, so that we don't have to implement these two methods in each one of them. To return values from `numberOfSections` and `numberOfRows` we will try to make a generic public dictionary 

{% highlight swift %}

var dataSource : [String : [Item]] ? // Item here is a model class which we use in our codebase. You can use anything of your choice.

{% endhighlight %}
