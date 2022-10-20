const { Schema, model } = require('mongoose')


const telegramSchema = new Schema({
  //campos
  chatId: {
    type: String
  },
  rol:{
    type: Number 
  }
},
  {
    timestamps: true,
  }
);

module.exports = model("Telegram", telegramSchema);