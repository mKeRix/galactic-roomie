import { Meteor } from 'meteor/meteor';

import { Rooms } from '../rooms';
import { Lights } from '../../philips-hue/lights/lights';

Meteor.publish('rooms', function lights() {
    // TODO: restrict the given data values here
    return Rooms.find();
});

Meteor.publishComposite('roomDetails', function (slug) {
    return {
        find: function () {
            return Rooms.find({ slug: slug });
        },
        children: [
            {
                find: function (room) {
                    return Lights.find({ _id: { $in: room.lights } });
                }
            }
        ]
    }
});
