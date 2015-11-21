Meteor.methods({
    'addCard': function(card) {
        check(card, {
            title: String
          , content: String
          , hasRoomMates: Boolean
        });

        var userId = this.userId;

        card.userId = userId;
        var newCardId = Cards.insert(card);

        // Remove old user cards
        if (newCardId) {
            Cards.remove({
                _id: {$ne: newCardId},
                userId: userId
            });
        }

        return true;
    }
});