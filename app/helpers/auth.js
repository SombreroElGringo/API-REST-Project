const crypto = require('crypto');

/**
 * Middleware check if the token & timestamp is valid
 */

exports.middleware = (req, res, next) => {

    let token = req.query.token || req.headers['x-access-token'];
    let timestamp = req.query.timestamp || req.headers['x-timestamp'];

    if(!token || !timestamp) {
        this.apiError('token or timestamp is missing!', 400, next);
    } else {
        if(this.tokenIsValid(token) & this.timestampIsValid(timestamp, next)) {
            return next();
        } else {
            this.apiError('token or timestamp is not valid!', 400, next);
        }
    }
}

/**
 * Check if the token from the request is valid
 * apiToken = f34c5268b72404747c32e602a72b7bda25349ebba7a400e09d925613d7ec6c11
 */

exports.tokenIsValid = (token) => {
    let apiToken = crypto.createHmac('sha256', process.env.SECRET_KEY)
                         .update(process.env.HASH_KEY)
                         .digest('hex');
    return apiToken === token ? true : this.apiError('token is not valid!', 400, next);
}

/**
 * Check if the timestamp from the request is valid
 */

exports.timestampIsValid = (timestamp, next) => {
    if(!isNaN(timestamp)) {
        let difference = Math.floor(Date.now() / 1000) - timestamp;
        return (difference > -10 && difference < 10) ? true : this.apiError('timestamp is not valid!', 400, next);
    } else {
        this.apiError('timestamp type is not valid!', 400, next)
    }
}

exports.apiError = (message, status, next) => {
    let err = new Error('Bad Request: '+message);
    err.status = status;
    return next(err);
}
