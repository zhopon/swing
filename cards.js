var cards = new Mongo.Collection('cards');
if (cards.find().count() === 0) {
    cards.insert({title: 'clubs', content: '♣'});
    cards.insert({title: 'diamonds', content: '♦'});
    cards.insert({title: 'hearts', content: '♥'});
    cards.insert({title: 'spades', content: '♠'});
}

if (Meteor.isClient) {
  Template.cards.onRendered(function() {
    var stack;

      stack = gajus.Swing.Stack();

      [].forEach.call(this.findAll('.stack li'), function (targetElement) {
          stack.createCard(targetElement);

          targetElement.classList.add('in-deck');
      });

      stack.on('throwout', function (e) {
          console.log(e.target.innerText || e.target.textContent, 'has been thrown out of the stack to the', e.throwDirection == 1 ? 'right' : 'left', 'direction.');

          e.target.classList.remove('in-deck');
      });

      stack.on('throwin', function (e) {
          console.log(e.target.innerText || e.target.textContent, 'has been thrown into the stack from the', e.throwDirection == 1 ? 'right' : 'left', 'direction.');

          e.target.classList.add('in-deck');
      });
  });

    Template.cards.helpers({
        cards: function() {
            return cards.find();
        }
    });
}