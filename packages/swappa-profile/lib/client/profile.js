Tracker.autorun(function() {
    Meteor.subscribe('UserCard');
});

var state = new ReactiveVar('initial');

Template.profile.helpers({
    userCard: function() {
        return Meteor.user() && Meteor.user().profile.rooms[0];
    },
    formHasErrors: function() {
        return state.get() === 'error';
    },
    formIsSaving: function() {
        return state.get() === 'saving';
    },
    formHasSaved: function() {
        return state.get() == 'saved';
    }
});

Template.profile.events({
    'submit': function(e, template) {
        e.preventDefault();

        var userCard = {
            title: template.$('[name="title"]').val()
          , content: template.$('[name="description"]').val()
          , hasRoomMates: template.$('[name="hasRoomMates"]').prop('checked')
        };

        state.set('saving');
        Meteor.call('addCard', userCard, function(error, result) {
            if (result) {
                state.set('saved');
            } else {
                state.set('error');
            }
        });
    }
});

Template.profile.onRendered(function() {
    this.$('.ui.form')
        .form({
            fields: {
                title     : 'empty',
                description   : 'empty'
            }
        })
    ;
});