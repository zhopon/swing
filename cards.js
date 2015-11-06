if (Meteor.isClient) {
    var stack;

    stack = gajus.Swing.Stack();

    Meteor.subscribe('Cards');
    var cards = new Mongo.Collection('cards');

    Template.cards.onRendered(function () {

        stack.on('throwout', function (e) {
            console.log(e.target.innerText || e.target.textContent, 'has been thrown out of the stack to the', e.throwDirection == 1 ? 'right' : 'left', 'direction.');

            var card = Blaze.getView(e.target).templateInstance().data;
            if (e.throwDirection == 1) { // Left
                Meteor.call('markMatching', card);
            } else {
                Meteor.call('markNotMatching', card);
            }

            e.target.classList.remove('in-deck');
        });

        stack.on('throwin', function (e) {
            console.log(e.target.innerText || e.target.textContent, 'has been thrown into the stack from the', e.throwDirection == 1 ? 'right' : 'left', 'direction.');

            e.target.classList.add('in-deck');
        });
    });

    Template.card.onRendered(function() {
        var targetElement = this.find('li');

        stack.createCard(targetElement);

        targetElement.classList.add('in-deck');
    });

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