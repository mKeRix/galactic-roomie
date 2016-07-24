import './settings-rooms.html';
import '../components/settings/room-item';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Rooms } from '../../api/rooms/rooms';

Template.settings_rooms.onCreated(function settingsLightsOnCreated() {
    this.subscribe('rooms');
    this.subscribe('lights');

    window.Rooms = Rooms;
});

Template.settings_rooms.helpers({
    rooms: () => Rooms.find()
});
