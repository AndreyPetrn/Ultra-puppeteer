// @ts-nocheck
// https://github.com/getbraincloud/braincloud-js#running-in-nodejs-without-web-interface-nodejs-server
const xmlhttprequest = require('xmlhttprequest');
global.XMLHttpRequest = xmlhttprequest.XMLHttpRequest;
global.window = {
  XMLHttpRequest: global.XMLHttpRequest,
};
global.XMLHttpRequest.UNSENT = 0;
global.XMLHttpRequest.OPENED = 1;
global.XMLHttpRequest.HEADERS_RECEIVED = 2;
global.XMLHttpRequest.LOADING = 3;
global.XMLHttpRequest.DONE = 4;
global.WebSocket = require('ws');
global.LocalStorage = require('node-localstorage/LocalStorage').LocalStorage;
const os = require('os');
const configDir = os.homedir() + '/.bciot';
global.localStorage = new global.LocalStorage(configDir);
export const braincloud = require('braincloud');
