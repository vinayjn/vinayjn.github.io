---
layout: post
title:  "Its 03:23 AM, and I can't sleep. Okay! Let's crawl Instagram"
date:   2014-12-20 23:24:55
comments : true
categories: python
---

Today is Sunday, 21 Dec 2014, the time is 03:23 AM. Temperature in `Pune` this time is about 6 - 7 °C. This is relatively a cold night and it is always easy to fall asleep in winter. But wait, I am standing in the balcony because I couldn't sleep, I was having random thoughts which in turn made new thoughts. 

As I can't just stand in the balcony, I checked almost every social networking apps on my phone. 

Found `Nothing` interesting.

Why not channelize these random thoughts towards programming. Oh yeah!! why not crawl [Instagram](http://instagram.com/) and try fetching information/pictures from public profiles. 

######Crawling Instagram

At first thought I found it very easier to fetch URL's from insta profiles, and for profiles having less number of photos (20-30) it came out to be true. What I found challenging was fetching URLs from profiles which have many photos. 

On the desktop version of Instagram's site you need to scroll the page to body height to load the next page of photos, as we see in [`Facebook`](https://www.facebook.com/) `News Feed`. Being a beginner in crawling it was very difficult for me to execute `javascript` from `Python` and that also not on a `web browser`. Scratching my head for a few seconds activated my neurons and the nervous system responded with a name Selenium. I had some previous knowldege of the `Selenium ` webdriver, using it one can automate a browser(how cool is that). I searched for a `Python` based selenium module. a quick [Google](https://www.google.co.in/) searched helped me. I was fortunate that I landed on this link [Selenium with Python](https://selenium-python.readthedocs.org/). 

A few more minutes spent in the integration of Selenium webdriver added `instacrawl.py` to my list of Crawlers.

######Where is the source ?

There are already so many Instagram crawlers/downloaders available, which are far better than mine. The only reason I feel mine is better is that its written by me. 

**End Notes :** 

- Selenium WebDriver makes your program slow. 
- Sorry Instagram.
