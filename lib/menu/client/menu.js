Template.menu.events({
    'click #back': function() {
        Session.set('page', 'cards');
    },
    'click #options': function() {
        Session.set('page', 'profile');
    }
});

Template.menu.helpers({
    numOfMatches: function() {
        return Matches.find().count();
    },
    isDefaultPage: function() {
        return Session.equals('page', 'cards');
    }
});

Meteor.subscribe('Matches');