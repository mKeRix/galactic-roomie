import './bridge-item.html';

import { Settings } from '../../../api/settings/settings';

Template.bridge_item.events({
    'click .connect-modal-button': function (event, template) {
        const modal = $('#push-link-modal');
        modal.find('#push-link-connect').attr('data-hostname', this.ipaddress);
        modal.modal('show');
    }
});

Template.bridge_push_link_modal.events({
    'click #push-link-connect': function (event, template) {
        const modal = $('#push-link-modal'),
            button = $('#push-link-connect'),
            hostname = button.data('hostname');

        button.attr('disabled', true);

        Meteor.callPromise('philipsHue.bridges.connect', hostname).then((val) => {
            Meteor.call('settings.hue.change', hostname, val);
            modal.modal('hide');
            toastr.success('Successfully connected to ' + hostname);
        }).catch((error) => {
            // maybe find a way to pass the error msg along?
            toastr.error('Error when connecting to bridge!');
            button.removeAttr('disabled');
        });
    }
});
