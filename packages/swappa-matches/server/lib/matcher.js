Matcher = (function() {

    function notify(myUserId, data) {
        // check if the other user marked me as a match
        var theirUserId = data.userId;

        // find me in their matches
        if (UserMatches.findOne({ownerId: theirUserId, userId: myUserId, match: true})) {
            Matches.insert({docIds: [myUserId, theirUserId]});
        }
    }

    return {

        find: function (userId) {
            var my = UserMatches.findOne({userId: userId}) || {userId: userId, matches: []};

            // TODO: Remove objects already seen by user



            //my = collection.find({_id: {$nin: my.matches.map(docIds)}});

            return my;
        }

        , markMatching: function (userId, doc) {
            UserMatches.insert({userId: userId, ownerId: doc.userId, docId: doc._id, match: true});
            notify(userId, {userId: doc.userId, docId: doc._id});
        }

        , markNotMatching: function (userId, doc) {
            UserMatches.insert({userId: userId, ownerId: doc.userId, docId: doc._id, match: false});
        }

        , markedByUser: function(userId) {
            return UserMatches.find({userId: userId});
        }
    }
}());