import { Meteor } from 'meteor/meteor';

import { Settings } from './settings';

Meteor.methods({
    'settings.hue.change'(hostname, username) {
        let hueSettings = Settings.findOne({ type: 'philips-hue' });

        if (hueSettings) {
            // settings doc already exists
            Settings.update(hueSettings._id, {
                $set: {
                    hostname: hostname,
                    username: username
                }
            });
        }
        else {
            // settings doc needs to be created
            Settings.insert({
                type: 'philips-hue',
                hostname: hostname,
                username: username
            });
        }
    }
});
