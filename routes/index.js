const express = require('express');
const router = express.Router();
router.get('/:pnum',(req,res) =>{
    if(req.params.pnum === undefined)
        res.render("404.ejs");
    else{
        db.query('select * from process where pnum = ? order by cnt desc',req.params.pnum,(err,result) =>{
            if(err) console.log(err);
            res.render('index',{
                result
            })
        })
    }
})

module.exports = router;