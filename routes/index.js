const express = require('express');
const router = express.Router();
router.get('/:pnum',(req,res) =>{
    /*if(req.params.pnum === undefined)
        res.render("404.ejs");
    else{
        db.query('select * from product where pnum = ? order by cnt desc',req.params.pnum,(err,result) =>{
            if(err) console.log(err);
            db.query('select * from process where pnum = ?',(req.params.pnum),(error,results) =>{
                if(error) console.log(error);
                var url = "http://m.nonghyupmall.com/MC72010R/scRstDelivery.nh?searchTerm_main="+result[0].detail+"&chanC=1101"
                request.get({url : url},(err,res,body) =>{
                    res.render('index',{
                        result,
                        body
                    })
                })
            })
        })
    }
    */
})

module.exports = router;