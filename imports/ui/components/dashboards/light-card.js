import './light-card.html';

import { Template } from 'meteor/templating';

Template.light_card.helpers({
    icon: (modelid) => {
        const path = '/img/icons/hue/products/';

        if (_.contains(['LCT001', 'LCT007'], modelid)) {
            return path + 'white_and_color_e27.svg#Layer1'
        }
        else if (_.contains(['LCT002'], modelid)) {
            return path + 'br30.svg#Layer1'
        }
        else if (_.contains(['LCT003'], modelid)) {
            return path + 'gu10_par16.svg#Layer1'
        }
        else if (_.contains(['LLC006', 'LLC010'], modelid)) {
            return path + 'iris.svg#Layer1'
        }
        else if (_.contains(['LLC007', 'LLC011', 'LLC012'], modelid)) {
            return path + 'bloom.svg#Layer1'
        }
        else if (_.contains(['LST001', 'LST002'], modelid)) {
            return path + 'lightstrip.svg#Layer1'
        }
        else if (_.contains(['LLC020'], modelid)) {
            return path + 'go.svg#Layer1'
        }
        else {
            return path + 'white_e27_b22.svg#Layer1';
        }
    }
});
