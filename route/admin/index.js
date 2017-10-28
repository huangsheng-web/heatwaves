const express = require("express");
const common = require('../../libs/common');
const mysql = require('mysql');

var db = mysql.createConnection({host:'localhost',user:'root',password:'123456',database:'heatwave'});

createRouter = function(){
  var route = express.Router();
  //检查登录状态
  route.use((req,res,next)=>{

    if(!req.session['admin_id'] && req.url!='/login'){//没有登录
      res.redirect('/admin/login')
    }else{
      next();
    }
  })
  route.get('/login',(req,res)=>{
   res.render('./admin/login.ejs',{})
  })
  route.post('/login',(req,res)=>{
    var username = req.body.username;
    var password = common.md5(req.body.password+common.MD5_suffix);
    db.query(`SELECT * FROM admin_table WHERE username = '${username}'`,(err,data)=>{
      if(err){
        console.error(err);
        res.status(500).send('database error').end();
      }else{
        if(data.length == 0){
          res.status(400).send('no this admin').end();
        }else{
          if(data[0].password == password){
            //成功
            req.session['admin_id'] = data[0].ID;
            res.redirect('/admin/')
          }else{
            res.status(400).send('this password is wrong').end();
          }
        }
      }
    })
  })
  route.get('/',(req,res)=>{
    var con = null;
    db.query(`SELECT * FROM float_table`,(err,data)=>{
      if(err){
        console.error(err);
        res.status('500').send('database err').end()
      }else{
        con = data;
      }
      res.render('./admin/float.ejs',{con});
    })
  });
  route.post('/float',(req,res)=>{
      const content = req.body.content;
      const id = parseFloat(req.body.id)+1;
      db.query(`UPDATE float_table SET content = '${content}' WHERE ID = '${id}'`,(err,data)=>{
          if(err){
            console.error(err);
            res.status('500').send('database err').end();
          }else{
            console.log(data)
          }
      })
  })
  route.get('/banner',(req,res)=>{
    db.query(`SELECT * FROM banner_table`,(err,data)=>{
      if(err){
        console.error(err);
        res.status('500').send('database err').end()
      }else{

      }
      res.render('./admin/banner.ejs',{data})
    })
  });
  route.post('/banner',(req,res)=>{
    const title = req.body.title;
    const description = req.body.description;
    const id = parseFloat(req.body.id)+1;
    console.log(title,id)
    db.query(`UPDATE banner_table SET title = '${title}' , description = '${description}' WHERE ID = '${id}'`,(err,data)=>{
        if(err){
          console.error(err);
          res.status('500').send('database err').end();
        }else{
          console.log(data)
        }
    })
  })
  route.get('/title',(req,res)=>{
    db.query(`SELECT * FROM title_table`,(err,data)=>{
      if(err){
        console.error(err);
        res.status('500').send('database err').end()
      }else{

      }
        res.render('./admin/title.ejs',{data})
    })

  });
  route.post('/title',(req,res)=>{
    const content = req.body.content;
    const id = parseFloat(req.body.id)+1;
    db.query(`UPDATE title_table SET content = '${content}' WHERE ID = '${id}'`,(err,data)=>{
        if(err){
          console.error(err);
          res.status('500').send('database err').end();
        }else{
          console.log(data)
        }
    })
  })
  route.get('/team',(req,res)=>{
    db.query(`SELECT * FROM team_table`,(err,data)=>{
      if(err){
        console.error(err);
        res.status('500').send('database err').end()
      }else{

      }
          res.render('./admin/team.ejs',{data})
    })
  });
  route.get('/project_profile',(req,res)=>{
    db.query(`SELECT * FROM project_profile_table`,(err,data)=>{
      if(err){
        console.error(err);
        res.status('500').send('database err').end()
      }else{

      }
        res.render('./admin/project_profile.ejs',{data})
    })
  });
  route.post('/project_profile',(req,res)=>{
    const title = req.body.title;
    const d1 = req.body.d1;
    const d2 = req.body.d2;
    const id = parseFloat(req.body.id)+1;
    db.query(`UPDATE project_profile_table SET title = '${title}' , description1 = '${d1}', description2 = '${d2}' WHERE ID = '${id}'`,(err,data)=>{
        if(err){
          console.error(err);
          res.status('500').send('database err').end();
        }else{
          console.log(data)
        }
    })
  })
  route.get('/company_profile',(req,res)=>{
    db.query(`SELECT * FROM company_profile_table`,(err,data)=>{
      if(err){
        console.error(err);
        res.status('500').send('database err').end()
      }else{

      }
        res.render('./admin/company_profile.ejs',{data})
    })

  });
  route.post('/company_profile',(req,res)=>{
    const description = req.body.description;
    const id = parseFloat(req.body.id)+1;
    db.query(`UPDATE company_profile_table SET description = '${description}' WHERE ID = '${id}'`,(err,data)=>{
        if(err){
          console.error(err);
          res.status('500').send('database err').end();
        }else{
          console.log(data)
        }
    })
  })
  route.get('/project_introduction',(req,res)=>{
    db.query(`SELECT * FROM project_introduction_table`,(err,data)=>{
      if(err){
        console.error(err);
        res.status('500').send('database err').end()
      }else{

      }
        res.render('./admin/project_introduction.ejs',{data})
    })

  });
  route.post('/project_introduction',(req,res)=>{
    const title = req.body.title;
    const description = req.body.description;
    const id = parseFloat(req.body.id)+1;
    console.log(title,id)
    db.query(`UPDATE project_introduction_table SET title = '${title}' , description = '${description}' WHERE ID = '${id}'`,(err,data)=>{
        if(err){
          console.error(err);
          res.status('500').send('database err').end();
        }else{
          console.log(data)
        }
    })
  })
  route.get('/safe_promise',(req,res)=>{
    db.query(`SELECT * FROM safe_promise_table`,(err,data)=>{
      if(err){
        console.error(err);
        res.status('500').send('database err').end()
      }else{

      }
        res.render('./admin/safe_promise.ejs',{data})
    })
  });
  route.post('/safe_promise',(req,res)=>{
    const title = req.body.title;
    const description = req.body.description;
    const id = parseFloat(req.body.id)+1;
    console.log(title,id)
    db.query(`UPDATE safe_promise_table SET title = '${title}' , description = '${description}' WHERE ID = '${id}'`,(err,data)=>{
        if(err){
          console.error(err);
          res.status('500').send('database err').end();
        }else{
          console.log(data)
        }
    })
  })
  route.get('/puzzled',(req,res)=>{
    db.query(`SELECT * FROM puzzled_table`,(err,data)=>{
      if(err){
        console.error(err);
        res.status('500').send('database err').end()
      }else{

      }
        res.render('./admin/puzzled.ejs',{data})
    })
  });
  route.post('/puzzled',(req,res)=>{
    const title = req.body.title;
    const description = req.body.description;
    const id = parseFloat(req.body.id)+1;
    console.log(title,id)
    db.query(`UPDATE puzzled_table SET category = '${description}' , description = '${title}' WHERE ID = '${id}'`,(err,data)=>{
        if(err){
          console.error(err);
          res.status('500').send('database err').end();
        }else{
          console.log(data)
        }
    })
  })
  route.get('/aboutUs',(req,res)=>{
    db.query(`SELECT * FROM aboutUs_table`,(err,data)=>{
      if(err){
        console.error(err);
        res.status('500').send('database err').end()
      }else{

      }
        res.render('./admin/aboutUs.ejs',{data})
    })
  });
  route.get('/users',(req,res)=>{
    db.query(`SELECT * FROM aboutUs_table`,(err,data)=>{
      if(err){
        console.error(err);
        res.status('500').send('database err').end()
      }else{

      }
        res.render('./admin/users.ejs',{data})
    })
  });


  return route
}


module.exports=createRouter();
