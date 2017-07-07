/**
 * Middleware that intercepts response status code and attach an error payload
 * @param req
 * @param res
 */
module.exports = function jsonErrorResponse(req, res) {
    var body;

    if(res.statusCode == 400) {
        body = {"error": "Bad request"};
    }
    if(res.statusCode == 404) {
        body = {"error": "Not found"};
    }
    if(res.statusCode >= 500 ) {
        body = {"error": "Server error"};
    }

    if(body) {
        res.send(body);
    }
};

