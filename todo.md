Minimum Marketable Features
=====================

1.)     Refactor JavaScript. <==
+  +    refactor html.
2.)     Add new features
   *       Aria-roles, tooltips, angular stuff.
   *    Parallax branch
3.)    add to websites :
+   +   textmateArduino,
+   +   teleprompter,
+   +   chelswee,
+   +   leap,
+   +   mirror
+   +   served

4.)     Bonus points: get nyan cat reporter to work in html.

current
---------
+   the links within #galleryDiv should be figure elements.

+   add this to files that use jquery and replace jquery with it; see [coderwall](https://coderwall.com/p/q19via) for details :

```js
		$$ = (function($){
		    var DOMCACHESTORE = {};
		    return function(selector, force) {
		            if (DOMCACHESTORE[selector] !== undefined && !force) {
		                return DOMCACHESTORE[selector];
		            }
		            DOMCACHESTORE[selector] = $(selector);
		            return DOMCACHESTORE[selector];
		        }
		})($);

```

other
======

```bash
		console.info('console.info');
		console.debug('console.debug');
		console.warn('console.warn');
		console.error('console.error');
```
use pdf to create webpage from html
---------------------------

[phantomjs rasterize.js]('http://en.wikipedia.org/w/index.php?title=Jakarta&printable=yes' jakarta.pdf)

inverted border radius:
-------------

```css
		.outer {
		  overflow: hidden;
		}
		.inner {
		  border: 1px solid #888;
		}
		.inner i {
		  width: 40px;
		  height: 40px;
		  border: 1px solid #888;
		  border-radius: 50%;
		  background-color: #fff;
		}
		.inner .top {
		  margin-top: -20px;
		}
		.inner .bottom {
		  margin-top: -20px;
		  margin-bottom: -22px;
		}
		.inner .left {
		  float: left;
		  margin-left: -20px;
		}
		.inner .right {
		  float: right;
		  margin-right: -20px;
		}
		.content {
		  min-height: 80px;
		}
```

```html
		<div class="outer">
		<div class="inner">
		<i class="top left"></i>
		<i class="top right"></i>
		<div class="content"></div>
		<i class="bottom right"></i>
		<i class="bottom left"></i>
		</div>
		</div>
```