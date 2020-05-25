const router = require("express").Router();
const User = require("../model/User");

router.get('/', async (req, res, next) => {
	User.find({}, function(err, result){
		if(err) {
			next(err);
		} else {
			res.json({ status: "Success", data: { data: result }, message: "Records Found!!!" });
		}
	});
});

router.get('/:id', async (req, res, next) => {
	User.findOne({_id: req.params.id}, function(err, result){
		if(err) {
			next(err);
		} else {
			res.json({ status: "Success", data: { data: result }, message: "Records Found!!!" });
		}
	});
});

module.exports = router;