Tracker.autorun(function() {
    Meteor.subscribe('Cards');
});

Template.cards.helpers({
    cards: function () {
        return Cards.find();
    }
});

Template.cards.events({
    'click #likeIt': function() {
        var cards = Cards.find().fetch();
        Meteor.call('markMatching', cards[cards.length - 1]);
    }
});