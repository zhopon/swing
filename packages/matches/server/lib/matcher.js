Matcher = (function() {

    function notify(data) {
        // check if the other user marked me as a match
        var theirUserId = data.docId
            , myUserId = data.userId;

        // find me in their matches
        if (UserMatches.findOne({userId: theirUserId, matches: {$elemMatch: {docId: myUserId, match: true}}})) {
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

        , markMatching: function (userId, docId) {
            UserMatches.upsert({userId: userId}, {$push: {matches: {docId: docId, match: true}}});
            notify({userId: userId, docId: docId});
        }

        , markNotMatching: function (userId, docId) {
            UserMatches.upsert({userId: userId}, {$push: {matches: {docId: docId, match: false}}});
        }

    }
}());