---
layout: post
title:  "Move UITextField Up/Down with Keyboard"
date:   2015-05-25 23:24:55
comments : true
categories: ios
---

One of the behaviors of iOS devices which I see as a limitation is that the default keyboard hides the views behind it. Hence the user cannot interact with the UIViews and Controls behind the keyboard. I found a great answer on [StackOverflow](http://stackoverflow.com/a/26561723/2286267) to solve this problem. However the code used in this answer moves every textField by the same amount. So even if you are editing a textField which does not get hidden behind the textField will still move up and may disappear out of the device screen upwards. 

My solution to the problem is a small modification to the answer on `SO`. Here I am sending an offset by which the textField has to be moved up and down with keyboard show/hide respectively. See the demo to better understand this.
<center>
<iframe width="320" height="590" src="https://www.youtube.com/embed/ADLdPehMUYc" frameborder="0" allowfullscreen></iframe>
</center>
{% highlight swift %}
-(void)textFieldDidBeginEditing:(UITextField *)textField{
    
    [self animateTextField:textField up:YES withOffset:textField.frame.origin.y / 2];
}

-(void)textFieldDidEndEditing:(UITextField *)textField{
    
    [self animateTextField:textField up:NO withOffset:textField.frame.origin.y / 2];
    
}
-(BOOL)textFieldShouldReturn:(UITextField *)textField{
    
    [textField resignFirstResponder];
    return true;
}

-(void)animateTextField:(UITextField*)textField up:(BOOL)up withOffset:(CGFloat)offset
{
    const int movementDistance = -offset;
    const float movementDuration = 0.4f;
    int movement = (up ? movementDistance : -movementDistance);
    [UIView beginAnimations: @"animateTextField" context: nil];
    [UIView setAnimationBeginsFromCurrentState: YES];
    [UIView setAnimationDuration: movementDuration];
    self.view.frame = CGRectOffset(self.view.frame, 0, movement);
    [UIView commitAnimations];
}

{% endhighlight %}