Template.matches.helpers({
    numOfMatches: function() {
        return Matches.find().count();
    }
});

Meteor.subscribe('Matches');