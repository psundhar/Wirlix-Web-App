const router = require('express').Router();

const DebatesController = require('../controllers/DebatesController');
const TopicsController = require('../controllers/TopicsController');


/**
 * Middleware that intercepts response status code and attach an error payload
 * @param req
 * @param res
 */
const errorResponse = function errorResponse(req, res) {
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

router.get('/debates', DebatesController.getCollection);
router.get('/debates/my', DebatesController.getMyDebates);
router.post('/debates', DebatesController.postCollection);
router.put('/debates/:id', DebatesController.putObject);
router.delete('/debates/:id', DebatesController.deleteObject);
router.get('/topics', TopicsController.getCurrent);

router.use('*', errorResponse);

module.exports = router;