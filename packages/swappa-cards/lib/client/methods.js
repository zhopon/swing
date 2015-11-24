// Method stubs for the matching methods
Meteor.methods({

    markMatching: function (doc) {
        MatchingCards.remove({_id: doc._id});
    }

    , markNotMatching: function (doc) {
        MatchingCards.remove({_id: doc._id});
    }

});