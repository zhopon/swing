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

    var cards = Cards.find({
        userId: {$ne: this.userId},
        _id: {$nin: userMatches.map(function(match) {
            return match.docId;
        })}
    }, {
        limit: pagination.limit
    });

    if (cards.count() === 0) {
        self.ready();
        return [];
    }
    cards.map(function(doc) {
        self.added('matchingCards', doc._id, doc);
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
                Cards.find({
                    userId: {$ne: self.userId},
                    _id: {$nin: userMatches.map(function(match) {
                        return match.docId;
                    })}
                }, {
                    limit: removed + pagination.threshold
                }).forEach(function(doc) {
                    self.added('matchingCards', doc._id, doc);
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