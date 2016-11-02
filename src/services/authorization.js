'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _simpleOauth = require('simple-oauth2');

var _simpleOauth2 = _interopRequireDefault(_simpleOauth);

var _index = require('../../index');

var _index2 = _interopRequireDefault(_index);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthorizationService = function () {
  function AuthorizationService() {
    _classCallCheck(this, AuthorizationService);
  }

  _createClass(AuthorizationService, [{
    key: 'authorizationRedirect',
    value: function authorizationRedirect(res) {
      return res.redirect(this.authorizationUri());
    }
  }, {
    key: 'authorizationUri',
    value: function authorizationUri() {
      var authorizationUriValue = AuthorizationService.createAuthorization().authorizationCode.authorizeURL({
        redirect_uri: _index2.default.REDIRECT_URI,
        scope: _index2.default.REDIRECT_SCOPE,
        state: _index2.default.REDIRECT_STATE
      });

      return authorizationUriValue;
    }
  }], [{
    key: 'createAuthorization',
    value: function createAuthorization() {
      var createAuthorizationValue = _simpleOauth2.default.create({
        client: {
          id: _index2.default.CLIENT_ID,
          secret: _index2.default.CLIENT_SECRET
        },
        auth: {
          tokenHost: _index2.default.TOKEN_HOST,
          tokenPath: _index2.default.TOKEN_PATH,
          authorizePath: _index2.default.AUTHORIZE_PATH
        }
      });

      return createAuthorizationValue;
    }
  }, {
    key: 'getToken',
    value: function getToken(options, res) {
      AuthorizationService.createAuthorization().authorizationCode.getToken(options, function (error, result) {
        if (error) {
          console.error('Access Token Error', error.message);
          return res.json('Authentication failed');
        }

        GITHUB_TOKEN = AuthorizationService.createAuthorization().accessToken.create(result);

        return res.redirect(_index2.default.FACEBOOK_PAGE_URL);
      });
    }
  }]);

  return AuthorizationService;
}();

exports.default = AuthorizationService;
module.exports = exports['default'];
//# sourceMappingURL=authorization.js.map
