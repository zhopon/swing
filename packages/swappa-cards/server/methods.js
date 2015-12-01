Meteor.methods({
    'addCard': function(card) {
        check(card, {
            title: String
          , content: String
          , hasRoomMates: Boolean
        });

        var userId = this.userId;

        card._id = new Mongo.ObjectID().toHexString();
        Meteor.users.update(userId, {$set: {'profile.rooms': [card]}});

        return true;
    }
});