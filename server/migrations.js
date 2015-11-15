Meteor.startup(function() {
    if (Meteor.users.find().count() == 0) {
        Accounts.createUser({username: 'aaa', password: 'aaa'});
        Accounts.createUser({username: 'bbb', password: 'bbb'});
    }
});