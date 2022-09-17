// Importamos la librería node-telegram-bot-api 
const usarCtrl= {};
const TelegramBot = require('node-telegram-bot-api');

 usarCtrl.enviarMsj= (telegramIDS,msj) => {
// Creamos una constante que guarda el Token de nuestro Bot de Telegram que previamente hemos creado desde el bot @BotFather
const token = process.env.TELEGRAM;
const bot = new TelegramBot(token, {polling: true});
console.log("proceso enviado ..............")
    
    
    for (var i = 0; i < telegramIDS.length; i++) {
        console.log("Enviando a - ",telegramIDS[i]["chatId"])
        var chatTelegram = telegramIDS[i]["chatId"]
        bot.sendMessage(chatTelegram, "Realizar pedido de " + msj + ". Se llego al limite del inventario.");
    }
    bot.close

}



 module.exports = usarCtrl;