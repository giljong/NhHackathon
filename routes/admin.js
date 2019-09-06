const express = require('express');
const router = express.Router();
const db = require('../db/connection')
const moment = require('moment');

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
        var date = moment().format(YYYY년MM월DD일HH시);
        db.query('insert into product (cnt, addr, group, pnum,checkP) values(?,?,?,?,?)',[result[0].cnt+1, address, req.session.group, req.params.num,date]);
        db.query('update process set group = ? where pnum = ?',[next,req.params.num]);
    })
}).get('/addP',(req,res) => {
    res.render('addP.ejs')  
}).post('/addP',(req,res) =>{
    const {
        next,category,detail
    } = req.body
    var date = moment().format(YYYY년MM월DD일HH시);
    db.query('select * from process order by pnum desc limit 1',(err,result)=> {
        if(err) console.log(err)
        db.query('insert into process (pnum,cate,detail,group) values(?,?,?,?)',[result[0].pnum+1,category,detail,next]);
        db.query('insert into product (group, pnum,addr,cnt,checkP) values (?,?,?,?,?)',[req.session.group,result[0].pnum+1,address,1,date]);
    })
})

module.exports = router;