'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../../index');

var _index2 = _interopRequireDefault(_index);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WebhookService = function () {
  function WebhookService() {
    _classCallCheck(this, WebhookService);
  }

  _createClass(WebhookService, [{
    key: 'tokenVerify',
    value: function tokenVerify(req, res) {
      if (!req.query['hub.verify_token'] === _index2.default.FACEBOOK_TOKEN) {
        return res.send('Error, wrong token');
      }

      return res.send(req.query['hub.challenge']);
    }
  }, {
    key: 'messageEvent',
    value: function messageEvent(req, res) {
      var messagingEvents = req.body.entry[0].messaging;

      console.log(req.body);

      for (var i = 0; i < messagingEvents.length; i++) {
        var event = req.body.entry[0].messaging[i];
        var sender = event.sender.id;

        if (event.message && event.message.text) {
          var text = event.message.text;

          if (text === 'Generic') {
            sendGenericMessage(sender, _index2.default.FACEBOOK_TOKEN);
            continue;
          }

          sendTextMessage(sender, 'Text received, echo: ' + text.substring(0, 200), _index2.default.FACEBOOK_TOKEN);
        }

        if (event.postback) {
          var _text = JSON.stringify(event.postback);

          sendTextMessage(sender, 'Postback received: ' + _text.substring(0, 200), _index2.default.FACEBOOK_TOKEN);
          continue;
        }
      }

      res.sendStatus(200);
    }
  }]);

  return WebhookService;
}();

exports.default = WebhookService;
module.exports = exports['default'];
//# sourceMappingURL=webhook.js.map
