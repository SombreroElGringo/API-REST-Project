/**
 * Middleware check if the token & timestamp is valid
 */

exports.middleware = (req, res, next) => {

    let token = req.query.token || req.headers['x-access-token'];
    let timestamp = req.query.timestamp || req.headers['x-timestamp'];

    if(!token || !timestamp) {
        let err = new Error('Bad Request: token or timestamp missing!');
        err.status = 400;
        return next(err);
    } else {
        if(this.tokenIsValid(token) & this.timestampIsValid(timestamp)) {
            return next();
        } else {
            let err = new Error('Bad Request: token or timestamp is not valid!');
            err.status = 400;
            return next(err);
        }
    }
}

/**
 * Check if the token from the request is valid
 */

exports.tokenIsValid = (token) => {
    return true;
}

/**
 * Check if the timestamp from the request is valid
 */

exports.timestampIsValid = (timestamp) => {
    return true;
}
