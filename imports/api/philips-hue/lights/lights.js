import { Mongo } from 'meteor/mongo';

export const Lights = new Mongo.Collection('lights');

const LightSchema = new SimpleSchema({
    id: {
        type: Number,
        label: 'ID',
    },
    name: {
        type: String,
        label: 'Name'
    },
    type: {
        type: String,
        label: 'Type'
    },
    modelid: {
        type: String,
        label: 'Model ID'
    },
    manufacturername: {
        type: String,
        label: 'Manufacturer'
    },
    uniqueid: {
        type: String,
        label: 'Unique ID'
    },
    swversion: {
        type: String,
        label: 'Software Version'
    },
    state: {
        type: Object,
        label: 'State'
    },
    'state.on': {
        type: Boolean,
        label: 'On/Off'
    },
    'state.bri': {
        type: Number,
        label: 'Brightness',
        min: 1,
        max: 254
    },
    'state.hue': {
        type: Number,
        label: 'Hue',
        optional: true,
        min: 0,
        max: 65535
    },
    'state.sat': {
        type: Number,
        label: 'Saturation',
        optional: true,
        min: 0,
        max: 254
    },
    'state.effect': {
        type: String,
        label: 'Effect',
        optional: true
    },
    'state.xy': {
        type: [Number],
        label: 'XY',
        optional: true,
        decimal: true,
        min: 0,
        max: 1,
        minCount: 2,
        maxCount: 2
    },
    'state.alert': {
        type: String,
        label: 'Alert'
    },
    'state.colormode': {
        type: String,
        label: 'Color Mode',
        optional: true,
        allowedValues: ['hs', 'xy', 'ct']
    },
    'state.reachable': {
        type: Boolean,
        label: 'Reachable'
    }
});

Lights.attachSchema(LightSchema);
