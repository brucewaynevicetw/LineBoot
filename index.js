var linebot = require('linebot');
var express = require('express');
var path = require('path');
 
var bot = linebot({
    channelId: '1578092539',
    channelSecret: '139bf2744c85557724b4057606420401',
    channelAccessToken: 'xHTG9eBfo/ek26WZ3GXNcp5FtSxZ1wO7NgO/Z2P1r+DXpgNhiQsy1tow3oU5qChcniTZtryOHJh0zq4JPIe4TllMlFgqbGHVjqAEz84qen8rCI5TYz/7PMLGL2C2KbdS1vK7b5QncLrs4Jz79olgnwdB04t89/1O/w1cDnyilFU='
});
 
var message = {
    	"你好":"哈囉~需要甚麼服務?",
	"請問":"有什麼我能幫忙你的？ 請打xxxxxxxx電話聯絡我",
	"你是誰":"我是旅遊助手企毛",
	"早安":"早阿~祝您有美好一天!",
	"嗨":"哈囉~您好 ! ",
};

 
 
bot.on('message', function (event) {
    var respone;
    if(message[event.message.text]){
        respone = message[event.message.text];
    }else{
        respone = '我不懂你說的 「'+event.message.text+'」';
    }
    console.log(event.message.text + ' -> ' + respone);
    bot.reply(event.replyToken, respone);
});

bot.on('beacon', function (event) {
    console.log('beacon: ' + event.beacon.type);
    var respone;
    switch(event.beacon.type){
        case 'enter':
            respone = '您目前位置所在是集合地點';
            break;
        case 'leave':
            respone = '您已經脫隊了 ! 請盡快聯絡導遊';
            break;
        default:
            respone = '我壞掉了';
    }
    bot.reply(event.replyToken, respone);
});


const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);
 
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});
