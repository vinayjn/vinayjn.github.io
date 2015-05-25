---
layout: post
title:  "Animate AutoLayout Constraints!"
date:   2015-05-15 23:24:55
comments : true
categories: ios
---

AutoLayout is one the most significant features of modern iOS development. It simplifed the app design and saved developers from managing the view frames for different orientations and different devices with different screen resolutions as well. If you are familiar with frontend Web development you will find it similar to a `Responsive Web Design`. 

AutoLayout brings a lot of challenges with it, at first you may find it tough to get through. Managing the constraints without getting warnings is challenging!. [Apple's documentation on AutoLayout](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/AutolayoutPG/Introduction/Introduction.html){:target="_blank"} is great and it will surely help you understand AutoLayout properly as it did for me. 

AutoLayout can be managed programmatically, constraints can be updated at runtime. Sometimes we need to animate these updates/changes to view frames. You cannot directly animate change in AutoLayout constraints as you do with `UIView` frame changes. However the change in code to animate constraint changes isn't different for AutoLayout, you just need to call `[self.view layoutIfNeeded]` in the `animateWithDuration:` method before and after the a constraint is updated. Here is sample code I used to show/hide a `UISearchBar` with a button click.

{% highlight swift %}
-(void)toggleSearchBarVisibility{

    searchBar.hidden = !searchBar.hidden;
    if (searchBar.hidden) {
        tableViewTopSpace.constant = 0;
        self.searchDisplayController.active = NO;
        [UIView animateWithDuration:0.3
                         animations:^{
                             [self.view layoutIfNeeded];
                         } completion:nil];
       }
    else {
        tableViewTopSpace.constant = 44;
        [UIView animateWithDuration:0.3
                         animations:^{
                             [self.view layoutIfNeeded];
                         } completion:nil];
       }
    }
{% endhighlight %}