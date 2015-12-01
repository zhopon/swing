Meteor.startup(function() {
    if (Meteor.users.find().count() == 0) {
        for(var i=1; i<=100; i++) {
            Accounts.createUser({username: 'user' + i, password: '123456'});
        }
    }
});