Matcher = (function() {

    function notify(myUserId, data) {
        // check if the other user marked me as a match
        var theirUserId = data.userId;

        // find me in their matches
        if (UserMatches.findOne({userId: theirUserId, matches: {$elemMatch: {userId: myUserId, match: true}}})) {
            Matches.insert({docIds: [myUserId, theirUserId]});
        }
    }

    return {

        find: function (userId) {
            var my = UserMatches.findOne({userId: userId}) || {userId: userId, matches: []};

            // TODO: Remove objects already seen by user


            function docIds(match) {
                return match.docId;
            }

            //my = collection.find({_id: {$nin: my.matches.map(docIds)}});

            return my;
        }

        , markMatching: function (userId, doc) {
            UserMatches.upsert({userId: userId}, {$push: {matches: {userId: doc.userId, docId: doc._id, match: true}}});
            notify(userId, {userId: doc.userId, docId: doc._id});
        }

        , markNotMatching: function (userId, doc) {
            UserMatches.upsert({userId: userId}, {$push: {matches: {userId: doc.userId, docId: doc._id, match: false}}});
        }

    }
}());