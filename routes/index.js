const express = require('express');
const router = express.Router();
router.get('/qr/:pnum',(req,res) =>{
       /* db.query('select * from product where pnum = ? order by cnt desc',req.params.pnum,(err,result) =>{
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
        })*/
        res.render('index.ejs')
        console.log('?')
}).get('/map',(req,res)=>{
    res.render('map');
})

module.exports = router;