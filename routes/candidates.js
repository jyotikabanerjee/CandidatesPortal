var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var candidateSchema = mongoose.Schema({
    email: {type: String, required:true},
    fname: {type: String, required:true}
});

var Candidate = mongoose.model('Candidate', candidateSchema);

router.get('/all', function (req, res) {
    Candidate.find({}, '_id fname email', function(err,docs){
        //console.log(docs);
        res.json(docs);
    });
});


router.post('/', function (req, res) {
    console.log(req.body);
    (new Candidate({
        email: req.body.email,
        fname: req.body.fname
    })).save(function (err,data) {
            /*console.log(err);*/
             console.log(data);
            if (err) {
                res.json(500, { message: 'Could not connect to the database.'});
            } else {
                res.json(200, data);
            }
        });
});



router.get('/:id', function(req,res){
    var i = req.params.id;
    console.log(req.params.id);
    Candidate.find({'_id': ObjectId(i)}, 'id fname email', function(err,docs){
        console.log(docs);
        res.json(docs);
    });
});


module.exports = router;