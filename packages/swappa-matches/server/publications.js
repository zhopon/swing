Meteor.publish('Matches', function() {
    return Matches.find({docIds: this.userId});
});