import { Mongo } from 'meteor/mongo';

import { Lights } from '../philips-hue/lights/lights';

export const Rooms = new Mongo.Collection('rooms');

const RoomSchema = new SimpleSchema({
    name: {
        type: String,
        label: 'Name'
    },
    slug: {
        type: String,
        label: 'Slug'
    },
    channel: {
        type: String,
        label: 'Channel'
    },
    lights: {
        type: [Lights],
        label: 'Lights'
    }
});

Rooms.attachSchema(RoomSchema);
Rooms.friendlySlugs();
