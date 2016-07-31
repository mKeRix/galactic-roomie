import { Meteor } from 'meteor/meteor';

import { Settings } from '../../settings/settings';
import { HueApi } from 'node-hue-api';
import hue from 'node-hue-api';

Meteor.methods({
    'philipsHue.bridges.find'() {
        return Promise.await(hue.nupnpSearch());
    },

    'philipsHue.bridges.connect'(hostname) {
        const hueApi = new HueApi();
        return Promise.await(hueApi.registerUser(hostname, 'GalacticRoomie'));
    },

    'philipsHue.bridges.client'() {
        const hueSettings = Settings.findOne({ type: 'philips-hue' });
        if (hueSettings) {
            return new HueApi(hueSettings.hostname, hueSettings.username);
        } else {
            return null;
        }
    }
});
