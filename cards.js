cards = new Mongo.Collection('cards');
if (cards.find().count() === 0) {
//    cards.insert({title: 'clubs', content: '♣'});
//    cards.insert({title: 'diamonds', content: '♦'});
//    cards.insert({title: 'hearts', content: '♥'});
//    cards.insert({title: 'spades', content: '♠'});
}

if (Meteor.isClient) {
    var stack;

    stack = gajus.Swing.Stack();

    Template.cards.onRendered(function () {

        stack.on('throwout', function (e) {
            console.log(e.target.innerText || e.target.textContent, 'has been thrown out of the stack to the', e.throwDirection == 1 ? 'right' : 'left', 'direction.');

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