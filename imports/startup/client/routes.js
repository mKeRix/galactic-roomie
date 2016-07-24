import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// import to load templates
import '../../ui/layouts/app-body';
import '../../ui/layouts/app-frame';
import '../../ui/pages/app-dashboard';
import '../../ui/pages/settings-lights';
import '../../ui/pages/settings-rooms';

// ROUTES

FlowRouter.route('/', {
    name: 'app.dashboard',
    action() {
        BlazeLayout.render('app_body', {main: 'app_dashboard'});
    },
});

FlowRouter.route('/settings/lights', {
    name: 'settings.lights',
    action() {
        BlazeLayout.render('app_body', {main: 'settings_lights'});
    }
});

FlowRouter.route('/settings/rooms', {
    name: 'settings.rooms',
    action() {
        BlazeLayout.render('app_body', {main: 'settings_rooms'});
    }
});