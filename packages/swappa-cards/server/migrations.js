Meteor.startup(function() {
    var users = Meteor.users.find({'profile.rooms': {$exists: true}});
    if (users.count() === 0) {
        var rooms = [
            {
                title: 'Great room!',
                content: 'Nice room in a 3 bedroom house',
                images: ['https://a0.muscache.com/im/pictures/11038899/0385f3e3_original.jpg?aki_policy=large'],
            }, {
                title: 'Big house',
                content: 'A whole house with a dog, just for you!',
                images: ['https://a1.muscache.com/im/pictures/97550952/09893588_original.jpg?aki_policy=x_medium'],
            }, {
                title: 'A whole apartment',
                content: 'In the city center.',
                images: ['https://a0.muscache.com/im/pictures/106357154/bb0024f5_original.jpg?aki_policy=x_medium'],
            }, {
                title: 'Nice room, fun roomates!',
                content: 'With a view to the Machtesh.',
                images: ['https://a2.muscache.com/im/pictures/7c7435d6-cee0-4b0a-8f6a-5f97a72001f2.jpg?aki_policy=x_medium'],
            }
        ];

        var now = Date.now();
        var sampleUsers = Meteor.users.find().map(function (user) {
            var room = EJSON.clone(rooms[Math.floor(Math.random() * rooms.length)]);
            var id = new Mongo.ObjectID();
            var profile = user.profile || {};
            room._id = id.toHexString();

            // Create a date range starting from now + 30 days (random) ending in 4 days (random)
            var fromDate = new Date(now + Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30));
            room.fromDate = fromDate;
            room.toDate = new Date(fromDate.valueOf() + Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 4));

            profile.rooms = [room];
            user.profile = profile;
            return user;
        });

        sampleUsers.forEach(function (user) {
            Meteor.users.update(user._id, user);
        });
    }
});