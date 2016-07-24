import { Mongo } from 'meteor/mongo';

import { Lights } from '../philips-hue/lights/lights';

export const Rooms = new Mongo.Collection('rooms');

const RoomSchema = new SimpleSchema({
    name: {
        type: String,
        label: 'Name'
    },
    icon: {
        type: String,
        label: 'Icon',
        allowedValues: [
            'bathroom', 'bedroom', 'carport', 'dining', 'driveway', 'frontdoor', 'garage', 'garden', 'gym', 'hallway',
            'kids_bedroom', 'kitchen', 'living', 'nursery', 'office', 'other', 'recreation', 'terrace', 'toilet'
        ]
    },
    channel: {
        type: String,
        label: 'Channel'
    },
    lights: {
        type: [String],
        label: 'Lights',
        autoform: {
            type: 'select-checkbox-inline',
            options: function () {
                let lights = Lights.find();
                return lights.map(function (light) {
                    return {
                        label: light.name,
                        value: light._id
                    }
                })
            }
        }
    }
});

Rooms.attachSchema(RoomSchema);
Rooms.friendlySlugs();
