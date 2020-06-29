const sqlite = require('sqlite3');
const db = new sqlite.Database('./data/comments.db');
const { app } = require('./lib/routes');

const getCreateQuery = () =>
  `CREATE TABLE IF NOT EXISTS comments (name varchar(20), comment varchar(100), date date)`;

const main = function (port) {
  db.serialize(() => {
    db.run(getCreateQuery());
    app.locals.db = db;
  });
  app.listen(port, () => console.log('started listening', port));
};

main(+process.argv[2]);
