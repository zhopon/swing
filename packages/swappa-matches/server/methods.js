Meteor.methods({

    markMatching: function (doc) {
        Matcher.markMatching(this.userId, doc.profile.card);
    }

    , markNotMatching: function (doc) {
        Matcher.markNotMatching(this.userId, doc.profile.card);
    }

});