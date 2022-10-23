// Importamos la librería node-telegram-bot-api 
const usarCtrl= {};
const TelegramBot = require('node-telegram-bot-api');

usarCtrl.enviarMsj= (telegramIDS,unidades,nombre) => {
// Creamos una constante que guarda el Token de nuestro Bot de Telegram que previamente hemos creado desde el bot @BotFather
    const bot = new TelegramBot('5691256241:AAH5L_3KHYJWeNQuK03fKNovKR3cd0_oKR0',{polling: true});
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