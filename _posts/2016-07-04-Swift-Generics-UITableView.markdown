---
layout: post
title:  "Writing better UITableView code with Swift Generics"
date:   2016-07-04 12:24:55
comments : true
categories: ios
keywords : koder, koder.me, Vinay Jain, vinay, blog, generics, functions, swift, UITableView, reuseIdentifier, UITableViewController

description : With Generics write reusable UITableViewControllers in Swift.
---

I was obsessed with `Protocol Oriented Programming`, read a lot of blogs, watched so many videos and got some idea behind its implemetation and working. So now I know the basic protocol based programming stuff in `Swift` (the new cool 😎), but I was still struggling to use POP in our current codebase. Tried, tired and again tried but couldn't get through. 

I tried the other way of writing reusable code and converted some of our codebase classes to follow this pattern. 

### Swift + Generics + UITableViewController

In most of the `UITableViewController`(TVC) subclasses or in `UIViewController` containing `UITableView` we override/implement these three methods of `UITableViewDataSource`

{% highlight swift %}

override func numberOfSectionsInTableView(tableView: UITableView) -> Int { .. }

override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int { .. }

override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell { .. }

{% endhighlight %}

Instead of writing them in each subclass lets pull these methods from all of them and put them in a `GenericTVC`, our `GenericTVC.swift` now has  

{% highlight swift %}

override func numberOfSectionsInTableView(tableView: UITableView) -> Int { .. }

override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int { .. }

{% endhighlight %}

Every TVC we create from now will be a subclass of `GenericTVC`, so that we don't have to implement these two methods in each one of them. Next step is returning values from `numberOfSections` and `numberOfRows` and for this we will make a generic public dictionary in `GenericTVC`, you may want to add a 2D Swift array `[[String]]`. Add whatever is convenient for you.

{% highlight swift %}

var dataSource : [String : [Item]] ? // Item here is a model class which we use in our codebase. You can use anything of your choice.

{% endhighlight %}

`GenericTVC` with implementations of these methods : 


{% highlight swift %}

class GenericTVC: UITableViewController {

    var datasource : [String : [Item]]?

    override func viewDidLoad() {
        super.viewDidLoad()        
    }

    // MARK: - Table view data source

    override func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        
        if let datasource = datasource {
            return datasource.keys.count
        }else{
            return 0
        }
    }

    override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        
        if let datasource = datasource {

        	/* 
            	Casting the section to String so as to get a key for datasource values
            	Int can also be used but its all your choice. 
            	Which ever section you want in the tableView first, add it as :
             
            	self.datasource["0"] = [Item]()
             
            	and so on..
        	*/

            let sectionString = String(section)
            if let items = datasource[sectionString] {
                return items.count
            }
        }
        return 0
    }   
}

{% endhighlight %}
 
With this we have number of sections and also the number of rows in every section of our tableViews.

The only method left is `cellForRowAtIndexPath:` which we are not going to implement in this `GenericTVC`(again, you can implement this too if you have same configuration of table view cells in your app) instead we will override this method in each of our `GenericTVC` subclass. 

We have our `FirstTableViewController` and a custom tableView cell `FirstTableViewCell`

{% highlight swift %}

class FirstTableViewController: GenericTVC {

    override func viewDidLoad() {
        
        super.viewDidLoad()
        self.tableView.registerClass(FirstTableViewCell.self, forCellReuseIdentifier: String(FirstTableViewCell))
    }
    
    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        
        var thisCell : FirstTableViewCell!
        
        if let cell = tableView.dequeueReusableCellWithIdentifier(String(FirstTableViewCell)) as? FirstTableViewCell {
            thisCell = cell
        }else{
            thisCell = FirstTableViewCell(style: .Default, reuseIdentifier: String(FirstTableViewCell))
        }
        
        let thisItem = self.datasource![String(indexPath.section)]![indexPath.row]
        thisCell.textLabel!.text = thisItem.itemName
        
        return thisCell

    }

}

{% endhighlight %}

This code compiles and runs as expected, but we are not expected to write this in production. Lets refactor this code. 

The call to `tableView.registerClass` will be repeated for every class lets push it to superclass, `GenericTVC`. But what if we have a tableView which has multiple kinds of cell. Mmmmmm.. lets create another public property in `GenericTVC` 

{% highlight swift %}

var reuseClasses : [AnyClass]?

{% endhighlight %}

and in `viewDidLoad` add this code :

{% highlight swift %}

if let classes = reuseClasses {
    for reuseClass in classes {
        self.tableView.registerClass(reuseClass, forCellReuseIdentifier: String(reuseClass))
    }
}

{% endhighlight %}

And in `FirstTableViewController`

Replace :

{% highlight swift %}

super.viewDidLoad()
self.tableView.registerClass(FirstTableViewCell.self, forCellReuseIdentifier: String(FirstTableViewCell))

{% endhighlight %}

With :

{% highlight swift %}

self.reuseClasses = [FirstTableViewCell.self] // or may be self.reuseClasses = [FirstTableViewCell.self, SecondTableViewCell.cell, ThirdTableViewCell.self]

super.viewDidLoad()

{% endhighlight %}

The above code is self explanatory.

Now come back to `cellForRowAtIndexPath:` in `FirstTableViewController`. Looks bad!. Lets move the cell initialization code to our base class. Add this method to `GenericTVC`:

{% highlight swift %}

func reusableCellFor(tableView tableView : UITableView, reuseClass : AnyClass) -> UITableViewCell {
    if let cell = tableView.dequeueReusableCellWithIdentifier(String(reuseClass)) {
        return cell
    }else{
        return UITableViewCell(style: .Subtitle, reuseIdentifier: String(reuseClass))
    }
}

{% endhighlight %}

And in `FirstTableViewController` replace the cell initialization code with : 

{% highlight swift %}

if let cell = reusableCellFor(tableView: tableView, reuseClass: (FirstTableViewCell.self)) as FirstTableViewCell {
	
}

{% endhighlight %}

This piece of code works fine but I still don't like the downcast from `UITableViewCell` to `FirstTableViewCell`. Lets solve this by Generics.

#### Generics to the rescue

With generics in Swift we can define methods(not only methods, actually everything 😉) which can accept generic parameters and return generic types. So lets use this feature for our good.

In `GenericTVC` replace the implementation of `reusableCellFor....` with the below code.

{% highlight swift %}

func reusableCellFor<CustomTVC : UITableViewCell>(tableView tableView : UITableView, reuseClass : CustomTVC.Type) -> CustomTVC {
    
    if let cell = tableView.dequeueReusableCellWithIdentifier(String(reuseClass)) as? CustomTVC {
        return cell
    }else{
        return CustomTVC(style: .Subtitle, reuseIdentifier: String(reuseClass))
    }
    
}

{% endhighlight %}

Wow, this looks fantastic 🤑🤑 , but what is it 🤔🤔? 

{% highlight swift %}

<CustomTVC : UITableViewCell>

/*
This part of the method tells the compiler that here I introduce you to a generic type CustomTVC which is a subclass of UITableViewCell
so do not treat future occurrences of this as errors.
*/

reuseClass : CustomTVC.Type

/*
Accept a type which is a CustomTVC(UITableViewCell subclass) 
*/

{% endhighlight %}

Everything else is self explanatory I guess 🤓.

Finally in `FirstTableViewController` remove the `as FirstTableViewCell` and the also remove the `if let` check. And to keep the subclasses cleaner lets create a helper method in `GenericTVC` for getting the `Item` object from the datasource for current `indexPath`.

{% highlight swift %}

func itemFor(indexPath indexPath : NSIndexPath) -> Item? {
    if let datasource = self.datasource {
        let sectionString = String(indexPath.section)
        if let array = datasource[sectionString] {
            return array[indexPath.row]
        }
    }
    return nil
}

{% endhighlight %}

The final versions of our files are below : 


**GenericTVC :** 

{% highlight swift %}

class GenericTVC: UITableViewController {

    var datasource : [String : [Item]]?
    var reuseClasses : [AnyClass]?
    override func viewDidLoad() {
        super.viewDidLoad()
        
        if let classes = reuseClasses {
            for reuseClass in classes {
                self.tableView.registerClass(reuseClass, forCellReuseIdentifier: String(reuseClass))
            }
        }
    }

    // MARK: - Table view data source

    override func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        
        if let datasource = datasource {
            return datasource.keys.count
        }else{
            return 0
        }
    }

    override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        
        if let datasource = datasource {
            
            /* 
            	Casting the section to String so as to get a key for datasource values
            	Int can also be used but its all your choice. 
            	Which ever section you want in the tableView first, add it as :
             
            	self.datasource["0"] = [Item]()
             
            	and so on..
        	*/
            
            let sectionString = String(section)
            if let array = datasource[sectionString] {
                return array.count
            }
        }
        return 0
    }
    
    func reusableCellFor<CustomTVC : UITableViewCell>(tableView tableView : UITableView, reuseClass : CustomTVC.Type) -> CustomTVC {
        if let cell = tableView.dequeueReusableCellWithIdentifier(String(reuseClass)) as? CustomTVC {
            return cell
        }else{
            return CustomTVC(style: .Subtitle, reuseIdentifier: String(reuseClass))
        }
    }
    
    func itemFor(indexPath indexPath : NSIndexPath) -> Item? {
        if let datasource = self.datasource {
            let sectionString = String(indexPath.section)
            if let array = datasource[sectionString] {
                return array[indexPath.row]
            }
        }
        return nil
    }
    
}

{% endhighlight %}

**FirstTableViewController :**

{% highlight swift %}

class FirstTableViewController: GenericTVC {

    override func viewDidLoad() {
        self.reuseClasses = [FirstTableViewCell.self]
        
        self.tableView.registerClass(FirstTableViewCell.self, forCellReuseIdentifier: String(FirstTableViewCell))
        
        super.viewDidLoad()
    }
    
    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell = reusableCellFor(tableView: tableView, reuseClass: (FirstTableViewCell.self))
        if let item = itemFor(indexPath: indexPath) {
            cell.textLabel!.text = item.itemName
        }
        return cell
    }

}

{% endhighlight %}

As you can see the resulting code for `FirstTableViewController` is shorter, readable and less scary.


Thanks for reading 😊


