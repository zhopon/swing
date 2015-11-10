Meteor.subscribe('Cards');
var viewPortCards = cards.find();

Template.cards.helpers({
    cards: function () {
        return viewPortCards;
    },
    currentCard: function() {
        return viewPortCards[0];
    },
    likeIt: function() {
        console.log('current card', viewPortCards[0]);
        markMatching(viewPortCards[0]);
    }
});