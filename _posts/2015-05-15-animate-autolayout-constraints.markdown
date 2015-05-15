---
layout: post
title:  "Animate AutoLayout Constraints!"
date:   2015-05-15 23:24:55
comments : true
categories: ios
---

Animate Here

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