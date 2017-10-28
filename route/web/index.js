const express = require("express");
const common = require('../../libs/common');
const mysql = require('mysql');

var db = mysql.createConnection({host:'localhost',user:'root',password:'123456',database:'heatwave'});

createRouter = function(){
  var route = express.Router();

  route.get('/',(req,res)=>{
    var con = {};
      if(req.session['user_id']){
        con['user_id'] = req.session['user_id'];
      }
      db.query(`SELECT * FROM float_table `,(err,data)=>{
        if(err){
          console.error(err);
          res.status('500').send('database err').end()
        }else{
        con['float'] = data;
        }
      })
      db.query(`SELECT * FROM aboutUs_table `,(err,data)=>{
        if(err){
          console.error(err);
          res.status('500').send('database err').end()
        }else{
        con['about'] = data;
        }
      })
      db.query(`SELECT * FROM banner_table `,(err,data)=>{
        if(err){
          console.error(err);
          res.status('500').send('database err').end()
        }else{
        con['banner'] = data;
        }
      })
      db.query(`SELECT * FROM company_profile_table `,(err,data)=>{
        if(err){
          console.error(err);
          res.status('500').send('database err').end()
        }else{
        con['company_profile'] = data;
        }
      })
      db.query(`SELECT * FROM project_profile_table `,(err,data)=>{
        if(err){
          console.error(err);
          res.status('500').send('database err').end()
        }else{
        con['project_profile'] = data;
        }
      })
      db.query(`SELECT * FROM puzzled_table `,(err,data)=>{
        if(err){
          console.error(err);
          res.status('500').send('database err').end()
        }else{
        con['puzzled'] = data;
        }
      })
      db.query(`SELECT * FROM safe_promise_table `,(err,data)=>{
        if(err){
          console.error(err);
          res.status('500').send('database err').end()
        }else{
        con['safe_promise'] = data;
        }
      })
      db.query(`SELECT * FROM title_table `,(err,data)=>{
        if(err){
          console.error(err);
          res.status('500').send('database err').end()
        }else{
        con['title'] = data;
        }
        res.render('./web/index.ejs',{con})
      })

  })
  route.post('/',(req,res)=>{
      var act  = req.body.act;
      if(act =='quit'){
        delete req.session['user_id'];
        res.redirect('/');
      }
  })
  route.get('/login',(req,res)=>{
         res.render('./web/login.ejs',{})
  })
  route.post('/login',(req,res)=>{
        let username = common.md5(req.body.username+common.MD5_suffix);
        let password = common.md5(req.body.password+common.MD5_suffix);
        console.log(req.body.username)
        db.query(`SELECT * FROM user_table WHERE username = '${username}' or personID = '${username}'`,(err,data)=>{
          console.log(data)
          if(err){
            console.error(err);
            res.status('500').send('database err').end();
          }else{
            if(data.length == 0){
              res.status('400').send('no this user').end();
            }else{
              if(data[0].password == password){
                req.session['user_id'] = data[0].chinesename;
                console.log('ok');
                res.redirect('/');
              }else{
                res.status('400').send('password is wrong').end();
              }
            }
          }
        })
  })
  route.get('/reg',(req,res)=>{
         res.render('./web/reg.ejs',{})
  })
  route.post('/reg',(req,res)=>{
        let name = req.body.chinesename;
        let personID = common.md5(req.body.personID+common.MD5_suffix);
        let phone = common.md5(req.body.phone+common.MD5_suffix);
        let password = common.md5(req.body.password+common.MD5_suffix);
        db.query(`SELECT * FROM user_table WHERE username = '${phone}'`,(err,data)=>{
          if(err){
            console.error(err);
            res.status('500').send('database err').end();
          }else {
            if(data.length == 0){
              db.query(`INSERT INTO user_table (ID,username,password,personID,chinesename) VALUES (0,'${phone}','${password}','${personID}','${name}')`,(err,data)=>{
                if(err){
                  console.error(err);
                  res.status('500').send('database err').end();
                }else{
                  console.log('done');
                  res.redirect('/login');
                }
              })
            }else{
              res.status('400').send('this phone has been registered')
            }
          }
        })
  })
  route.get('/risk',(req,res)=>{
         res.render('./web/risk.ejs',{})
  })
  return route
}


module.exports=createRouter();
