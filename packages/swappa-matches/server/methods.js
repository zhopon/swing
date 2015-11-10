Meteor.methods({

    markMatching: function (doc) {
        Matcher.markMatching(this.userId, doc);
    }

    , markNotMatching: function (doc) {
        Matcher.markNotMatching(this.userId, doc);
    }

});