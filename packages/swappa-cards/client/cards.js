var pagination = {
    limit: 10,
    threshold: 5
};

Tracker.autorun(function() {
    Meteor.subscribe('MatchingCards', pagination);
});

Template.cards.helpers({
    cards: function () {
        return MatchingCards.find();
    }
    , css: function(prop) {
        return "z-index: " + (pagination.limit - prop.hash.index);
    }

});

Template.cards.events({
    'click #likeIt': function() {
        var cardId = Blaze.getData(Template.instance().find('.card:first-child')).profile.card._id;
        var currentCard = MatchingCards.findOne({_id: cardId});
        Meteor.call('markMatching', currentCard);
    }
    , 'click #dislikeIt': function() {
        var cardId = Blaze.getData(Template.instance().find('.card:first-child')).profile.card._id;
        var currentCard = MatchingCards.findOne({_id: cardId});
        Meteor.call('markNotMatching', currentCard);
    }
});