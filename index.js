var linebot = require('linebot');
var express = require('express');
var path = require('path');
 
var bot = linebot({
    channelId: '1578092539',
    channelSecret: '139bf2744c85557724b4057606420401',
    channelAccessToken: '/st2B07Qjl17t28/By1Yt1EQ50nMP4g5YJe0xnq46WYWBK3XLtdUKV49dSr+VJqUniTZtryOHJh0zq4JPIe4TllMlFgqbGHVjqAEz84qen+OHEzGXh2wHHoZ6nAiX5meqd9DIBHQ573L4sD21YFBigdB04t89/1O/w1cDnyilFU='
});
 
var message = {
    "你好":"我好",
    "你是誰":"我人"
};
 
bot.on('message', function (event) {
    var respone;
    if(message[event.message.text]){
        respone = message[event.message.text];
    }else{
        respone = '我不懂你說的 ['+event.message.text+']';
    }
    console.log(event.message.text + ' -> ' + respone);
    bot.reply(event.replyToken, respone);
});

bot.on('beacon', function (event) {
    console.log('beacon: ' + event.beacon.type);
    var respone;
    switch(event.beacon.type){
        case 'enter':
            respone = '你進入教室';
            break;
        case 'leave':
            respone = '你離開教室';
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