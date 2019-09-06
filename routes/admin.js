const express = require('express');
const router = express.Router();
const db = require('../db/connection')

router.get('/makeQR',(req,res) =>{
    db.query('select * from ')
    res.render('makeQR',{
        url
    });
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
})

module.exports = router;