import './room-dashboard.html';
import '../components/dashboards/light-card';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Rooms } from '../../api/rooms/rooms';
import { Lights } from '../../api/philips-hue/lights/lights';

Template.room_dashboard.onCreated(function roomDashboardOnCreated() {
    this.getRoomSlug = () => FlowRouter.getParam('slug');

    this.autorun(() => {
        this.subscribe('roomDetails', this.getRoomSlug());
    });
});

/*Template.room_dashboard.onRendered(function () {
    const createMasonry = function () {
        const $masonryContainer = $('.masonry');
        setTimeout( function () {
            $masonryContainer.masonry({
                itemSelector: '.grid-item'
                /!* 'isOriginLeft': false // RTL support *!/
            });
        }, 300);
    };

    createMasonry();
    Pleasure.callOnResize.push(createMasonry);
});*/

Template.room_dashboard.helpers({
    room: () => {
        const instance = Template.instance();
        return Rooms.findOne({ slug: instance.getRoomSlug() })
    },
    lights: () => Lights.find()
});
