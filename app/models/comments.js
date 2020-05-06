const sql = require("./database.js");

// constructor
const Comment = function(comment) {
  this.body = comment.body;
};


// Create Comments
Comment.create = (newComment, result) => {
  sql.query("INSERT INTO comments SET ?", newComment, (err, res) => {
    if (err) {
      console.log("Create Comment error: ", err);
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newComment });
  });
};


// Get all Comments
Comment.getAll = result => {
  sql.query("SELECT * FROM comments", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

// Get a single comment
Comment.findById = (commentId, result) => {
  sql.query(`SELECT * FROM comments WHERE id = ${commentId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};


Comment.updateById = (commentId, comment, result) => {
  sql.query(
    `UPDATE comments SET body = "${comment.body}" WHERE id = ${commentId}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Comment with the id
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { id: commentId, ...comment });
    }
  );
};


// delete a single Comment
Comment.remove = (commentId, result) => {
  sql.query("DELETE FROM comments WHERE id = ?", commentId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    result(null, res);
  });
};

// delete all comments
Comment.removeAll = result => {
  sql.query("TRUNCATE table comments", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};


module.exports = Comment;
