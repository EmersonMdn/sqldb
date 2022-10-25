const fs = require("fs");
const knex = require("knex");

class Product {
  constructor(file, config, table) {
    this.file = file;
    this.Knex = knex(config);
    this.table = table;
    this.isCreated = false;
  }

  //crear tabla
  async createTable() {
    await this.Knex.schema
      .createTable(this.table, (tabla) => {
        tabla.string("autor", 30).notNullable();
        tabla.string("message", 255).notNullable();
        tabla.timestamp("time");
      })
      .then(() => console.log("Tabla creada!"))
      .catch((e) => console.log(e))
      .finally(() => this.Knex.destroy());
  }

  async getAllMessages() {
    await this.Knex.from(this.table)
      .select("*")
      .then((rows) => console.table(rows))
      .catch((e) => console.log({ error: e, message: e.message }))
      .finally(() => this.Knex.destroy());
  }

  async newMessages(objMessage) {
    await this.Knex.from(this.table)
      .insert({ objMessage })
      .then((objMessage) => {
        console.log("Nuevo mensaje enviado!");
        console.log(objMessage);
      })
      .catch((e) => console.log({ error: e, message: e.message }))
      .finally(() => this.Knex.destroy());
  }
}

module.exports = Product;
