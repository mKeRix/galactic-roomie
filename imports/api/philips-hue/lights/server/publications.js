import { Meteor } from 'meteor/meteor';

import { Lights } from '../lights';

Meteor.publish('lights', function lights() {
    // TODO: restrict the given data values here
    return Lights.findAll();
});
