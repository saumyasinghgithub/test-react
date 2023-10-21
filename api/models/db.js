const mysql = require('mysql');
const cfg = require('dotenv');
const path = require('path');
cfg.config({path: path.join(__dirname,'..','.env')});

class DB {

  conObj = null;

  connect(){

    return new Promise((resolve,reject) => {

      if(this.conObj){   
     //this.conObj.connect();
        resolve();
      }else{
        this.conObj = mysql.createConnection({
          host: process.env.DB_HOST,
          port:process.env.DB_PORT,
          user: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: process.env.DB_NAME     
        });
    
        this.conObj.connect();
        resolve();
        
      }
    });
  }

  disconnect(){
    this.conObj.end();
    this.conObj = null;
  }

  run(query,params=[]){

    return new Promise((resolve, reject) => {

      this.connect()
        .then( () => {
          this.conObj.query(query,params,(err,res) => {                        
            if(!err){
              resolve(res); // all ok
            }else{
              console.log(`Query failed with error: ${err}`);              
              reject(err); // query failed
            }
          });
        
      
        })
        .catch(reject)// connection failed
    });

  }
  
}

module.exports = (new DB());