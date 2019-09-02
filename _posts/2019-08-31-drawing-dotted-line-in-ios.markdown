---
layout: post
title:  "Drawing Dotted Lines in iOS"
date:   2019-08-31 01:09:25
tags: [ios]
keywords : dotted line, iOS, swift, CALayer, CAReplicatorLayer, lineDashPattern, alternative, custom, modify, fencepost, equal spacing
summary: "Lets see how to do this with UIBezierPath and CAReplicatorLayer"
---

My favorite thing in frontend development is building custom user interfaces. It keeps challenging creativity and tests my eye for detail. Most of the times user interfaces give you instant feedback on what works and what doesn't, based on these feedbacks you keep making changes which further improve the user experience. However, making these changes everytime isn't easy, very often we hit roadblocks because of the limited functionality or maybe restricted API access. Situations like these pushes you to discover new ways of doing the same thing. As a software engineer you can do so by either browsing Stackoverflow or reading documentation or using your imagination and creativity. One recent encounter of this kind was drawing a dotted line between two points in iOS. 

### Dotted lines

The designer sent you an Abstract link and you see a dotted line in between two images. You tell the estimates and you start building the new designs. The most common way of drawing a dotted line in iOS is by using a [UIBezierPath](https://developer.apple.com/documentation/uikit/uibezierpath) and drawing lines by setting a [lineDashPattern](https://developer.apple.com/documentation/quartzcore/cashapelayer/1521921-linedashpattern). A basic implementation is shown below:

{% splash %}

let path = UIBezierPath()
let dashPattern: [CGFloat] = [1, 16.0]
path.setLineDash(dashPattern, count: dashPattern.count, phase: 0)
path.lineWidth = 8
path.lineCapStyle = .round
path.move(to: CGPoint(x: rect.minX, y: rect.midY))
path.addLine(to: CGPoint(x: rect.maxX, y: rect.midY))
UIColor.red.setStroke()
path.stroke()

{% endsplash %}

This code gives the expected output, a dotted line.

<p align="center">
  <img alt="Dots line with UIBezierPath" src="{{ site.baseurl }}/images/xasdcfghnjuhgerfadscvfbf.png">
</p>

It looks fine, but if you look closely you'll find out that both ends are different. The left end has a partial dot and the right end has some extra spacing left. This unenven spacing is due to the lineDashpattern. The array of values we provide to the pattern tells the system when to paint(0.5) and when to unpaint(16.0). Changing these values won't help much as they do not consider the frame boundary when drawing. First lets see what the correct output looks like:

<p align="center">
  <img alt="Dots with equal spacing" src="{{ site.baseurl }}/images/csvbgdfmghfnbsvdacscdvbfg.png">
</p>

This line has equal spacing around on both ends. If you think about it, to do this we just want to know how many dots can fit in the available space, then we draw the dots and then do some magic which centers the line in the view it is drawn on. By centering the line we ensure that it has equal space around both ends. I had a few approaches in mind, you can pick any one of them as per your choice, but I am going to discuss only one approach here:

1. Set the start and end point of the `UIBezierPath` line.
2. Use a [CAShapeLayer](https://developer.apple.com/documentation/quartzcore/cashapelayer) and only stroke it to the desired length and the set its position to the center.
3. Use a [CAReplicatorLayer](https://developer.apple.com/documentation/quartzcore/careplicatorlayer) and set its `instanceCount` property to the number of dots that can fit in.


### Using CAReplicatorLayer for dotted lines:

I have talked about [CAReplicatorLayer](https://vinayjain.me/posts/conversation-with-calayer#careplicatorlayer) earlier as well. I remembered that I had implemented a typing indicator with the help of layer replication so I gave it a try again to build a dotted line. 

<p align="center">
  <img alt="Typing" src="{{ site.baseurl }}/images/typing.gif">
</p>

The benefit I see for using CAReplicatorLayer is that it works on the basis of instance count which you cannot give for the other two ways. And the centering logic becomes easy as you can just set the frame of this layer to center of the view. Have a look at the code below to see how it is done, I am adding comments inline to avoid any further explanation. 

{% splash %}

layer.rasterizationScale = UIScreen.main.scale
layer.shouldRasterize = true

let spacing: CGFloat = 8
let dotRadius: CGFloat = 4

// We want every replicated instance to be translated
// by this factor
let translateFactor = ((dotRadius * 2) + spacing)

let count = Int((rect.width) / translateFactor)

let circle = CAShapeLayer()
let path = UIBezierPath(ovalIn: CGRect(x: 0, y: 0, width: 2 * dotRadius, height: 2 * dotRadius))
circle.fillColor = UIColor.black.cgColor
circle.path = path.cgPath

let replicator = CAReplicatorLayer()
replicator.addSublayer(circle)
replicator.instanceCount = count

// translate every next instance by translateFactor
var transform = CATransform3DIdentity
transform = CATransform3DTranslate(transform, translateFactor, 0, 1.0);
replicator.instanceTransform = transform
layer.addSublayer(replicator)
replicator.masksToBounds = true

let dotsWidth = CGFloat(count) * translateFactor - spacing

// Find the new origin for replicator layer
let x = (rect.width - dotsWidth) / 2.0

// Use the new x value in the frame
// so as to center the replicator layer
// in view bounds
replicator.frame = CGRect(x: x, y: 0, width: dotsWidth, height: rect.height)

{% endsplash %}

The main reason for using `CAReplicatorLayer` here is that it gives me more control to each dot and every instance is animatable, so if there are any changes to be done on this dotted line, those can be done easily. Regarding performance, I haven't done any kind of benchmarking on which approach is efficient as I am drawing this layer only at one place. But if you really want to know, I think the `CAShapeLayer` base implementation will out perform this approach beacuse using that you only draw one layer. If you have any suggestions and feedbacks to improve this please do let me know in the comments. 