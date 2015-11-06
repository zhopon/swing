Template.menu.events({
    'click #filter': function() {

    },
    'click #options': function() {

    }
});

Template.menu.helpers({
    numOfMatches: function() {
        return Matches.find().count();
    }
});

Meteor.subscribe('Matches');