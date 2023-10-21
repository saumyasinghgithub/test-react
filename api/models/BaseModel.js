const _ = require("lodash");
const DBObject = require("./DB");

class BaseModel {
  db = null;
  pk = "id";
  table = null;
  sortBy = "id";
  sortDir = "ASC";
  pageLimit = 10;
  updated_at = false;

  constructor() {
    this.db = DBObject;
  }

  buildWhereClause(attrs) {
    if (_.get(attrs, "where", false)) {
      let refine = [];
      _.each(attrs.where, (fldVal, fldName) => {
        refine.push(`${fldName} = ?`);
        attrs.ary.push(fldVal);
      });
      if (refine.length > 0) {
        attrs.refine += ` WHERE ${refine.join(" AND ")}`;
      }
    }
    return attrs;
  }

  find(pkval) {
    return this.db.run(`SELECT * FROM ${this.table} WHERE ${this.pk}=? LIMIT 1`, [pkval]).then((res) => {
      if (res) {
        return { ...res[0] };
      } else {
        throw { message: "No Record found!" };
      }
    });
  }

  findBy({ fname, fvalue }) {
    return this.db.run(`SELECT * FROM ${this.table} WHERE ${fname}=?`, [fvalue]).then((res) => {
      if (res) {
        return res;
      } else {
        throw { message: "No Record found!" };
      }
    });
  }

  list(params) {
    //Fetch users from DB
    let refine = "";
    let ary = [];

    if (_.get(params, "where", false)) {
      const attrs = this.buildWhereClause({ where: params.where, refine: refine, ary: ary });
      refine = attrs.refine;
      ary = attrs.ary;
    }

    if (_.get(params, "whereStr", false)) {
      refine += (refine != "" ? " AND (" : " WHERE (") + params.whereStr + ")";
    }

    let ret = { success: false };
    return this.db
      .run("SELECT COUNT(DISTINCT(" + this.pk + ")) as total FROM " + this.table + refine, ary)
      .then((res) => {
        if (res) {
          ret["pageInfo"] = {
            hasMore: res[0].total - parseInt(_.get(params, "start", 0)) > parseInt(_.get(params, "limit", this.pageLimit)),
            total: res[0].total,
          };
        } else {
          throw { message: "SQL failed!" };
        }
      })
      .then(() => {
        refine += ` ORDER BY ${_.get(params, "sortBy", this.sortBy)} ${_.get(params, "sortDir", this.sortDir)} LIMIT ${parseInt(
          _.get(params, "start", 0)
        )},${parseInt(_.get(params, "limit", this.pageLimit))}`;
        console.log("SELECT " + _.get(params, "fields", "*") + " FROM " + this.table + refine, ary);
        return this.db.run("SELECT " + _.get(params, "fields", "*") + " FROM " + this.table + refine, ary);
      })
      .then((res) => {
        if (res) {
          ret["success"] = true;
          ret["data"] = res;
        } else {
          ret["error"] = "No data found";
        }
        return ret;
      });
  }

  add(data) {
    let sql = "INSERT INTO " + this.table;
    sql += "(" + _.keys(data).join(",") + ") VALUES ( ";
    sql += new Array(_.keys(data).length).fill("?").join(",") + ")";
    return this.db.run(sql, _.values(data)).then((res) => {
      let ret = { success: false };
      if (res) {
        ret["success"] = true;
        if (data.type === "event") {
          ret["message"] = "Thank you for registering!";
        } else {
          ret["message"] = "Welcome aboard, now you are a part of our resuscitation movement!";
        }
        ret["insertId"] = res.insertId;
      } else {
        ret["error"] = "Failed to add Record.";
      }
      return ret;
    });
  }

  edit(data, pkval = "") {
    let sql = `UPDATE ${this.table} SET`;

    sql += _.keys(data)
      .map((k) => ` ${k} = ?`)
      .join(",");

    let ary = _.values(data);

    if (this.updated_at) {
      sql += ",updated_at = NOW()";
    }

    if (pkval != "") {
      sql += ` WHERE ${this.pk} = ?`;
      ary.push(pkval);
    }
    return this.db.run(sql, ary).then((res) => {
      let ret = { success: false };
      if (res) {
        ret["success"] = true;
        ret["message"] = "Record updated";
      } else {
        ret["error"] = "Failed to update Record.";
      }
      return ret;
    });
  }

  delete(pkval) {
    let whereParams = {};
    whereParams[this.pk] = pkval;
    return this.deleteWhere(whereParams);
  }

  deleteWhere(whereParams) {
    let sql = `DELETE FROM ${this.table} WHERE ${_.keys(whereParams).join(`=? AND `)}=?`;
    return this.db.run(sql, _.values(whereParams)).then((res) => {
      let ret = { success: false };
      if (res.affectedRows > 0) {
        ret["success"] = true;
        ret["message"] = `${res.affectedRows} Record(s) deleted`;
      } else {
        ret["error"] = "Failed to delete Record.";
      }
      return ret;
    });
  }

  recordCount(table = this.table, where = "1=1") {
    let sql = `SELECT count(*) as total FROM ${table} WHERE ${where}`;
    return this.db
      .run(sql)
      .then((res) => _.get(res, "0.total", 0))
      .catch(() => 0);
  }
}

module.exports = BaseModel;