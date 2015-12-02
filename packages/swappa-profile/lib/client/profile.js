Tracker.autorun(function() {
    Meteor.subscribe('UserCard');
});

var state = new ReactiveVar('initial');

Template.profile.helpers({
    userCard: function() {
        var room = Meteor.user() && Meteor.user().profile.rooms[0];
        room.fromDateString = moment(room.fromDate).format('DD/MM/YYYY');
        room.toDateString = moment(room.toDate).format('DD/MM/YYYY');
        return room;
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
          , fromDate: template.$('[name="fromDate"]').data("DateTimePicker").date().toDate()
          , toDate: template.$('[name="toDate"]').data("DateTimePicker").date().toDate()
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
    this.$('.ui.form').form({
        fields: {
            title     : 'empty',
            description   : 'empty'
        }
    });

    /**
     * Set the date pickers so that you can only choose a range of dates
     */
    var $fromDate = this.$('[name="fromDate"]');
    var $toDate = this.$('[name="toDate"]');

    $fromDate.datetimepicker({
        format: 'DD/MM/YYYY'
    });
    $toDate.datetimepicker({
        format: 'DD/MM/YYYY',
        useCurrent: false //Important! See issue #1075
    });
    $fromDate.on("dp.change", function (e) {
        $toDate.data("DateTimePicker").minDate(e.date);
    });
    $toDate.on("dp.change", function (e) {
        $fromDate.data("DateTimePicker").maxDate(e.date);
    });
});