Meteor.publish('Matches', function() {
    console.log('publishing user matches', {docIds: this.userId});
    return Matches.find({docIds: this.userId});
});