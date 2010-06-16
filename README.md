#License#
JavaScript & CSS:  
@author Adam Eivy (antic | atomantic)  
@link [http://intellectualpirates.net](http://intellectualpirates.net)  
@license MIT (see LICENSE file)

Card Face images:   
@author David Bellot  
@link [http://david.bellot.free.fr/svg-cards/](http://david.bellot.free.fr/svg-cards/)  
@license [http://creativecommons.org/licenses/by-sa/2.5/](http://creativecommons.org/licenses/by-sa/2.5/)  

#What it does:#

The library comes in multiple parts. You can either just use the playingCard.js library, which has no UI rendering (just creates deck objects with the standard methods) or you can add on the playingCards.ui.js library, which adds the ability to render the cards to the page.

Eventually, we will have more optional packs that determine rules of games, handle hands and the card table, etc

#Usage:#

If you are only using playingCards.js:  
  
`var cardDeck = new playingCards(); // will create a new deck object`

If you are including jQuery, the playingCards.ui.js and playingCards.ui.css:

`$('#cardTable').playingCards(); // will lay out a random deck on the cardTable element`

override defaults for playingCards() and for card() with

`playingCards.defaults
playingCards.card.defaults`

View the demo source for some more examples:
[Demo](http://atomantic.github.com/JavaScript-Playing-Cards)