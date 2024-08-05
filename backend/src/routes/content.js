const express = require('express');
const router = express.Router();
const contentService = require('../services/contentService');
const aiService = require('../services/aiService');

router.post('/generatePostCaptions', aiService.generatePostCaptions);
router.post('/getPostIdeas', aiService.getPostIdeas);
router.post('/createCaptionsFromIdeas', aiService.createCaptionsFromIdeas);
router.post('/saveGeneratedContent', contentService.saveGeneratedContent);
router.get('/getUserGeneratedContents', contentService.getUserGeneratedContents);
router.post('/unSaveContent', contentService.unSaveContent);

module.exports = router;