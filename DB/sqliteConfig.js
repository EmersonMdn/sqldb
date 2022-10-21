const connection = {
  client: "sqlite3", // or 'better-sqlite3'
  connection: {
    filename: "./DB/mydb.sqlite",
  },
  useNullAsDefault: true,
};

module.exports = connection;
