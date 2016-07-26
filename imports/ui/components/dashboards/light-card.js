import './light-card.html';

import { Template } from 'meteor/templating';
import RGBXYConverter from 'node-hue-api/hue-api/rgb';

Template.light_card.onRendered(function lightCardOnRendered() {
    // workaround to inline the svgs... xlink:href does not work when loaded afterwards apparently
    $('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        $.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');
            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }
            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');
            // Replace image with new SVG
            $img.replaceWith($svg);
        }, 'xml');
    });
});

Template.light_card.helpers({
    icon: () => {
        const modelid = Template.instance().data.modelid;
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
    },
    lightRGBColor: () => {
        const state = Template.instance().data.state;
        if (state.on) {
            let x,y;
            if (state.hasOwnProperty('xy')) {
                x = state.xy[0];
                y = state.xy[1];
            }
            else {
                x = 0.3436;
                y = 0.3612;
            }

            const rgb = RGBXYConverter.convertXYtoRGB(x, y, state.bri / 254);
            return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
        }
        else {
            return 'rgb(0,0,0)';
        }
    }
});
