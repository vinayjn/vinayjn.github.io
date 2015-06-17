---
layout: post
title:  "Using NSAttributedString"
date:   2015-06-02 23:24:55
comments : true
categories: ios beginner
keywords : NSAttributedString, how, to, use, NSBackgroundColorAttributeName, NSFontAttributeName, NSParagraphStyleAttributeName, NSForegroundColorAttributeName, NSLigatureAttributeName, NSKernAttributeName, NSStrikethroughStyleAttributeName, NSUnderlineStyleAttributeName, NSStrokeColorAttributeName, NSStrokeWidthAttributeName, NSShadowAttributeName, NSTextEffectAttributeName, NSAttachmentAttributeName, NSLinkAttributeName, NSBaselineOffsetAttributeName, NSUnderlineColorAttributeName, NSStrikethroughColorAttributeName, NSObliquenessAttributeName, NSExpansionAttributeName, NSWritingDirectionAttributeName, NSVerticalGlyphFormAttributeName

description : This post focusses on the usage of NSAttributedString in Objective C. All of the attributes of NSString are demonstrated with the help of code examples.
---
As per the [Apple Documentation](https://developer.apple.com/library/prerelease/ios/documentation/Cocoa/Reference/Foundation/Classes/NSAttributedString_Class/index.html), an `NSAttributedString` object manages character strings and associated sets of attributes (for example, font and kerning) that apply to individual characters or ranges of characters in the string. An association of characters and their attributes is called an attributed string.

In short, *an `NSAttributedString` allows you to apply styles on the text*. As of the latest iOS sdk (8.0), you can apply the following attributes to an `NSString` object.

- NSFontAttributeName
- NSParagraphStyleAttributeName
- NSForegroundColorAttributeName
- NSBackgroundColorAttributeName
- NSLigatureAttributeName
- NSKernAttributeName
- NSStrikethroughStyleAttributeName
- NSUnderlineStyleAttributeName
- NSStrokeColorAttributeName
- NSStrokeWidthAttributeName
- NSShadowAttributeName
- NSTextEffectAttributeName
- NSAttachmentAttributeName
- NSLinkAttributeName
- NSBaselineOffsetAttributeName
- NSUnderlineColorAttributeName
- NSStrikethroughColorAttributeName
- NSObliquenessAttributeName
- NSExpansionAttributeName
- NSWritingDirectionAttributeName
- NSVerticalGlyphFormAttributeName

Lets look at a some of the examples below :

####<u>NSFontAttributeName</u>####

{% highlight swift %}
NSDictionary *attributes = @{ NSFontAttributeName : [UIFont fontWithName:@"HelveticaNeue-Italic" size:30.0] };

NSAttributedString *attributedString = [[NSAttributedString alloc] initWithString:@"Italic Text" attributes:attributes];

self.attributedLabel.attributedText = attributedString;
{% endhighlight %}

`Output :` *Italic Text*

{% highlight swift %}
NSDictionary *attributes = @{ NSFontAttributeName : [UIFont fontWithName:@"HelveticaNeue-Bold" size:30.0] };
    
NSAttributedString *attributedString = [[NSAttributedString alloc] initWithString:@"Bold Text" attributes:attributes];
    
self.attributedLabel.attributedText = attributedString;
{% endhighlight %}

`Output :` **Bold Text**

You can put `fontName` of your choice for creating attributed `NSStrings`