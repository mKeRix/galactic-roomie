// api methods
import '../../api/philips-hue/bridges/methods';
import '../../api/settings/settings';
import '../../api/settings/methods';
import '../../api/settings/server/publications';
import '../../api/philips-hue/lights/lights';
import '../../api/philips-hue/lights/methods';

// scheduled jobs
import './scheduled-jobs'

Meteor.startup(function () {
    // start the jobs!
    SyncedCron.start();
});
