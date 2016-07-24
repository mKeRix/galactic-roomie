import { Meteor } from 'meteor/meteor';

import { Rooms } from '../rooms';

Meteor.publish('rooms', function lights() {
    // TODO: restrict the given data values here
    return Rooms.find();
});
