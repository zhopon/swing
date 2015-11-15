Meteor.publish('Cards', function() {
    var userMatches = Matcher.markedByUser(this.userId);
    var docIds = [];
    var self = this;

    var cards = Cards.find({
        userId: {$ne: this.userId},
        _id: {$nin: userMatches.map(function(match) {
            return match.docId;
        })}
    });

    if (cards.count() === 0) {
        self.ready();
        return;
    }
    cards.map(function(doc) {
        self.added('cards', doc._id, doc);
    });

    var handle = userMatches.observe({
        added: function(match) {
            docIds.push(match.docId);
            self.removed('cards', match.docId);
        }
    });

    self.onStop(function() {
        handle.stop();
    });

    self.ready();
});