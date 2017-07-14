const router = require('express').Router();
const jsonErrorResponse = require('../middleware/jsonErrorResponse');
const DebatesController = require('../controllers/DebatesController');
const TopicsController = require('../controllers/TopicsController');
const StatementsController = require('../controllers/StatementsController');
const ChallengesController = require('../controllers/ChallengesController');

router.get('/debates', DebatesController.getCollection);
router.get('/debates/my', DebatesController.getMyDebates);
router.post('/debates', DebatesController.postCollection);
router.put('/debates/:id', DebatesController.putObject);
router.delete('/debates/:id', DebatesController.deleteObject);
router.get('/topics', TopicsController.getCurrent);

router.post('/statements', StatementsController.postCollection);
router.put('/statements/:id', StatementsController.putObject);

router.post('/challenges', ChallengesController.postCollection);

router.use('*', jsonErrorResponse);

module.exports = router;