import { Meteor } from 'meteor/meteor';

SyncedCron.add({
    name: 'Scan Philips Hue lights',
    schedule: function(parser) {
        return parser.text('every 5 minutes');
    },
    job: function() {
        Meteor.call('lights.scan');
    }
});
