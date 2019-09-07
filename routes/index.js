const express = require('express');
const router = express.Router();

router.get('/qr/:pnum',(req,res) =>{
       db.query('select * from product where pnum = ? order by cnt desc',req.params.pnum,(err,result) =>{
            if(err) console.log(err);
            db.query('select * from process where pnum = ?',(req.params.pnum),(error,results) =>{
                if(error) console.log(error);
                var url = "http://m.nonghyupmall.com/MC72010R/scRstDelivery.nh?searchTerm_main="+encodeURI(result[0].Cate)+"&chanC=1101/";
                res.render('index',{
                    url,
                    data : results
                })
            })
       })             
})

module.exports = router;