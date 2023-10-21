const _ = require("lodash");
const moment = require("moment");
const bcrypt = require("bcryptjs");
const apiutils = require("./../routes/apiutils");
const BaseModel= require("./BaseModel");
const fs = require("fs");
const path = require("path");

class UserModel extends BaseModel {
  table = "users";
  pageLimit = 10;

  checkLogin(data) {
    let ret = {
      success: false,
      message: "Login failed: Invalid User credentials entered!",
    };
    let sqlQuery = `SELECT *  FROM users WHERE email = ? LIMIT 1`;

    return new Promise((resolve, reject) => {
      this.db.run(sqlQuery, [data.username]).then((res) => {
        if (res.length === 1) {
          if (bcrypt.compareSync(data.password, res[0]["password"])) {
            const ret = {
              success: true,
              message: "Login successful!",
              token: apiutils.genToken({
                id: res[0].id,
                validTill: moment().add(1, "hours").unix(),
              }),
            };
            resolve(ret);
          } else {
            resolve(ret);
          }
        } else {
          resolve(ret);
        }
      });
    });
  }
  

  buildWhereClause(attrs) {
    if (_.get(attrs, "where", false)) {
      return super.buildWhereClause(attrs);
    } else {
      attrs.sql += ` WHERE ${this.pk} <> 1`;
      return attrs;
    }
  }

  add(data) {
    const origpass = data.password;
    let roleName = null;
    data.password = bcrypt.hashSync(data.password, 8); //== encrypt the password
    // data.rbac = "[]";
    data.active = 1;

    return this.checkUnique("email", data.email)
      .then(() => super.add(data))
      .then((res) => {
        if (res.success) {   
          return res;
        } else {
          const error = new Error("Duplicate Entry");
          error.response = res; // Attach the response data to the error object
          throw error; 
        }
      })
      .catch((error) => {
        throw error; // Rethrow the error to be caught in the frontend
      });;
  }

  checkUnique(fld, val, id = 0) {
    return this.db.run(`SELECT id FROM ${this.table} WHERE ${fld}=? AND ${this.pk}<>?`, [val, id]).then((res) => {
      if (_.get(res, "length", 0) > 0) {
        throw { message: `This is a duplicate entry for ${fld} ${val} Aborting..` };
      }
      return true;
    });
  }

}

module.exports = UserModel;