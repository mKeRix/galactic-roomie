import './app-body.html';
import './lib/global-vendors.js';
import './lib/pleasure.js';
import './lib/layout.js';

import { Template } from 'meteor/templating';
import { Rooms } from '../../api/rooms/rooms';

Template.app_body.onRendered(function () {
    Pleasure.init();
    Layout.init();
});

Template.app_menu.onCreated(function appMenuOnCreated() {
    this.subscribe('rooms');
});

Template.app_menu.helpers({
    rooms: () => Rooms.find()
});