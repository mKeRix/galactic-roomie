import { Meteor } from 'meteor/meteor';

import { HueApi } from  'node-hue-api';
import { Lights } from './lights';

Meteor.methods({
    'lights.scan'() {
        const params = Meteor.call('philipsHue.bridges.client');
        const hueClient = new HueApi(params._config.hostname, params._config.username);

        const lightScan = Meteor.wrapAsync(hueClient.lights, hueClient);
        let results = lightScan();

        results.lights.forEach(function (hueLight) {
            // convert the id from string to int
            hueLight.id = parseInt(hueLight.id);
            // search for our db version of the light
            let dbLight = Lights.findOne({ id: hueLight.id });

            if (dbLight) {
                // we already have a db copy of this light, check for changes
                // we need to fake add our id for the diff plugin to work
                hueLight._id = dbLight._id;
                let diff = jsDiff2Mongo(dbLight, hueLight);

                if (diff && diff.length > 1) {
                    // light updated
                    Lights.update(diff[0]._id, diff[1]);
                }
            }
            else {
                // we need a new local copy for this light
                Lights.insert(hueLight);
            }
        })
    }
});
