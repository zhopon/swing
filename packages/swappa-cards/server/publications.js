/**
 * This publication publishes a collection of cards which the user havent seen yet.
 * It observes the user matches to filter out the already seen cards
 * and to reactive(ly) respond to user likes/dislikes.
 *
 * In addition it is in charge of the pagination
 */
Meteor.publish('MatchingCards', function(pagination) {
    var userMatches = Matcher.markedByUser(this.userId);
    var self = this;
    var initializing = true;

    var userCards = Meteor.users.find({
        _id: {$ne: this.userId},
        'profile.rooms': {$exists: true},
        'profile.rooms._id': {$nin: userMatches.map(function(match) {
            return match.docId;
        })}
    }, {
        fields: {
            _id: 1,
            username: 1,
            profile: 1
        },
        limit: pagination.limit
    });

    if (userCards.count() === 0) {
        self.ready();
        return [];
    }

    [].concat.apply([], userCards.map(createCards)).forEach(function(card) {
        self.added('matchingCards', card._id, card);
    });

    var removed = 0;
    var handle = userMatches.observe({
        added: function(match) {
            if (initializing) {
                return;
            }
            self.removed('matchingCards', match.docId);
            removed++;
            if (removed >= pagination.threshold) {
                var newCards = Meteor.users.find({
                    _id: {$ne: self.userId},
                    'profile.rooms._id': {$nin: userMatches.map(function(match) {
                        return match.docId;
                    })}
                }, {
                    fields: {
                        _id: 1,
                        username: 1,
                        profile: 1
                    },
                    limit: removed + pagination.threshold
                });
                [].concat.apply([], userCards.map(createCards)).forEach(function(card) {
                    self.added('matchingCards', card._id, card);
                });

                removed = 0;
            }
        }
    });

    initializing = false;

    self.onStop(function() {
        handle.stop();
    });

    self.ready();
});

function createCards(user) {
    var cards = [];
    var userId = user._id;

    user.profile.rooms.forEach(function(room) {
        var card = _.clone(user);
        room.userId = userId;

        if (room.fromDate) {
            room.fromDateString = moment(room.fromDate).format('DD-MM-YYYY');
            room.toDateString = moment(room.toDate).format('DD-MM-YYYY');
        }

        card.profile.card = room;
        card._id = room._id;
        cards.push(card);
    });

    return cards;
}