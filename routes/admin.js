const express = require('express');
const router = express.Router();
const db = require('../db/connection')
const moment = require('moment');

router.get('/list',(req,res) => {
    if(req.session.gr === undefined){
        res.redirect('/admin/login')
    }
    else{
        db.query('select * from product where gr = ?',req.session.gr,(err,result) => {
            console.log(result);
            if(err) console.log(err);
            var subject=[];
            var id = [];
            var desc = 1;
            var address = [];
            var categorize = 1;
            for(var i = 0;i<result.length;i++){
                subject.push(result[i].subject);
                id.push(result[i].Pnum);
                address.push(result[i].Addr)
            }
            console.log(subject)
            res.render('list',{
                id,
                subject,
                desc,
                address,
                categorize
            })
        //res.send('아무튼 리스트임')
        })

    }

})

router.get('/makeQR',(req,res) =>{
    /*db.query('select * from process where pnum=?',req.params.pnum,(err,result) =>{
        if(err) console.log(err);
        var url = "http://m.nonghyupmall.com/MC72010R/scRstDelivery.nh?searchTerm_main="+encodeURI(result[0].detail)+"&chanC=1101/"
        res.render('makeQR.ejs',{
            url
        });
    })
    */
    var url = "http://m.nonghyupmall.com/MC72010R/scRstDelivery.nh?searchTerm_main="+encodeURI("쌀")+"&chanC=1101/"
        res.render('makeQR.ejs',{
            url
        });
    
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
})

module.exports = router;