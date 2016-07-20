import './app-body.html';
import './lib/global-vendors.js';
import './lib/pleasure.js';
import './lib/layout.js';

import { Template } from 'meteor/templating';

Template.app_body.onRendered(function () {
    Pleasure.init();
    Layout.init();
});
