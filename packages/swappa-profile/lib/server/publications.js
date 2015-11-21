Meteor.publish('UserCard', function() {
    return Cards.find({userId: this.userId}, {limit: 1});
});