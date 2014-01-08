/*jslint jquery:true */
/**
 * playingCards is a standard card deck library
 * This can be used to play standard card games (which will be additional rule modules attached to this set)
 *
 * usage: var cardDeck = new playingCards(conf);
 * override defaults for playingCards() and for card() with
 *    playingCards.defaults
 *    playingCards.card.defaults
 *
 * @author Copyright (c) 2010 Adam Eivy (antic | atomantic)
 * @license Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

if (Array.indexOf === undefined) {
    // doens't exist in oldIE
    /* Finds the index of the first occurence of item in the array, or -1 if not found */
    Array.prototype.indexOf = function(v) {
        for (var i = 0; i < this.length; ++i) {
            if (this[i] === v) {
                return i;
            }
        }
        return - 1;
    };
}
 (function(window,document,undefined){

    /**
     * The playing card library core object
     *
     * @param obj conf Configuration option overrides
     *
     * @return obj an instance of the constructed library object (deck of cards)
     */
    var playingCards = window.playingCards = function(conf) {
        var c = objExtend(playingCards.defaults, conf);
        if (! (this instanceof playingCards)) {
            // in jquery mode
            c.el = $(this); // capture the context (this will be the cardTable/Deck element)
            return new playingCards(c);
        }
        this.conf = c;
        this.init();
        if (this.conf.startShuffled) {
            this.shuffle(5);
        }
        return this;
    };
    /**
     * initializer - builds the deck
     */
    playingCards.prototype.init = function() {
        this.cards = [];
        var o = this.conf,
            l,i,s,r,j;
        // populate draw pile
        for (i = 0; i < o.decks; i++) {
            // standard
            for (s in o.suits) {
                for (r in o.ranks) {
                    l = this.cards.length;
                    this.cards[l] = new playingCards.card(r, o.ranks[r], s, o.suits[s]);
                }
            }
            // jokers
            for (j = 0; j < o.jokers; j++) {
                l = this.cards.length;
                // suit will always be 1 or 2
                this.cards[l] = new playingCards.card("N", o.jokerText, (j % 2) + 1, '');
            }
        }
    };
    // TODO: create more methods:
    // playingCards.prototype.order (set to out-of-box ordering)
    // -- do we want other special formations (like trick deck ordering systems that deal perfect hands)?
    // -- probably going to leave this as an extension option
    /**
     * draw a card
     * @return mixed (object|null) A card object (if a card is available)
     */
    playingCards.prototype.draw = function() {
        return this.cards.length > 0 ? this.cards.pop() : null;
    };
    /**
     * add a card to the top of the deck
     */
    playingCards.prototype.addCard = function(card) {
        this.cards.push(card);
    };
    /**
     * get the number of cards remaining in the deck
     * (easy enough just to call cardObject.cards.length but hey)
     */
    playingCards.prototype.count = function() {
        return this.cards.length;
    };
    /**
     * shuffle the deck
     *
     * @param int n The number of times to shuffle (defaults to 5)
     */
    playingCards.prototype.shuffle = function(n) {
        if (!n) {
            n = 5;
        }
        var l = this.cards.length,
            r,tmp,i,j;

        for (i = 0; i < n; i++) {
            for (j = 0; j < l; j++) {
                r = Math.floor(Math.random() * l);
                tmp = this.cards[j];
                this.cards[j] = this.cards[r];
                this.cards[r] = tmp;
            }
        }
    };

    playingCards.prototype.orderByRank = function() {
        this.cards.sort(compareRank);
    }

    playingCards.prototype.orderBySuit = function() {
        this.init();
    }

    /*
     * requires jquery (currently)
     * TODO: put this in a UI extension pack along with all the other demo methods
     */
    playingCards.prototype.spread = function(dest) {
        if (!this.conf.el && !dest) {
            return false;
        }
        var to = this.conf.el || dest,
            l = this.cards.length,
            i;
        to.html('');
        // clear (just a demo)
        for (i = 0; i < l; i++) {
            to.append(this.cards[i].getHTML());
        }
    };
    /**
     * configuration defaults
     */
    playingCards.defaults = {
        "decks": 1,
        // TODO: enable 'font' option -- loading cards.ttf
        "renderMode": 'css',
        // For a coustom " of "-String
        "ofString": " of ",
        "startShuffled": true,
        "jokers": 2,
        "jokerText": "Joker",
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
    playingCards.card = function(rank, rankString, suit, suitString, conf) {
        if (! (this instanceof playingCards.card)) {
            return new playingCards.card(rank, rankString, suit, suitString, conf);
        }

        this.conf = objExtend(playingCards.card.defaults, conf);

        if (suit === undefined) {
            //Arguments are rank, suit
            suit = rankString;
            rankString = playingCards.defaults.ranks[rank];
            suitString = playingCards.defaults.suits[suit];
        }

        this.rank = rank;
        this.rankString = rankString;
        this.suit = suit;
        this.suitString = suitString;
        return this;
    };
    /**
     * configuration defaults
     */
    playingCards.card.defaults = {
        "singleFace": false
        // false will use a different image for each suit/face, true will use diamond image for all
    };
    /**
     * get the text representation of the card
     */
    playingCards.card.prototype.toString = function() {
        return this.suitString !== "" ? this.rankString + playingCards.defaults.ofString + this.suitString: this.rankString;
    };

    /**
     * Simple object extend to override default settings
     */
    function objExtend(o, ex) {
        if (!ex) {
            return o;
        }
        for (var p in ex) {
            o[p] = ex[p];
        }
        return o;
    }

    /**
     * Compare functions
     */
    function compareRank(a, b) {
        var intRegex = /^\d+$/;

        if (a.rank == b.rank)                       return 0;
        if (a.rank == "N")                          return 1;
        if (b.rank == "N")                          return -1;
        if (a.rank == "A")                          return 1;
        if (b.rank == "A")                          return -1;
        if (!isNaN(a.rank - b.rank))                return a.rank - b.rank;
        if (a.rank == "K" && b.rank == "J")         return 1;
        if (a.rank == "J" && b.rank == "K")         return -1;
        if (a.rank == "K" && b.rank == "Q")         return 1;
        if (a.rank == "Q" && b.rank == "K")         return -1;
        if (a.rank == "Q" && b.rank == "J")         return 1;
        if (a.rank == "J" && b.rank == "Q")         return -1;
        if (a.rank == "K" && intRegex.test(b.rank)) return 1;
        if (a.rank == "Q" && intRegex.test(b.rank)) return 1;
        if (a.rank == "J" && intRegex.test(b.rank)) return 1;
        if (intRegex.test(a.rank) && b.rank == "K") return -1;
        if (intRegex.test(a.rank) && b.rank == "Q") return -1;
        if (intRegex.test(a.rank) && b.rank == "J") return -1;
    }

})(this,this.document);
