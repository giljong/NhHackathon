var express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.get('/',function(req,res){
  res.render('../list.html')
});

app.listen(3000, "127.0.0.1", () => {
  console.log("connect");
});
