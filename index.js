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
    if (this.isCreated) {
      console.log("tabla ya creada!!!");
    } else {
      await this.Knex.schema
        .createTable(this.table, (tabla) => {
          tabla.increments("id");
          tabla.string("autor", 30).notNullable();
          tabla.string("message", 255).notNullable();
          tabla.timestamp("time").defaultTo(knex.fn.now());
        })
        .then(() => console.log("Tabla creada!"))
        .catch((e) => console.log(e))
        .finally(() => {
          this.Knex.destroy();
          this.isCreated = true;
        });
    }
  }

  async getAllMessages() {
    await this.Knex.from(this.table)
      .select("*")
      .then((rows) => {
        console.table(rows);
      })
      .catch((e) => console.log({ error: e, message: e.message }))
      .finally(() => this.Knex.destroy());
  }

  async newMessages(objMessage) {
    await this.Knex.from(this.table)
      .insert(objMessage)
      .then(() => console.log("Nuevo mensaje enviado!"))
      .catch((e) => console.log(e))
      .finally(() => this.Knex.destroy());
  }

  //crear producto
  async newProduct(objProduct) {
    const data = await fs.promises.readFile(
      `${this.file}/products.json`,
      "utf-8"
    );
    const products = JSON.parse(data);
    const id = products.length + 1;

    objProduct.id = id;
    objProduct.likes = [];

    products.push(objProduct);
    const productsString = JSON.stringify(products);
    await fs.promises.writeFile(
      `${this.file}/products.json`,
      productsString,
      "utf-8"
    );
    return products;
  }

  //obtener productos
  async getAllProducts() {
    const data = await fs.promises.readFile(
      `${this.file}/products.json`,
      "utf-8"
    );
    return JSON.parse(data);
  }

  //obtener productos por ID
  async getProductsById(id) {
    const data = await fs.promises.readFile(
      `${this.file}/products.json`,
      "utf-8"
    );
    const products = JSON.parse(data);
    const findProduct = products.find((item) => item.id == id);

    if (findProduct) {
      return findProduct;
    } else {
      throw new Error("Product not found");
    }
  }

  //obtener likes de usuarios
  async getLikesById(id) {
    const data = await fs.promises.readFile(
      `${this.file}/products.json`,
      "utf-8"
    );
    const products = JSON.parse(data);
  }

  //Dar like
  async likeProduct(productId, pageId) {
    // obtener productos
    const data = await this.getAllProducts();

    //filtar productos
    const newData = data.map((product) => {
      if (product.id == productId) {
        return product.likes.push(pageId);
      }
      return product;
    });

    //guardar a la lista
    const dataString = JSON.stringify(newData);
    await fs.promises.writeFile(
      `${this.file}/products.json`,
      dataString,
      "utf8"
    );
    return newData;
  }
  async createPage(pageObj) {
    const data = await fs.promises.readFile(`${this.file}/pages.json`, "utf-8");
    const pages = JSON.parse(data);

    //generate id
    const id = pages.length + 1;
    pageObj.id = id;

    //add new page
    pages.push(pageObj);
    // console.log(pages);
    const pagesString = JSON.stringify(pages);
    await fs.promises.writeFile(
      `${this.file}/pages.json`,
      pagesString,
      "utf-8"
    );

    return pages;
  }
  async getAllPages() {
    try {
      const data = await fs.promises.readFile(
        `${this.file}/pages.json`,
        "utf-8"
      );
      const pages = JSON.parse(data);
      return pages;
    } catch (err) {
      return [];
    }
  }
}

// async function start() {
//   const db = new Product("data");
//   const products = await db.newProduct({
//     title: "Pizza peperoni",
//     price: 132,
//     thumbnail: "www.examples.com/products/jabon",
//   });

// }

module.exports = Product;
