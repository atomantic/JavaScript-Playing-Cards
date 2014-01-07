#License#
JavaScript & CSS:  
@author Adam Eivy (antic | atomantic)  
@link [http://intellectualpirates.net](http://intellectualpirates.net)  

@license Copyright (c) 2010 Adam Eivy (antic | atomantic) Dual licensed under the MIT and GPL licenses:  
 * [http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php)  
 * [http://www.gnu.org/licenses/gpl.html](http://www.gnu.org/licenses/gpl.html)

Card Face images:   
@author David Bellot  
@link [http://david.bellot.free.fr/svg-cards/](http://david.bellot.free.fr/svg-cards/)  
@license [http://creativecommons.org/licenses/by-sa/2.5/](http://creativecommons.org/licenses/by-sa/2.5/)  

#What it does:#

The library comes in multiple parts. You can either just use the playingCard.js library, which has no UI rendering (just creates deck objects with the standard methods) or you can add on the playingCards.ui.js library, which adds the ability to render the cards to the page.

Eventually, we will have more optional packs that determine rules of games, handle hands and the card table, etc

#Usage:#

If you are only using playingCards.js:  
  
	var cardDeck = new playingCards(); // will create a new deck object

If you are including jQuery, the playingCards.ui.js and playingCards.ui.css:

	$('#cardTable').playingCards(); // will lay out a random deck on the cardTable element

override defaults for playingCards() and for card() by adding new properties to the following objects:

	playingCards.defaults

	playingCards.card.defaults
	
#Demos:#

The repository holds a demo in index.html, which is published on the github project page:
[Demo](http://atomantic.github.com/JavaScript-Playing-Cards)

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/atomantic/javascript-playing-cards/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

