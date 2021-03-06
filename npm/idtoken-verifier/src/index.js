import sha256 from 'crypto-js/sha256';
import cryptoBase64 from 'crypto-js/enc-base64';
import cryptoHex from 'crypto-js/enc-hex';

import RSAVerifier from './helpers/rsa-verifier';
import * as base64 from './helpers/base64';
import * as jwks from './helpers/jwks';
import * as error from './helpers/error';
import DummyCache from './helpers/dummy-cache';
var supportedAlgs = ['RS256'];

/**
 * Creates a new id_token verifier
 * @constructor
 * @param {Object} parameters
 * @param {String} parameters.issuer name of the issuer of the token
 * that should match the `iss` claim in the id_token
 * @param {String} parameters.audience identifies the recipients that the JWT is intended for
 * and should match the `aud` claim
 * @param {Object} [parameters.jwksCache] cache for JSON Web Token Keys. By default it has no cache
 * @param {String} [parameters.jwksURI] A valid, direct URI to fetch the JSON Web Key Set (JWKS).
 * @param {String} [parameters.expectedAlg='RS256'] algorithm in which the id_token was signed
 * and will be used to validate
 * @param {number} [parameters.leeway=0] number of seconds that the clock can be out of sync
 * while validating expiration of the id_token
 */
function IdTokenVerifier(parameters) {
  var options = parameters || {};

  this.jwksCache = options.jwksCache || new DummyCache();
  this.expectedAlg = options.expectedAlg || 'RS256';
  this.issuer = options.issuer;
  this.audience = options.audience;
  this.leeway = options.leeway || 0;
  this.__disableExpirationCheck = options.__disableExpirationCheck || false;
  this.jwksURI = options.jwksURI;

  if (this.leeway < 0 || this.leeway > 300) {
    throw new error.ConfigurationError(
      'The leeway should be positive and lower than five minutes.'
    );
  }

  if (supportedAlgs.indexOf(this.expectedAlg) === -1) {
    throw new error.ConfigurationError(
      'Algorithm ' +
        this.expectedAlg +
        ' is not supported. (Expected algs: [' +
        supportedAlgs.join(',') +
        '])'
    );
  }
}

/**
 * @callback verifyCallback
 * @param {Error} [err] error returned if the verify cannot be performed
 * @param {boolean} [status] if the token is valid or not
 */

/**
 * Verifies an id_token
 *
 * It will validate:
 * - signature according to the algorithm configured in the verifier.
 * - if nonce is present and matches the one provided
 * - if `iss` and `aud` claims matches the configured issuer and audience
 * - if token is not expired and valid (if the `nbf` claim is in the past)
 *
 * @method verify
 * @param {String} token id_token to verify
 * @param {String} [nonce] nonce value that should match the one in the id_token claims
 * @param {verifyCallback} cb callback used to notify the results of the validation
 */
IdTokenVerifier.prototype.verify = function(token, nonce, cb) {
  var jwt = this.decode(token);

  if (jwt instanceof Error) {
    return cb(jwt, false);
  }

  /* eslint-disable vars-on-top */
  var headAndPayload = jwt.encoded.header + '.' + jwt.encoded.payload;
  var signature = base64.decodeToHEX(jwt.encoded.signature);

  var alg = jwt.header.alg;
  var kid = jwt.header.kid;

  var aud = jwt.payload.aud;
  var iss = jwt.payload.iss;
  var exp = jwt.payload.exp;
  var nbf = jwt.payload.nbf;
  var tnonce = jwt.payload.nonce || null;
  /* eslint-enable vars-on-top */
  var _this = this;

  if (_this.expectedAlg !== alg) {
    return cb(
      new error.TokenValidationError(
        'Algorithm ' +
          alg +
          ' is not supported. (Expected algs: [' +
          supportedAlgs.join(',') +
          '])'
      ),
      false
    );
  }

  this.getRsaVerifier(iss, kid, function(err, rsaVerifier) {
    if (err) {
      return cb(err);
    }
    if (rsaVerifier.verify(headAndPayload, signature)) {
      if (_this.issuer !== iss) {
        return cb(
          new error.TokenValidationError('Issuer ' + iss + ' is not valid.'),
          false
        );
      }

      if (_this.audience !== aud) {
        return cb(
          new error.TokenValidationError('Audience ' + aud + ' is not valid.'),
          false
        );
      }

      if (tnonce !== nonce) {
        return cb(
          new error.TokenValidationError('Nonce does not match.'),
          false
        );
      }

      var expirationError = _this.verifyExpAndNbf(exp, nbf); // eslint-disable-line vars-on-top

      if (expirationError) {
        return cb(expirationError, false);
      }
      return cb(null, jwt.payload);
    }
    return cb(new error.TokenValidationError('Invalid signature.'));
  });
};

/**
 * Verifies that the `exp` and `nbf` claims are valid in the current moment.
 *
 * @method verifyExpAndNbf
 * @deprecated Please use verify() instead
 * @param {String} exp value of `exp` claim
 * @param {String} nbf value of `nbf` claim
 * @return {boolean} if token is valid according to `exp` and `nbf`
 */
IdTokenVerifier.prototype.verifyExpAndNbf = function(exp, nbf) {
  console.warn(
    'This method is deprecated and will be removed in the next major version'
  );

  var now = new Date();
  var expDate = new Date(0);
  var nbfDate = new Date(0);

  if (this.__disableExpirationCheck) {
    return null;
  }

  expDate.setUTCSeconds(exp + this.leeway);

  if (now > expDate) {
    return new error.TokenValidationError('Expired token.');
  }

  if (typeof nbf === 'undefined') {
    return null;
  }
  nbfDate.setUTCSeconds(nbf - this.leeway);
  if (now < nbfDate) {
    return new error.TokenValidationError(
      'The token is not valid until later in the future. ' +
        'Please check your computed clock.'
    );
  }

  return null;
};

/**
 * Verifies that the `exp` and `iat` claims are valid in the current moment.
 *
 * @method verifyExpAndIat
 * @deprecated Please use verify() instead
 * @param {String} exp value of `exp` claim
 * @param {String} iat value of `iat` claim
 * @return {boolean} if token is valid according to `exp` and `iat`
 */
IdTokenVerifier.prototype.verifyExpAndIat = function(exp, iat) {
  console.warn(
    'This method is deprecated and will be removed in the next major version'
  );

  var now = new Date();
  var expDate = new Date(0);
  var iatDate = new Date(0);

  if (this.__disableExpirationCheck) {
    return null;
  }

  expDate.setUTCSeconds(exp + this.leeway);

  if (now > expDate) {
    return new error.TokenValidationError('Expired token.');
  }

  iatDate.setUTCSeconds(iat - this.leeway);

  if (now < iatDate) {
    return new error.TokenValidationError(
      'The token was issued in the future. Please check your computed clock.'
    );
  }
  return null;
};

IdTokenVerifier.prototype.getRsaVerifier = function(iss, kid, cb) {
  var _this = this;
  var cachekey = iss + kid;

  if (!this.jwksCache.has(cachekey)) {
    jwks.getJWKS(
      {
        jwksURI: this.jwksURI,
        iss: iss,
        kid: kid
      },
      function(err, keyInfo) {
        if (err) {
          return cb(err);
        }
        _this.jwksCache.set(cachekey, keyInfo);
        return cb(null, new RSAVerifier(keyInfo.modulus, keyInfo.exp));
      }
    );
  } else {
    var keyInfo = this.jwksCache.get(cachekey); // eslint-disable-line vars-on-top
    cb(null, new RSAVerifier(keyInfo.modulus, keyInfo.exp));
  }
};

/**
 * @typedef DecodedToken
 * @type {Object}
 * @property {Object} header - content of the JWT header.
 * @property {Object} payload - token claims.
 * @property {Object} encoded - encoded parts of the token.
 */

/**
 * Decodes a well formed JWT without any verification
 *
 * @method decode
 * @param {String} token decodes the token
 * @return {DecodedToken} if token is valid according to `exp` and `nbf`
 */
IdTokenVerifier.prototype.decode = function(token) {
  var parts = token.split('.');
  var header;
  var payload;

  if (parts.length !== 3) {
    return new error.TokenValidationError('Cannot decode a malformed JWT');
  }

  try {
    header = JSON.parse(base64.decodeToString(parts[0]));
    payload = JSON.parse(base64.decodeToString(parts[1]));
  } catch (e) {
    return new error.TokenValidationError(
      'Token header or payload is not valid JSON'
    );
  }

  return {
    header: header,
    payload: payload,
    encoded: {
      header: parts[0],
      payload: parts[1],
      signature: parts[2]
    }
  };
};

/**
 * @callback validateAccessTokenCallback
 * @param {Error} [err] error returned if the validation cannot be performed
 * or the token is invalid. If there is no error, then the access_token is valid.
 */

/**
 * Validates an access_token based on {@link http://openid.net/specs/openid-connect-core-1_0.html#ImplicitTokenValidation}.
 * The id_token from where the alg and atHash parameters are taken,
 * should be decoded and verified before using thisfunction
 *
 * @method validateAccessToken
 * @param {String} access_token the access_token
 * @param {String} alg The algorithm defined in the header of the
 * previously verified id_token under the "alg" claim.
 * @param {String} atHash The "at_hash" value included in the payload
 * of the previously verified id_token.
 * @param {validateAccessTokenCallback} cb callback used to notify the results of the validation.
 */
IdTokenVerifier.prototype.validateAccessToken = function(
  accessToken,
  alg,
  atHash,
  cb
) {
  if (this.expectedAlg !== alg) {
    return cb(
      new error.TokenValidationError(
        'Algorithm ' +
          alg +
          ' is not supported. (Expected alg: ' +
          this.expectedAlg +
          ')'
      )
    );
  }
  var sha256AccessToken = sha256(accessToken);
  var hashToHex = cryptoHex.stringify(sha256AccessToken);
  var hashToHexFirstHalf = hashToHex.substring(0, hashToHex.length / 2);
  var hashFirstHalfWordArray = cryptoHex.parse(hashToHexFirstHalf);
  var hashFirstHalfBase64 = cryptoBase64.stringify(hashFirstHalfWordArray);
  var hashFirstHalfBase64SafeUrl = base64.base64ToBase64Url(
    hashFirstHalfBase64
  );
  if (hashFirstHalfBase64SafeUrl !== atHash) {
    return cb(new error.TokenValidationError('Invalid access_token'));
  }
  return cb(null);
};

export default IdTokenVerifier;
