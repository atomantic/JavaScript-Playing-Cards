#License
JavaScript & CSS:  
@author Adam Eivy (antic | atomantic)  
@link [http://adameivy.com/JavaScript-Playing-Cards/](http://adameivy.com/JavaScript-Playing-Cards/)  

@license Copyright (c) 2010 Adam Eivy (antic | atomantic) Dual licensed under the MIT and GPL licenses:  
 * [http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php)  
 * [http://www.gnu.org/licenses/gpl.html](http://www.gnu.org/licenses/gpl.html)

Card Face images:
@author David Bellot  
@link [http://david.bellot.free.fr/svg-cards/](http://david.bellot.free.fr/svg-cards/)  
@license [http://creativecommons.org/licenses/by-sa/2.5/](http://creativecommons.org/licenses/by-sa/2.5/)  

#What it does

The library comes in multiple parts. You can either just use the playingCard.js library, which has no UI rendering (just creates deck objects with the standard methods) or you can add on the playingCards.ui.js library, which adds the ability to render the cards to the page.

Note: This library was really just something that I wanted to build for the sake of proving out that a deck of cards could be implemented in JavaScript and CSS. I had no real-world use-case for it. Since throwing this out on Github, several people have started using this as a foundation for making games. That's awesome--but I haven't been working on this. I welcome pull-requests, but I also am not actively updating this codebase. The code is pretty simple and could probably stand some updating with newer standards (as it is several years old). You might be better off using this as a reference point / proof-of-concept :)

If I were to re-write this for a particular game/use-case, I'd probably change the API a bit. Additionally, I'd add methods for managing hands/players, which is not part of the existing library.

On the flip-side, since you obviously like playing cards, you might be interested in my hand-painted, beetle-themed playing card deck, which I'll be releasing to Kickstarter ~Aug 1, 2015: http://bit.ly/beetledeck

#Usage

If you are only using playingCards.js:  

	var cardDeck = new playingCards(); // will create a new deck object

If you are including jQuery, the playingCards.ui.js and playingCards.ui.css:

	$('#cardTable').playingCards(); // will lay out a random deck on the cardTable element

override defaults for playingCards() and for card() by adding new properties to the following objects:

	playingCards.defaults

	playingCards.card.defaults

##Example Implementation
For a rough example of implementation, look at the code for the demo page:
https://github.com/atomantic/JavaScript-Playing-Cards/blob/master/index.html

#API Docs (simple version)

* init() - builds the deck (and shuffles it), automatically called when initializing an instance
* shuffle() - shuffle the deck
* orderByRank() - orders the existin cards by rank
* orderBySuit() - calls init() again (TODO: this should probably order the existing cards in the deck by suit, but I was lazy)
* spread() - (ui only) lay out the cards in the DOM
* count() - return the number of cards remaining in the deck
* addCard() - return a card from the drawn pile back to the top of the deck
* draw() - draw a card from the top of the deck (stored in the draw pile)

#Demo

The repository holds a demo in index.html, which is published on the github project page:
[Demo](http://atomantic.github.com/JavaScript-Playing-Cards)
