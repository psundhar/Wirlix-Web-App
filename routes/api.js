const router = require('express').Router();
const jsonErrorResponse = require('../middleware/jsonErrorResponse');
const DebatesController = require('../controllers/DebatesController');
const TopicsController = require('../controllers/TopicsController');
const StatementsController = require('../controllers/StatementsController');
const ChallengesController = require('../controllers/ChallengesController');
const ImagesController = require('../controllers/ImagesController');

router.get('/debates', DebatesController.getCollection);
router.get('/debates/my', DebatesController.getMyDebates);
router.get('/debates/:id', DebatesController.getObject);
router.post('/debates', DebatesController.postCollection);
router.put('/debates/:id', DebatesController.putObject);
router.delete('/debates/:id', DebatesController.deleteObject);
router.get('/topics', TopicsController.getCurrent);

router.post('/statements', StatementsController.postCollection);
router.put('/statements/:id', StatementsController.putObject);

router.post('/challenges', ChallengesController.postCollection);
router.put('/challenges/:id', ChallengesController.putObject);

router.get('/notifications', ChallengesController.getNotifications);

router.post('/images/:id', ImagesController.postCollection);

router.use('*', jsonErrorResponse);

module.exports = router;