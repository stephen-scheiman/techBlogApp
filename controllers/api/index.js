const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');


router.use('/comments', commentRoutes);
router.use('/users', userRoutes);
router.use('/posts', postRoutes);


module.exports = router;
