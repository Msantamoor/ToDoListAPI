var express = require('express');
var router = express.Router();
var taskDal = require('/Users/morgansantamoor/Helio/Projects/server/taskDAL.js');

router.get('/*', function (req, res, next) {
    taskDal.testConnection()
    res.send('success');
});



module.exports = router;