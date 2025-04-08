const express = require('express');
const auth = require('../../middelwares/auth');
const meetng = require('./meeting')

const router = express.Router();

router.get('/', auth, meetng.index)
router.post('/add', auth, meetng.add)
router.get('/view/:id', auth, meetng.view)
router.delete('/delete/:id', auth, meetng.deleteData)
router.post('/deleteMany', auth, meetng.deleteMany)

module.exports = router