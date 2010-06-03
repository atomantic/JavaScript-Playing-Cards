/**
 * jQuery Plugin to create a deck of cards.
 * This can be used to play standard card games (which could be additional rule modules attached to this set)
 * 
 * usage: $("#cardTable").playingCards();
 * override defaults for playingCards() and for card() with
 *    $.playingCards.defaults
 *    $.playingCards.card.defaults
 * 
 * @author Adam Eivy (antic | atomantic)
 * @license MIT (do what you like but keep the license)
 */
 (function($) {

    $.fn.playingCards = function(conf) {
        var o = $.extend({},
        $.fn.playingCards.defaults, conf);

        this.cards = [];
		var l;
        // populate draw pile
        for (var i = 0; i < o.decks; i++) {
			// standard
            for (var s in o.suits) {
                for (var r in o.ranks) {
					l = this.cards.length;
                    this.cards[l] = new $.fn.playingCards.card(r, o.ranks[r], s, o.suits[s]);

					// debugging design mode (just laying out all the cards in order)
					this.append(this.cards[l].getHTML());
                }
            }
			// jokers
			for (i=0;i<o.jokers;i++){
					l = this.cards.length;
					// suit will always be 1 or 2
                    this.cards[l] = new $.fn.playingCards.card("N", o.jokerText, (i%2)+1, '');

					// debugging design mode (just laying out all the cards in order)
					this.append(this.cards[l].getHTML());
			}
        }
        this.draw = function() {
            return this.cards.length > 0 ? this.cards.shift() : null;
        };
        this.addCard = function(card) {
            this.cards.push(card);
        };
        this.count = function() {
            return this.cards.length;
        };

        return this;
    };
	$.fn.playingCards.prototype.shuffle = function(n) {
        var r;
        // random #
        var tmp;
        // tmp holder
        var l = this.cards.length;

        for (var i = 0; i < n; i++) {
            for (var j = 0; j < l; j++) {
                r = Math.floor(Math.random() * l);
                tmp = this.cards[j];
                this.cards[j] = this.cards[r];
                this.cards[r] = tmp;
            }
        }
    };
    $.fn.playingCards.defaults = {
        "decks": 1,
		"renderMode": 'css', // TODO: enable 'font' option -- loading cards.ttf
		"jokers":2,
		"jokerText":"Joker",
        "ranks": {
            "2": "Two",
            "3": "Three",
            "4": "Four",
            "5": "Five",
            "6": "Six",
            "7": "Seven",
            "8": "Eight",
            "9": "Nine",
            "10": "Ten",
            "J": "Jack",
            "Q": "Queen",
            "K": "King",
            "A": "Ace"
        },
        "suits": {
            "S": "Spades",
            "D": "Diamonds",
            "C": "Clubs",
            "H": "Hearts"
        }
    };
    /**
	 * create a playing card
	 * 
	 * @param string rank The numeric or letter value of the card (short value)
	 * @param string rankString The full text representation of the rank (localized)
	 * @param string suit The letter value of the suite (short value)
	 * @param string suitString The full text representation of the suit (localized)
	 * @param obj conf Overriding configuration
	 * 
	 * @return object The card object
	 */
    $.fn.playingCards.card = function(rank, rankString, suit, suitString, conf) {
        if (! (this instanceof arguments.callee)) {
            return new arguments.callee(rank, rankString, suit, suitString);
        }

	    this.conf = $.extend({},$.fn.playingCards.card.defaults,conf);
	
        this.rank = rank;
        this.rankString = rankString;
        this.suit = suit;
        this.suitString = suitString;
        return this;
    };
	$.fn.playingCards.card.defaults = {
		"singleFace":false // false will use a different image for each suit/face, true will use diamond image for all
	};
    $.fn.playingCards.card.prototype.toString = function() {
        // TODO: localize "of"
        return this.suitString!=="" ? this.rankString + " of " + this.suitString : this.rankString;
    };
    $.fn.playingCards.card.prototype.getHTML = function() {
		if(this.html){
			return this.html;
		}
        this.suitCode = "&nbsp;";
        this.colorCls = '';
        switch (this.suit) {
        case "S":
            this.suitCode = "&spades;";
            break;
        case "D":
            this.colorCls = "red";
            this.suitCode = "&diams;";
            break;
        case "C":
            this.suitCode = "&clubs;";
            break;
        case "H":
            this.colorCls = "red";
            this.suitCode = "&hearts;";
            break;
        }

        // concatenating strings with "+" is slow, using array join is faster: http://code.google.com/speed/articles/optimizing-javascript.html
        // TODO: run perf test to be sure that in this case we are getting better perf in IE
		var txt = this.rank;
		if(this.rank==="N"){
			txt = this.rankString.split('').join('<br />');
		}
        var strBuild = ['<div class="playingCard"><div class="front ', this.colorCls, '"><div class="corner">', txt, '<br />', this.suitCode, '</div>'];
        strBuild = strBuild.concat(this.buildIconHTML());
        strBuild = strBuild.concat('<div class="corner cornerBR flip">', txt, '<br />', this.suitCode, '</div></div></div>');
		this.html = strBuild.join('');
        return this.html;
    };
    $.fn.playingCards.card.prototype.buildIconHTML = function() {
        // TODO: could we optimize this with a for loop that breaks/continues to named positions?
        if (this.rank === "A") {
            return ['<div class="suit suit0">', this.suitCode, '</div>'];
        }
        if (this.rank === "J" || this.rank === "Q" || this.rank === "K"  || this.rank === "N") {
			var n = 'D';
			if(!this.conf.singleFace){
				n = this.suit;
			}
            return [
            '<div class="suit A1">', this.suitCode, '</div>',
            '<img class="suit ', this.rank, ' face" src="img/',this.rank,n,'.gif"/>',
            '<div class="suit C5 flip">', this.suitCode, '</div>'
            ];
        }
        var ret = [];
        var list = ['4', '5', '6', '7', '8', '9', '10'];
        // all of these will have A1, A5, C1, C5 icons
        // using jquery's inArray(). If we make a non-jquery version,
        // we will have to include an in_array proto on array (or change the way this is built)
        if ($.inArray(this.rank, list)!==-1) {
            ret = ret.concat([
            '<div class="suit A1">', this.suitCode, '</div>',
            '<div class="suit A5 flip">', this.suitCode, '</div>',
            '<div class="suit C1">', this.suitCode, '</div>',
            '<div class="suit C5 flip">', this.suitCode, '</div>'
            ]);
        }
        list = ['2', '3'];
        if ($.inArray(this.rank, list)!==-1) {
            ret = ret.concat([
            '<div class="suit B1">', this.suitCode, '</div>',
            '<div class="suit B5 flip">', this.suitCode, '</div>'
            ]);
        }
        list = ['3', '5', '9'];
        if ($.inArray(this.rank, list)!==-1) {
            ret = ret.concat([
            '<div class="suit B3">', this.suitCode, '</div>'
            ]);
        }
        list = ['6', '7', '8'];
        if ($.inArray(this.rank, list)!==-1) {
            ret = ret.concat([
            '<div class="suit A3">', this.suitCode, '</div>',
            '<div class="suit C3">', this.suitCode, '</div>'
            ]);
        }
        list = ['7', '8', '10'];
        if ($.inArray(this.rank, list)!==-1) {
            ret = ret.concat([
            '<div class="suit B2">', this.suitCode, '</div>'
            ]);
        }
        list = ['8', '10'];
        if ($.inArray(this.rank, list)!==-1) {
            ret = ret.concat([
            '<div class="suit B4 flip">', this.suitCode, '</div>'
            ]);
        }
        list = ['9', '10'];
        if ($.inArray(this.rank, list)!==-1) {
            ret = ret.concat([
            '<div class="suit A2">', this.suitCode, '</div>',
            '<div class="suit A4 flip">', this.suitCode, '</div>',
            '<div class="suit C2">', this.suitCode, '</div>',
            '<div class="suit C4 flip">', this.suitCode, '</div>'
            ]);
        }
        return ret;
    };
})(jQuery);