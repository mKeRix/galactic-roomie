import { Meteor } from 'meteor/meteor';

import { Rooms } from './rooms';

Meteor.methods({
    'rooms.insert'(doc) {
        // TODO: add checks
        check(doc, Rooms.simpleSchema());
        Rooms.insert(doc);
    },

    'rooms.update'(doc, id) {
        // TODO: add checks
        check(doc, Rooms.simpleSchema());
        Rooms.update(id, doc);
    }
});
