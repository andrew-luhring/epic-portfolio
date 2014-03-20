

idea time:
=======

*   why not have each one of the worktypes be a ball. like a 3d ball. like a marble. page loads the balls roll out and scatter across the page.
moving your mouse over a ball without clicking it will move the ball in the direction your mouse leaves. the balls clank into eachother like marbles.


*   each one of the worktypes is like those cut out shape toys---
ex. a triangle can only fit in a triangle spot, a star only fits in a star spot, etc... it's like a puzzle but with bigger, slightly more 3d shapes.
the gallery thing could be the thing you move a shape into... so it's like a key. each worktype is like a key to the gallery.
...which makes conceptual sense because what i my goal is for the gallery is to make the experience the best part of it.

***
right now, the site is simple. you push a button you get the content.
----------------------------------------------------------------------------
 without messing with the interaction a lot, i could make it more interesting by giving it a different context

 like... a science lab environment.
  i could have little mice wander around in the background. i could make a mouse on a wheel!!!
  the worktypes could be styled to look like blocks of cheese. you click a block of cheese, a mouse comes up and starts eating the block of cheese
  until you click a different block of cheese... in which case he moves over to that one and the old one respawns. whichever block of cheese currently
   being eaten is the type of work being displayed.

or
---

 a vending machine.  push a button, the gallery gives you a packet of work.

 or
 ---

 a science environment vending machine. you push a button, it drops some cheese in the mice cage. a mouse pulls the work over by its mouth.
 oooor the work is on a little wagon thing thats strung to the mouse's tail.

 or
 ---

 you're inside of a mousewheel.
 you push the category button and the next rung in the mousewheel is the first piece.
 scrolling to the next item moves into view but it looks like the old item is being moved away from you...
 it would look like the "price is right wheel" but what it would look like the inside of the wheel rather than the outside.
 the inside would be cooler to animate because it's skewing stuff into your perspective rather than away from you.

***


best animation ever:
===============

(it's like they're scared or cold)

		.scared:focus { outline:0; color:rgba(0,0,0,.4); animation:shake .25s infinite; }
		@keyframes shake { 25%{ transform:rotate(-1deg); } 50%{ transform:translateY(-1px); } 75%{ transform:rotate(2deg); } }
		<span contenteditable='true'> This is a thing that's scared </span>

<style>
.example{
		outline:0; color:rgba(0,0,0,.4); animation:shake .25s infinite;
}
		@keyframes shake { 25%{ transform:rotate(-1deg); } 50%{ transform:translateY(-1px); } 75%{ transform:rotate(2deg); } }
</style>
<span class="example" contenteditable='true'> This is a thing that's scared </span>