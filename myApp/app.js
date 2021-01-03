var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();
var bodyparser= require('body-parser');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());



app.get('/',function(req,res){
  res.render('login')
});

app.get('/registration',function(req,res){
  res.render('registration')
});

app.get('/dune',function(req,res){
  res.render('dune')
});

app.get('/fiction',function(req,res){
  res.render('fiction')
});

app.get('/flies',function(req,res){
  res.render('flies')
});

app.get('/grapes',function(req,res){
  res.render('grapes')
});

app.get('/home',function(req,res){
  res.render('home')
});

app.get('/leaves',function(req,res){
  res.render('leaves')
});

app.get('/mockingbird',function(req,res){
  res.render('mockingbird')
});

app.get('/novel',function(req,res){
  res.render('novel')
});

app.get('/poetry',function(req,res){
  res.render('poetry')
});

app.get('/readlist',function(req,res){
  res.render('readlist')
});

app.get('/searchresults',function(req,res){
  res.render('searchresults')
});

app.get('/sun',function(req,res){
  res.render('sun')
});  


app.post('/register',function(req,res){
  var x={user: req.body.username , password: req.body.password };
  if(!fs.existsSync("users.json"))
  {
  var users =new Array();
  var y= JSON.stringify(users);
  fs.writeFileSync("users.json",y);
  }
  var i= fs.readFileSync("users.json");
  var data = JSON.parse(i);
  var flag= false;
  for(var i=0;i<data.length;i++){
      if(data[i].user == x.user){
        flag=true;
        res.render('alertRegistration');
        break;
    }
  } 
  if(flag==false){
    data.push(x);
    var y=JSON.stringify(data);
    fs.writeFileSync("users.json",y);
    res.render('home');
}});


app.post('/',function(req,res){
  var x={user: req.body.username , password: req.body.password };
  var y= fs.readFileSync("users.json");
  var data = JSON.parse(y);
  var userexists= false;
  for(var i=0;i<data.length;i++){
    if(data[i].user==x.user){
      userexists=true;
      if(data[i].password==x.password){
        res.render('home');
        break;
      }
      else {
        res.render('alertPassword');
      }
    }
  }
  if(userexists==false){
    res.render('alertLoginUsername');
  }
});

if(process.env.port){
  app.listen(process.env.port,function(){console.log('server started')});

}
else{
  app.listen(3000,function(){console.log('server started on port 3000')});
}


