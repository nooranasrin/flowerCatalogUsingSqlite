const fs = require('fs');
const Comment = require('./comment');

const { loadTemplate } = require('./loadTemplate');

const createCommentSql = function (comment) {
  return `insert into comments  VALUES('${comment.name}', '${comment.comment}', date('now'))`;
};

const serveCommentsLog = function (request, response, next) {
  request.db = request.app.locals.db;
  request.db.all('select * from comments', (err, comments) => {
    if (!err) {
      request.totalComments = comments;
    }
    next();
  });
};

const serveGuestBook = function (request, response) {
  let tableHtml = request.totalComments;
  tableHtml = tableHtml.map(
    (comment) => new Comment(comment.name, comment.comment, comment.date)
  );
  tableHtml = tableHtml.map((comment) => comment.toHTML());
  let body = fs.readFileSync(`${__dirname}/../templates${request.url}`);
  body = loadTemplate('guestBook.html', { FEEDBACK: tableHtml.join('') });
  response.end(body);
};

const saveCommentsAndRedirect = function (request, response) {
  const sql = createCommentSql(request.body);
  request.db.run(sql);
  response.redirect('/guestBook.html');
};

module.exports = { serveGuestBook, saveCommentsAndRedirect, serveCommentsLog };
