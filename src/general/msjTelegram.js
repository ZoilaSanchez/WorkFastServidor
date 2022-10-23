// Importamos la librería node-telegram-bot-api 
const usarCtrl= {};
const TelegramBot = require('node-telegram-bot-api');

usarCtrl.enviarMsj= (telegramIDS,unidades,nombre) => {
// Creamos una constante que guarda el Token de nuestro Bot de Telegram que previamente hemos creado desde el bot @BotFather
var bot = new TelegramBot(process.env.TELEGRAM,{polling: true});
console.log("proceso enviado ..............")
console.log(telegramIDS)
console.log("enviamos..................")
    for (var i = 0; i < telegramIDS.length; i++) {
        console.log("Enviando a - ",telegramIDS[i]["chatId"])
        var chatTelegram = telegramIDS[i]["chatId"]
        bot.sendMessage(chatTelegram, "Realiza el pedido del producto *" + nombre + "*. En existencias se tienen "+ unidades+".");
    }
bot.close

}
 module.exports = usarCtrl;