if (Meteor.isClient) {

    Meteor.subscribe('Cards');
    var cards = new Mongo.Collection('cards');

    Template.cards.helpers({
        cards: function () {
            return cards.find();
        }
    });
}

if (Meteor.isServer) {
    var cards = new Mongo.Collection('cards');
    Meteor.users.find().forEach(function(user) {
        var userId = user._id;
        if (cards.find({userId: userId}).count() === 0) {
            cards.insert({title: 'clubs', content: '♣', userId: userId});
            cards.insert({title: 'diamonds', content: '♦', userId: userId});
            cards.insert({title: 'hearts', content: '♥', userId: userId});
            cards.insert({title: 'spades', content: '♠', userId: userId});
        }
    });

    Meteor.publish('Cards', function() {
        // this is wrong. publish relevant records and publish users matches array
        //Matches.setCollection(cards);
        //return Matches.find(this.userId);
        return cards.find({userId: {$ne: this.userId}});
    });
}