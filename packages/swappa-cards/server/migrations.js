Meteor.users.find().forEach(function(user) {
    var userId = user._id;
    if (cards.find({userId: userId}).count() === 0) {
        cards.insert({title: 'Great room!', content: 'Nice room in a 3 bedroom house', images: ['https://a0.muscache.com/im/pictures/11038899/0385f3e3_original.jpg?aki_policy=large'], userId: userId});
        cards.insert({title: 'Big house', content: 'A whole house with a dog, just for you!', images: ['https://a1.muscache.com/im/pictures/97550952/09893588_original.jpg?aki_policy=x_medium'], userId: userId});
        cards.insert({title: 'A whole appartment', content: 'In the city center.', images: ['https://a0.muscache.com/im/pictures/106357154/bb0024f5_original.jpg?aki_policy=x_medium'], userId: userId});
        cards.insert({title: 'Nice room, fun roomates!', content: 'With a view to the Machtesh.', images: ['https://a2.muscache.com/im/pictures/7c7435d6-cee0-4b0a-8f6a-5f97a72001f2.jpg?aki_policy=x_medium'], userId: userId});
    }
});