import { Meteor } from 'meteor/meteor';

import { HueApi, lightState } from  'node-hue-api';
import { Lights } from './lights';
import RGBXYConverter from 'node-hue-api/hue-api/rgb';

Meteor.methods({
    'lights.scan'() {
        const params = Meteor.call('philipsHue.bridges.client');
        if (params) {
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
    },
    'lights.setState'(lightId, state) {
        const light = Lights.findOne(lightId);
        const params = Meteor.call('philipsHue.bridges.client');

        if (light && params) {
            // create light state object
            const hueClient = new HueApi(params._config.hostname, params._config.username);
            const rgb = hexToRgb(state.hex);
            let lightStateObject = lightState.create()
                .on(state.on)
                .rgb(rgb['r'], rgb['g'], rgb['b']);

            // wrap the async function and set state
            const setLightState = Meteor.wrapAsync(hueClient.setLightState, hueClient);
            var result = setLightState(light.id, lightStateObject);

            // update local db
            let xy = RGBXYConverter.convertRGBtoXY([rgb['r'],rgb['g'],rgb['b']], light.modelid);
            Lights.update(lightId, {
                $set: {
                    'state.on': state.on,
                    'state.xy': xy
                }
            });
        }
    }
});
