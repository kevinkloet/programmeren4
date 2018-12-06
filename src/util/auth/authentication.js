const settings = require('../../config/config');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const ApiError = require('../../models/apierror.model')

module.exports = {
    encodeToken(username) {
        const payload = {
            exp: moment().add(10, 'days').unix(),
            iat: moment().unix(),
            sub: username
        }

        return jwt.sign(payload, settings.secretkey);
    },

    decodeToken(token, callback) {
        jwt.verify(token, settings.secretkey, (err, decoded) => {
            if (err) {
                const error = new ApiError(err.message, 401);
                return callback(error);
            }


        });
    }
}