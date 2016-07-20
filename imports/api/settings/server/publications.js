import { Meteor } from 'meteor/meteor';

import { Settings } from '../settings';

Meteor.publish('settings.hue', function settingsHue() {
    return Settings.find({
        type: 'philips-hue'
    });
});