Meteor.methods({

    markMatching: function (docId) {
        Matcher.markMatching(this.userId, docId);
    }

    , markNotMatching: function (docId) {
        Matcher.markNotMatching(this.userId, docId);
    }

});