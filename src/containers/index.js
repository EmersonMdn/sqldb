const mongoose = require("mongoose");

// mongoose.connect(
//   "mongodb+srv://EmersonMdn:Loque.321@cluster0.0llifr1.mongodb.net/coderhouse?retryWrites=true&w=majority",
//   {
//     serverSelectionTimeoutMS: 5000,
//   }
// );

class MongoContainer {
  constructor(model) {
    this.db = model;
  }

  async getAll() {
    const data = await this.db.find();
    return data;
  }

  async save(newMsg) {
    return await this.db.create(newMsg);
  }
}

module.exports = MongoContainer;
