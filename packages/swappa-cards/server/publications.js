Meteor.publish('Cards', function() {
    // this is wrong. publish relevant records and publish users matches array
    //Matches.setCollection(cards);
    //return Matches.find(this.userId);
    return cards.find({userId: {$ne: this.userId}});
});