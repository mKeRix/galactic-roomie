import './settings-lights.html';
import '../components/settings/bridge-item';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Settings } from '../../api/settings/settings';

var bridgesPromise = new ReactiveVar(null);
var searching = new ReactiveVar(false);

Template.settings_lights.onCreated(function settingsLightsOnCreated() {
    this.subscribe('settings.hue');
});

Template.settings_lights.onRendered(function settingsLightsOnRendered() {
    $('#refresh-bridges').click();
});

Template.settings_lights.events({
    'click #refresh-bridges': function (event, template) {
        if (!searching.get()) {
            searching.set(true);
            bridgesPromise.set(null);
            Meteor.callPromise('philipsHue.bridges.find').then((val) => {
                bridgesPromise.set(val);
                searching.set(false);
            });
        }
    }
});

Template.settings_lights.helpers({
    bridges: () => bridgesPromise.get(),
    isSearching: () => searching.get(),
    hueSettings: () => Settings.findOne({ type: 'philips-hue' })
});
