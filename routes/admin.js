const express = require('express');
const router = express.Router();
const db = require('../db/connection')
const moment = require('moment');

router.get('/list',(req,res) => {
    if(req.session.gr === undefined){
        res.redirect('/admin/login')
    }
    else{
        db.query('select * from process where gr = ?',req.session.gr,(err,result) => {
            if(err) console.log(err);
            var subject=[];
            var id = [];
            var desc = 1;
            var address = [];
            var categorize = 1;
            for(var i = 0;i<result.length;i++){
                subject.push(result[i].Cate);
                id.push(result[i].Pnum);
                address.push(result[i].Addr)
            }
            data = {
                id,
                subject,
                desc,
                address,
                categorize
            }
            res.render('list',{
                data
            })
        })

    }

})

router.get('/makeQR',(req,res) =>{
    /*db.query('select * from product where Pnum = ?',req.params.num,(err,result) =>{
        if(err) console.log(err);
        if(result.length === 0)
            res.redirect('/admin/list');
        else{
            var date = moment().format("YYYY/MM/DD/HH시");
            var url = "http://54.249.42.17:3000/"+req.params.num;
            db.query('insert into product (cnt, addr, gr, pnum,checkP) values(?,?,?,?,?)',[2, "농협", req.session.gr, req.params.num,date])
            res.render('makeQR.ejs',{
                url : url
            })
            console.log(2222)
        }*/
        var url = "http://54.249.42.17:3000/2"
        res.render('makeQR.ejs',{
                url : url
        })
    
}).post('/login',(req,res) =>{
    db.query('select * from users where id = ? and pw = ?',[req.body.id,req.body.pw],(err,result) =>{
        if(err) console.log(err);
        if(result.length === 0)
            res.send('<script type="text/javascript">alert("로그인 실패");window.location.href = "/admin/login";</script>');
        else{
            req.session.gr = result[0].Gr;
            req.session.save(() => {
                res.send('<script type="text/javascript">alert("로그인 성공!");window.location.href = "/admin/list";</script>');
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
        var date = moment().format('YYYY/MM/DD/HH시');
        db.query('insert into product (cnt, addr, gr, pnum,checkP) values(?,?,?,?,?)',[result[0].cnt+1, address, req.session.gr, req.params.num,date]);
        db.query('update process set gr = ? where pnum = ?',[next,req.params.num]);
    })  
}).post('/addP',(req,res) =>{
    const {
        nexcom,subject,address
    } = req.body.data;
    db.query('select * from process order by pnum desc',(err,result)=> {
        if(err) console.log(err)
        var date = moment().format('YYYY/MM/DD/HH시');
        var pnum = result[0].Pnum + 1;
        db.query('insert into process (pnum,cate,gr) values(?,?,?)',[pnum,subject,nexcom]);
        db.query('insert into product (gr, pnum,addr,cnt,checkP) values (?,?,?,?,?)',[req.session.gr,pnum,address,1,date]);
        res.send('<script type="text/javascript">alert("등록 성공!");window.location.href = "/admin/list";</script>');
    })
}).get('/login',(req,res) =>{
    res.render('login')
}).post('/search',(req,res) => {
    var url = '/admin/'+req.body.search+'/makeQR';
    console.log(url)
    res.render('search',{
        url
    });
})

module.exports = router;