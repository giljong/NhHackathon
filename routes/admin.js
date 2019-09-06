const express = require('express');
const router = express.Router();
const db = require('../db/connection')

router.get('/:num/detail/makeQR',(req,res) =>{
    db.query('select * from process where pnum=?',req.params.pnum,(err,result) =>{
        if(err) console.log(err);
        var url = "http://m.nonghyupmall.com/MC72010R/scRstDelivery.nh?searchTerm_main="+encodeURI(result[0].detail)+"&chanC=1101/"
        res.render('makeQR.ejs',{
            url
        });
    })
}).get('/',(req,res) => {
    if(req.session.user === undefined){
        res.render('login')
    }
    else{
        db.query('select * from product where group = ?',req.session.group,(err,result) => {
            if(err) console.log(err);
            res.render('admin',{
                result
            })
        })
    }

}).post('/login',(req,res) =>{
    db.query('select * from users where id = ? and pw = ?',[req.body.id,req.body.pw],(err,result) =>{
        if(err) console.log(err);
        if(result.length === 0)
            res.send('<script type="text/javascript">alert("로그인 실패");window.location.href = "/admin/login";</script>');
        else{
            req.session.group = result[0].group;
            req.session.save(() => {
                res.send('<script type="text/javascript">alert("로그인 성공!");window.location.href = "/admin";</script>');
			})
        }
    })
}).get('/detail/:num',(req,res) =>{
    if(req.params.num === undefined)
        res.redirect('/admin');
    else{
        res.render('Check.ejs');
    }
}).post('/detail/:num',(req,res) => {
    const {
        next, address
    } = req.body
    db.query('select * from product where pnum = ? order by cnt limit 1',req.params.num,(err,result) =>{
        if(err) console.log(err);
        db.query('insert into product (cnt, addr, group, pnum) values(?,?,?,?)',[result[0].cnt+1, address, req.session.group, req.params.num]);
        db.query('update process set group = ? where pnum = ?',[next,req.params.num]);
    })
})

module.exports = router;