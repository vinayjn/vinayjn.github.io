---
layout: post
title:  "Using NSAttributedString"
date:   2015-06-02 23:24:55
comments : true
categories: ios
keywords : NSAttributedString, how, to, use, NSBackgroundColorAttributeName, NSFontAttributeName, NSParagraphStyleAttributeName, NSForegroundColorAttributeName, NSLigatureAttributeName, NSKernAttributeName, NSStrikethroughStyleAttributeName, NSUnderlineStyleAttributeName, NSStrokeColorAttributeName, NSStrokeWidthAttributeName, NSShadowAttributeName, NSTextEffectAttributeName, NSAttachmentAttributeName, NSLinkAttributeName, NSBaselineOffsetAttributeName, NSUnderlineColorAttributeName, NSStrikethroughColorAttributeName, NSObliquenessAttributeName, NSExpansionAttributeName, NSWritingDirectionAttributeName, NSVerticalGlyphFormAttributeName

description : This post focusses on the usage of NSAttributedString in Objective C. All of the attributes of NSString are demonstrated with the help of code examples.
---
As per the [Apple Documentation](https://developer.apple.com/library/prerelease/ios/documentation/Cocoa/Reference/Foundation/Classes/NSAttributedString_Class/index.html), an `NSAttributedString` object manages character strings and associated sets of attributes (for example, font and kerning) that apply to individual characters or ranges of characters in the string. An association of characters and their attributes is called an attributed string.

In short, *an `NSAttributedString` allows you to apply styles on the text. As of the latest iOS sdk (8.0), you can apply the following attributes to an `NSString` object*.


<table class="table table-striped table-bordered">
<thead>
        <tr>
            <th class="text-center">Attribute</th>
            <th class="text-center">Availability</th>
            <th class="text-center">Description</th>
        </tr>
    </thead>
<tr>
<tbody>
<td>NSFontAttributeName</td>
<td>iOS 6+</td>
<td>UIFont, default Helvetica(Neue) 12</td>
</tr>

<tr>
<td>NSParagraphStyleAttributeName</td>
<td>iOS 6+</td>
<td>NSParagraphStyle, default defaultParagraphStyle</td>
</tr>

<tr>
<td>NSForegroundColorAttributeName</td>
<td>iOS 6+</td>
<td>UIColor, default blackColor</td>
</tr>

<tr>
<td>NSBackgroundColorAttributeName</td>
<td>iOS 6+</td>
<td>UIColor, default nil: no background</td>
</tr>

<tr>
<td>NSLigatureAttributeName</td>
<td>iOS 6+</td>
<td>NSNumber containing integer, default 1: default ligatures, 0: no ligatures</td>
</tr>

<tr>
<td>NSKernAttributeName</td>
<td>iOS 6+</td>
<td>NSNumber containing floating point value, in points; amount to modify default kerning. 0 means kerning is disabled.</td>
</tr>

<tr>
<td>NSStrikethroughStyleAttributeName</td>
<td>iOS 6+</td>
<td>NSNumber containing integer, default 0: no strikethrough</td>
</tr>

<tr>
<td>NSUnderlineStyleAttributeName</td>
<td>iOS 6+</td>
<td>NSNumber containing integer, default 0: no underline</td>
</tr>

<tr>
<td>NSStrokeColorAttributeName</td>
<td>iOS 6+</td>
<td>UIColor, default nil: same as foreground color</td>
</tr>

<tr>
<td>NSStrokeWidthAttributeName</td>
<td>iOS 6+</td>
<td>NSNumber containing floating point value, in percent of font point size, default 0: no stroke; positive for stroke alone, negative for stroke and fill (a typical value for outlined text would be 3.0)</td>
</tr>

<tr>
<td>NSShadowAttributeName</td>
<td>iOS 6+</td>
<td>NSShadow, default nil: no shadow</td>
</tr>

<tr>
<td>NSTextEffectAttributeName</td>
<td>iOS 7+</td>
<td>NSString, default nil: no text effect</td>
</tr>

<tr>
<td>NSAttachmentAttributeName</td>
<td>iOS 7+</td>
<td>NSTextAttachment, default nil</td>
</tr>

<tr>
<td>NSLinkAttributeName</td>
<td>iOS 7+</td>
<td>NSURL (preferred) or NSString</td>
</tr>


<tr>
<td>NSBaselineOffsetAttributeName</td>
<td>iOS 7+</td>
<td>NSNumber containing floating point value, in points; offset from baseline, default 0</td>
</tr>

<tr>
<td>NSUnderlineColorAttributeName</td>
<td>iOS 7+</td>
<td>UIColor, default nil: same as foreground color</td>
</tr>

<tr>
<td>NSStrikethroughColorAttributeName</td>
<td>iOS 7+</td>
<td>UIColor, default nil: same as foreground color</td>
</tr>

<tr>
<td>NSObliquenessAttributeName</td>
<td>iOS 7+</td>
<td>NSNumber containing floating point value; skew to be applied to glyphs, default 0: no skew</td>
</tr>

<tr>
<td>NSExpansionAttributeName</td>
<td>iOS 7+</td>
<td>NSNumber containing floating point value; log of expansion factor to be applied to glyphs, default 0: no expansion</td>
</tr>

<tr>
<td>NSWritingDirectionAttributeName</td>
<td>iOS 7+</td>
<td>NSArray of NSNumbers representing the nested levels of writing direction overrides as defined by Unicode LRE, RLE, LRO, and RLO characters. The control characters can be obtained by masking NSWritingDirection and NSTextWritingDirection values.  LRE: NSWritingDirectionLeftToRight|NSTextWritingDirectionEmbedding, RLE: NSWritingDirectionRightToLeft|NSTextWritingDirectionEmbedding, LRO: NSWritingDirectionLeftToRight|NSTextWritingDirectionOverride, RLO: NSWritingDirectionRightToLeft|NSTextWritingDirectionOverride,</td>
</tr>

<tr>
<td>NSVerticalGlyphFormAttributeName</td>
<td>iOS 6+</td>
<td>An NSNumber containing an integer value.  0 means horizontal text.  1 indicates vertical text.  If not specified, it could follow higher-level vertical orientation settings.  Currently on iOS, it's always horizontal.  The behavior for any other value is undefined.</td>
</tr>
</tbody>
</table>