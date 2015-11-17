// Method stubs for the matching methods
Meteor.methods({

    markMatching: function (doc) {
        Cards.remove({_id: doc._id});
    }

    , markNotMatching: function (doc) {
        Cards.remove({_id: doc._id});
    }

});