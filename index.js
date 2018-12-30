const サイコロ = ['http://urx2.nu/MkU7'
                 ,'http://urx2.nu/MkUf'
                 ,'http://urx2.nu/MkUi'
                 ,'http://urx2.nu/MkUj'
                 ,'http://urx2.nu/MkUn'
                 ,'http://urx2.nu/MkUo'],
Color = '#36393f',
Discord = require("discord.js"), 
client = new Discord.Client(),
config = require("./config.json"),
 fs = require('fs'),　　　　　
weather = require('weather-js'),
request = require("request"),　　
gis = require('g-i-s'),
apiUrl = 'https://api.apigw.smt.docomo.ne.jp/dialogue/v1/dialogue?APIKEY=',
fetch = require("node-fetch"),
API_KEY = process.env.docomoAPI,
che = require('cheerio'),
kuromoji = require('kuromoji'),
Canvas = require('canvas'),　　
Image = Canvas.Image,
hook = new Discord.WebhookClient('512583593927901194', 'AB4iXnqYT2iHMJWRo-z-cHL5IL2hhFjXZOUlxja5VKgns4tFNWoQoxdZ8px8CVdS3ESc'),
Client = require('cheerio-httpcli');
function dateFormat(date) {
  const year = date.getFullYear();
  const month = ('0' + date.getMonth() + 1).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hour = ('0' + date.getHours()).slice(-2);
  const min = ('0' + date.getMinutes()).slice(-2);
  const sec = ('0' + date.getSeconds()).slice(-2);

  return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
}

async function register() {
  const url = `https://api.apigw.smt.docomo.ne.jp/naturalChatting/v1/registration?APIKEY=${API_KEY}`;
  
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      botId: 'Chatting',
      appKind: 'Smart Phone'
    })
  }
  
  const response = await fetch(url, options);
  const json = await response.json();
  const appId = json.appId;
  
  return appId;
}

async function dialogue(appId, voiceText) {
  const url = `https://api.apigw.smt.docomo.ne.jp/naturalChatting/v1/dialogue?APIKEY=${API_KEY}`
  
  const now = new Date();

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      language: 'ja-JP',
      botId: 'Chatting',
      appId: appId,
      voiceText: voiceText,
      appRecvTime: dateFormat(now),
      appSendTime: dateFormat(now)
    })
  }

  const response = await fetch(url, options)
  const json = await response.json();
  const text = json.systemText.expression;
  return text;
}
client.on("message", async message => {
  if(message.author.bot || !message.guild) return;
  if(message.content.indexOf("!tt") !== 0) {
    if(message.channel.name !== "初めて成功したbotとお話ししよう"){
      return;
    } 
  }
  const appId = await register();
  if(message.channel.name !== "初めて成功したbotとお話ししよう"){
    const text = await dialogue(appId,message.content.slice(4));
    message.channel.send(text);
    return;
  } else {
const text = await dialogue(appId,message.content);
message.channel.send(text);
  }
});
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
function sleep(waitSec, callbackFunc) {
 
    // 経過時間（秒）
    var spanedSec = 0;
 
    // 1秒間隔で無名関数を実行
    var id = setInterval(function () {
 
        spanedSec++;
 
        // 経過時間 >= 待機時間の場合、待機終了。
        if (spanedSec >= waitSec) {
 
            // タイマー停止
            clearInterval(id);
 
            // 完了時、コールバック関数を実行
            if (callbackFunc) callbackFunc();
        }
    }, 1000);
 
}
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------
client.on('guildMemberAdd', async message => {
  const channel = message.guild.channels.find(c => c.id === '522692943220310018');
  if (!channel) return;
  function formatDate(date) {
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate();
  const day = '日月火水木金土'.charAt(date.getDay());
  return `${y}年${m}月${d}日 (${day})`;
}
const date = message.user.createdAt;
  let embed = new Discord.MessageEmbed()
  .setTitle(message.user.username + 'が参加しました！')
  .setDescription(`ようこそ${message.user.username}さん、よろしくお願いします！\nこのサーバーの現在の人数は${message.guild.memberCount}人です。\
  \n${formatDate(date)}に作成されたアカウントです。`)
  .setThumbnail(message.user.avatarURL())
  .setColor(Color);
  channel.send(embed);
});
client.on('guildMemberRemove' , async message => {
    const channel = message.guild.channels.find(c => c.id === "522692943220310018");
    if (!channel) return;
    let embed = new Discord.MessageEmbed()
    .setTitle(message.user.username + 'が退出しました')
    .setDescription(`${message.user.username}さん、ご利用ありがとうございました。\nこのサーバーの現在の人数は${message.guild.memberCount}です。`)
    .setThumbnail(message.user.avatarURL())
    .setColor(Color);
    channel.send(embed)
});
client.on('guildBanAdd' , async message => {
  const channel = message.guild.channel.find(c => c.id === "522692943220310018");
  if (!channel) return;
  let embed = new Discord.MessageEmbed()
  .setTitle(message.user.username + 'がBANされました')
  .setDescription(`${message.user.username}さん、一体何をしたんですか........\nこのサーバーの現在の人数は${message.guild.memberCount}です。`)
  .setThumbnail(message.user.avatarURL())
  .setColor(Color);
  channel.send(embed)
});
//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------

// evalコマンド　ほとんど修正いらない
client.on("message", async message => {
  if(message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
if(command === 'eval') {
  if(message.author.id !== config.ownerID){
    message.channel.send(new Discord.MessageEmbed().setColor(Color).setTitle(`${message.author.username}はBotの管理者ではありません。故にevalコマンドを使用できません.`))
  }
     if(message.author.id !== config.ownerID) return;
       try{
       const code = message.content.substr(8, message.content.length);
       message.channel.send(eval(code))
       } catch(e){
        message.react('❌')
         message.reply(e.message)
        return;
       } 
   message.react("✅")
return;
    } if(command === 'calc'){
    if(!message.content.match(/\d+(?=([-+*/]))/)) return;
      const code = message.content.substr(8, message.content.length);
      message.channel.send(eval(code));
    }
  });
//------------------------------------------------------------------------------------------------------------
/*var goji = false;
client.on("message", async message => {
  if(message.author.bot || !message.guild) return;
  if(message.guild.id !== "457419227352268810") return;
  var goji = message.content.replace(/w+/g, "").replace(/ｗ+/g,"");
var options = {
  url: `https://api.a3rt.recruit-tech.co.jp/proofreading/v2/typo?apikey=${process.env.a3rt}&sentence=${encodeURIComponent(goji)}`,
  method: 'get',
  json: true
} 
  request(options, function (error, response, body) {
    if(body.message === "ok") return;
    else if(body.message !== "ok") {
      message.channel.send('誤字ってるよ。\n' + body.checkedSentence + '\n<< >>の中が間違っているよ。');
    }
  });
}); */
client.on('message', async message => {
    if(message.author.bot) return;
    if(message.channel.name === 'hajimete-chat') {
 function formatDate() {
   const date = new Date();
   date.setTime(date.getTime() + 1000*60*60*9);
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate();
  const h = date.getHours()
  const min = date.getMinutes();
  const sec = date.getSeconds();
  const day = '日月火水木金土'.charAt(date.getDay());
  return `${m}月${d}日${h}時${min}分${sec}秒 (${day})`;
}
            sleep(1,function () { 
        message.delete()
            })
        client.channels.forEach(channel => {
            if(channel.name === 'hajimete-chat'){
              let embed = new Discord.MessageEmbed()
              .setAuthor(message.author.username,message.author.avatarURL())
              .setDescription(message.content)
              .setFooter(message.guild.name + " - " + formatDate() , message.guild.iconURL())
              .setColor(Color)
                channel.send(embed)
            }
        })
    }
});
  /*
    for(var i = 0; array.length >= i; i++){
    let embed = new Discord.MessageEmbed()
    .setTitle(message.content)
    .setFooter(message.guild.name + "|" + message.author.username)
    .setColor(Color)
    client.channels.get(array[i]).send(embed);
      if(i === array.length){
        return;
      }
  }*/
  
//------------------------------------------------------------------------------------------------------------
//Bot準備OK
client.on("ready", () => {
  console.log(`ログインしたよ！ あと 合計${client.users.size} ユーザー, そして合計${client.channels.size} チャンネル そして合計 ${client.guilds.size}サーバーで動いてるよ！.`);
  console.log(' _   _        _  _ \n\
               | | | |      | || | \n \
               | |_| |  ___ | || |  ___  \n\
               |  _  | / _ \| || | / _ \ \n\
               | | | ||  __/| || || (_) |\n\
               \_| |_/ \___||_||_| \___/')
  client.user.setActivity(config.prefix+"help"+`|Xmas|${client.guilds.size}サーバーで稼働中`);
});
//サーバーに入った
client.on("guildCreate", guild => {
  console.log(`新しいサーバーに入ったよ！: ${guild.name} (id: ${guild.id}). このサーバーには ${guild.memberCount} メンバーがいるよ！`)
  client.user.setActivity(config.prefix+" help"+`|Xmas|${client.guilds.size}サーバーで稼働中`);
 client.users.get(config.ownerID).send(`新しいサーバーに入ったよ！: ${guild.name} (id: ${guild.id}). このサーバーには ${guild.memberCount} メンバーがいるよ！`)
});
//サーバーから蹴られた
client.on("guildDelete", guild => {
  console.log(` ${guild.name}サーバーからkickかbanされたよ！ (id: ${guild.id})`)
  client.user.setActivity(config.prefix+" help"+`|Xmas|${client.guilds.size}サーバーで稼働中`)
 .then(client.users.get(config.ownerID).send(`${guild.name}サーバーからkickかbanされたよ！ (id: ${guild.id})`))
}); 
//機能全般 main
client.on("message", async message => {
  if(message.content.includes(message.content)) {
    if(message.author.bot || !message.guild) return;
  console.log(`${message.guild.name}:${message.channel}:名前:${message.author.username}:` + message.content);
} if(message.content.indexOf(config.prefix) !== 0 ) return;
if(message.channel.type === "dm") message.channel.send(message.content);
if(message.author.bot || !message.guild) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if(command === "ping") {
    const m = await message.channel.send("|loading|Pingを確認しています...");
    m.edit(`Pong! 待ち時間 ${m.createdTimestamp - message.createdTimestamp}ms.`);
} if(command === "say") {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
} if(command === "kick") {
      if (message.author.id !== config.ownerID) return;
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.author.send("メンションしてくれないとbanできないじゃまいか！");
    if(!member.kickable) 
      return message.author.send("私はこの人をkickできません！権限をくれないとkickできないです:thinking:");
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "ないです";
    await member.kick(reason)
      .catch(error =>message.author.send(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.author.send(`${member.user.tag} をkickしました！ ${message.author.tag}がkickしたよ！ 理由は ${reason}`);
} if(command === "ban") {　
    if (message.author.id !== config.ownerID) return;
    let member = message.mentions.members.first();
    if(!member)
      return message.author.send("メンションしてくれないとBanできないじゃまいか！");
    if(!member.bannable) 
      return message.author.send("私はこの人をbanすることができません！権限をくれないとbanできません:thinking:");
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.author.send(`${member.user.tag} をbanしました！ ${message.author.tag}がbanしたよ！ 理由は ${reason}`);
} if(command === "icon") {
  var user2 = message.mentions.users.first();
  var member7 = message.guild.members.get(args[0]);
    if(!user2 && member7){
    let embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setImage(member7.user.avatarURL());
     message.channel.send(embed)
  }
  if(user2 && !member7) {
    let embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setImage(user2.avatarURL());
     message.channel.send(embed);
  } if(!user2 && !member7) {
    let embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setImage(message.author.avatarURL());
     message.channel.send(embed);
  } 
} if(command === "serverinfo") {
    function checkBots(guild) {
        let botCount = 0
        guild.members.forEach(member => {
          if(member.user.bot) botCount++
        })
        return botCount
      }
      function checkMembers(guild) {
        let memberCount = 0
        guild.members.forEach(member => {
          if(!member.user.bot) memberCount++
        })
        return memberCount
      } 
  let embed = new Discord.MessageEmbed()
  .setTitle('雑談サーバー(BOT)に入る')
  .setURL('https://discord.gg/SAya2Qt')
  .setAuthor(`${message.guild.name} - 情報`, message.guild.iconURL)
  .setColor(Color)
  .addField('サーバーの所有者', message.guild.owner, true)
  .addField('サーバー領域', message.guild.region, true)
  .addField('チャンネルの数', message.guild.channels.size, true)
  .addField('メンバーのかず　Botを含む', message.guild.memberCount)
  .addField('メンバー Botを含まない', checkMembers(message.guild), true)
  .addField('ボット', checkBots(message.guild), true)
  .addField('確認レベル', message.guild.verificationLevel, true)
  .addField('AFKチャンネル',message.guild.afkChannel,true)
  .addField('システムチャンネル',message.guild.systemChannel,true)
  .addField('サーバーの名前の略称',message.guild.nameAcronym,true)
  .addField('不適切なコンテンツフィルターレベル',message.guild.explicitContentFilter,true)
  .addField('役職の数',message.guild.roles.size,true)
  .addField('絵文字の数',message.guild.emojis.size,true)
  .setImage(message.guild.iconURL)
  .setFooter('サーバー作成日:')
  .setTimestamp(message.guild.createdAt)
  return message.channel.send(embed)
} if (command === "si"){
  function checkBots(guild) {
    let botCount = 0
    guild.members.forEach(member => {
      if(member.user.bot) botCount++
    })
    return botCount
  }
  function checkMembers(guild) {
    let memberCount = 0
    guild.members.forEach(member => {
      if(!member.user.bot) memberCount++
    })
    return memberCount
  }     
let embed =new Discord.MessageEmbed()
.setTitle('雑談サーバー(BOT)に入る')
.setURL('https://discord.gg/SAya2Qt')
.setAuthor(`${message.guild.name} - 情報`, message.guild.iconURL)
.setColor(Color)
.addField('サーバーの所有者', message.guild.owner, true)
.addField('サーバー領域', message.guild.region, true)
.addField('チャンネルの数', message.guild.channels.size, true)
.addField('メンバーのかず　Botを含む', message.guild.memberCount)
.addField('メンバー Botを含まない',checkMembers(message.guild) , true)
.addField('ボット', checkBots(message.guild), true)
.addField('確認レベル', message.guild.verificationLevel, true)
.addField('AFKチャンネル',message.guild.afkChannel,true)
.addField('システムチャンネル',message.guild.systemChannel,true)
.addField('サーバーの名前の略称',message.guild.nameAcronym,true)
.addField('不適切なコンテンツフィルターレベル',message.guild.explicitContentFilter,true)
.addField('役職の数',message.guild.roles.size,true)
.addField('絵文字の数',message.guild.emojis.size,true)
.setImage(message.guild.iconURL)
.setFooter('サーバー作成日:')
.setTimestamp(message.guild.createdAt);
 message.delete()
 .then(message.channel.send(embed));
} if (command === "help"){
let embed = new Discord.MessageEmbed()
.setAuthor(`${client.user.username}のhelp`)
.setTitle('このBotを招待する')
.setURL('https://discordapp.com/api/oauth2/authorize?client_id=500580866448293899&permissions=8&scope=bot')
.addField('!t helpday' , '日常に関わる機能(天気やニュース)のhelpを表示' ,false)
.addField('!t helpser','サーバーに関する機能のhelpを表示',false)
.addField('!t helpuser' , 'ユーザーに関する機能のhelpです。',false)
.addField('!t helpemoji','emojiに関する機能のhelpです。',false)
.addField('!t helpplay' , 'Botのお遊び機能を紹介します。',false)
.addField('!t helpre','おすすめ機能を紹介します。')
.setColor(Color)
.setFooter('実行者:' + `${message.author.tag}`)
.setColor(Color)
message.channel.send(embed)
} if (command === "helpday"){
  let embed = new Discord.MessageEmbed()
  .setTitle('日常に関わる機能のhelpを表示します。')
  .addField('!t w (地名など)' , '地名の今の天気が分かるよ！謎のエラーによりミクロネシアは除外',false)
  .addField('!t wiki (調べたいもの)','調べたいものを入れると、その調べたいものをwikiで調べて送信してくれます',false)
  .addField('!t news (見たいnewsのジャンルの番号)' , 'これに関しては!t helpnews で見れます',false)
  .setColor(Color)
  .addField('!t calc','電卓機能です',false)
  .setFooter('実行者:' + `${message.author.tag}`);
message.channel.send(embed)
} if(command === "helpser"){
  let embed = new Discord.MessageEmbed()
  .setTitle('サーバーに関する機能のhelpを表示します。')
  .setColor(Color)
  .addField('!t si/serverinfo' , 'サーバーの情報を見せてくれます。')
  .addField('!t rolelist','サーバーの役職リストが見れます。',false)
  .addField('!t clear','メッセージを削除できます。これに関しての説明は!t clearhelpに乗っています。',false)
  .addField('!t role','自分のroleの権限の詳細が分かります。メンションかIDで他人のも見れます。',false)
  .addField('!t ml','memberのリストを表示してくれるよ！すごい縦長になるため、ログが流れます。注意してください',false)
  .addField('!t cl' , 'サーバーのチャンネルリストを送信してくれます。すごい縦長になるため、ログが流れます。注意してください',false)
  .addField("!t member","現在のサーバーの人数を知ることが出来ます。BOTなどのいろいろな人数を教えてくれます。",false)
  .addField('!t poll 題名 アンケート1 アンケート2.....',"アンケートを作成します。",false)
  .addField('!t vc (vcに流したいtext) ' ,'vcでtextを読んでくれるよ。')
  .addField('!t clone' , 'チャンネルを作り直してくれるよ')
  .setFooter('実行者:' + `${message.author.tag}`);
  message.channel.send(embed)
} if (command === "helpuser"){
  let embed = new Discord.MessageEmbed()
  .setTitle('ユーザーに関する機能のhelpを表示します。',false)
  .setColor(Color)
  .addField('!t ping','応答速度を測るよ！',false)
  .addField('!t icon','他人をIDやメンションで指定してアイコンを見ることができます。もちろん指定しなければ自分のも取得できます。',false)
  .addField("!t y","ユーザー情報を確認できるよ！メンションとIDで他人を指定すると、その人の情報が見れます。",false)
  .addField('!t poll 題名 アンケート1 アンケート2.....',"アンケートを作成します。",false)
  .setFooter('実行者:' + `${message.author.tag}`);
    message.channel.send(embed)
} if (command === "helpemoji"){
  let embed = new Discord.MessageEmbed()
 .setTitle('emojiに関する機能のhelpを表示します。')
.setColor(Color)
.addField('!t emojilist','サーバーの絵文字のリストを見せてくれます。',false)
.addField('!t emojiwiki' , '!t eallで使用できる絵文字の一覧です。')
.addField('!t eall (使用するemojiの名前)','上記で使えるemojiを指定すると、そのemojiを喋ってくれます。')
.addField('!t emojiid (絵文字)','絵文字のidがわかります。',false)
.setFooter('実行者:' + `${message.author.tag}`);
message.channel.send(embed)
} if (command === "helpre"){
  let embed = new Discord.MessageEmbed()
 .setTitle('おすすめ機能を紹介します。')
.setColor(Color)
.addField('!t w (地名など)' , '地名の今の天気が分かるよ！謎のエラーによりミクロネシアは除外',false)
.addField('!t wiki (調べたいもの)','調べたいものを入れると、その調べたいものをwikiで調べて送信してくれます',false)
.addField('!t news (見たいnewsのジャンルの番号)' , 'これに関しては!t helpnews で見れます',false)
.addField('!t gazo 検索したい画像のキーワード' , '検索したい画像のキーワードを入れると、それにあった画像を1つだけ抽選して取得して送信します。')
.addField('!tt (話したいこと)','Botと対話できます。\nまたは、「初めて成功したbotとお話ししよう」というチャンネルを用意すると、接頭語なしでも話しかけることができます。')
.addField('/p (検索したい曲の名前)' ,"VCに入ってる状態で使うと音楽を流します。いわゆる音楽Botです。")
.addField('global-chat機能',"hajimete-chatというチャンネルを作るとそのチャンネルがBOTを通して話すことができます")
.addField('!t vc (vcに流したいtext) ' ,'vcでtextを読んでくれるよ。')
.setFooter('実行者:' + `${message.author.tag}`);
message.channel.send(embed)
} if (command === "helpplay"){
let embed = new Discord.MessageEmbed()
.setTitle('!t gazo 検索したい画像のキーワード' , '検索したい画像のキーワードを入れると、それにあった画像を1つだけ抽選して取得して送信します。')
.addField('!t ec 赤 青 緑' , 'RBGを入れるとそのEmbedが出てきます。カラーコードも一緒に出てきます。',false)
.addField('!t say','発言をまるっきりパクって送信します。',false)
.addField('!t div (数字)','数字の約数がわかります。',false)
.addField('!t bin (数字)' , '数字を2進数に変換して送信してくれます。',false)
.addField('!t goo (検索する文字)', '指定された文字列をコードの中から探ります。何回使われてるか、何行目にあるか、何番目にあるかわかります。',false)
.addField('!t end (文字)' , '最後の文字を送信してくれます。　例: !t end aaa123 結果 3',false)
.addField('!t nickbot' , 'BOTのニックネームを変更して遊ぶことが出来ます。',false)
.addField('!t moji','トリガーを除いた文字数を数えます',false)
.addField('!tt (話したいこと)','Botと対話できます。\nまたは、「初めて成功したbotとお話ししよう」というチャンネルを用意すると、接頭語なしでも話しかけることができます。')
.addField('/p (検索したい曲の名前)' ,"VCに入ってる状態で使うと音楽を流します。いわゆる音楽Botです。")
  .addField('/pu (検索したい曲のURL)' , "上のurlを使ったversionです")
.addField('!t youtube (検索したい文字)' , 'Youtubeで文字を検索して一番上に出てきた動画のURLを貼っつける機能です。')
.addField('global-chat機能',"hajimete-chatというチャンネルを作るとそのチャンネルがBOTを通して話すことができるようになります")
.addField('!t input','説明しづらいので使って察してね')
.addField('!t kuro (形態素解析したい分・文字)',"()の中の文字を形態素解析します。\n 形態素解析って何？(\`・ω・)つ!t wiki")
.addField('!t base (文字)' , '文字をbase64エンコードします')
.addField('!t basede ()' ,'↑のデコード版')
.addField('!t q', 'クイズができます')
.setColor(Color)
.setFooter('実行者:' + `${message.author.tag}`);
message.channel.send(embed)
} if (command === "helpnews"){
let embed = new Discord.MessageEmbed()
.setColor(Color)
.setTitle('newsについてのhelp')
.addField('ニュース取得します。' , 'YahooNewsや,NHKニュースを３個限定で取得します。')
.addField('newsを取得する方法' , '!t news "取得したいニュースのジャンルの番号')
.addField('ジャンル一覧' , 'なし 総合\n1 社会\n2 科学・医療\n3 文化・エンタメ\n4 政治\n5 経済 \n6 国際\n7 スポーツ\n8 IT\n9 ギズモード・ジャパン')
.setFooter('実行者:' + `${message.author.tag}`);
message.channel.send(embed)
} if (command === "clearhelp"){
  message.channel.send('!t clear (削除するメッセージの数)\n __注意__\n100までしか一気に削除できません。\n削除するにはメッセージの管理権限が必要です。\n２週間前のメッセージしか削除できません。');
} if (command === "gifhelp"){
  message.delete()
  let embed = new Discord.MessageEmbed()
  .setColor(Color)
  .setAuthor(`${client.user.tag}のemojihelp`)
  .addField('!t thinking',':thinking:で埋め尽くされるgifを送信します。',true)
  .addField('!t 頭大丈夫？','知らないはげおじさんが頭をつつくうざいGIFを送信します。うざい人に見せよう！',false)
  .addField('!t banhammer','Banのハンマーの絵文字がリアクションされるよ',false)
  .addField('!t whitethinking','白い背景からthinkingが沸くGIFを送信します！',false)
  .addField('!t thinkspinner','考えるハンドスピナーのGIFを送信します',false)
  .addField('!t buruburu','thinkingがブルブルするGIFを送信します。',false)
  .setFooter('実行者:' + `${message.author.tag}`);
  message.author.send(embed);
} if (command === "dice"){
  if (args[0] >100 && message.author.id !== config.ownerID) {
    message.channel.send('サイコロは1000まででお願いします。');
    return;
  } else if(!args[0]){
    let embed = new Discord.MessageEmbed()
    .setImage(サイコロ[Math.floor(Math.random() * サイコロ.length)]);
  message.channel.send(embed)
  }
  function dice(){
    var results = [];
    for(var i=1; i<=args[0]; i++) {
            results.push(Math.floor(Math.random() * 7));
        }
  return results;
      }
var r1 = dice(args[0]),
     r = r.join("")
message.channel.send(r) 
} if (command==="ran"){
      function ran(){
        var results = [];
        for(var i=1; i<=args[0]; i++) {
                results.push(Math.floor(Math.random() * 1001)).join();
            }
      return results;
          }
    var r1 = ran(args[0]),
         r = r.join("")
    message.channel.send(r) 
} if (command === "botinfo"){
      let embed = new Discord.MessageEmbed()
      .setColor('#0000FF')
      .setAuthor(`${client.user.tag}のinfo`)
      .setTitle(`${client.user.username}を招待する`)
      .setURL('https://discordapp.com/api/oauth2/authorize?client_id=500580866448293899&permissions=8&scope=bot')
      .addField('知っているユーザーの数',`${client.users.size}`,false)
      .addField('知っているチャンネルの数',`${client.channels.size}`,false)
      .addField('合計どれくらいサーバーに入っているか',`${client.guilds.size}`,false)
      .addField('BOTが作成された時間',`2018年10月13日土曜日5時9分38秒`,false);
      message.channel.send(embed);
} if (command === "clear"){
  if(!message.member.hasPermission("MANAGE_MESSAGES") && message.author.id !== config.ownerID) {
    message.channel.send('あなたはメッセージを管理する権限を持っていないのでメッセージを消せません。')
    return;
  } 
if(!args[0]) return
 message.channel.bulkDelete(args[0]).then(() => {
message.channel.send(` ${args[0]}メッセージを削除しました`).then(msg => msg.delete(2000));
}) 
} if (command === "脱糞"){
  let embed = new Discord.MessageEmbed()
  .setColor(Color)
   .setImage('https://cdn.discordapp.com/attachments/498442031144632320/498443202874048512/unknown.png') 
   message.channel.send('あああああああああああああああああああああああああああああああ！！！！！！！！！！！（ﾌﾞﾘﾌﾞﾘﾌﾞﾘﾌﾞﾘｭﾘｭﾘｭﾘｭﾘｭﾘｭ！！！！！！ﾌ\ ﾞﾂﾁﾁﾌﾞﾌﾞﾌﾞﾁﾁﾁﾁﾌﾞﾘﾘｲﾘﾌﾞﾌﾞﾌﾞﾌﾞｩｩｩｩｯｯｯ！！！！！！！')
  message.channel.send(embed)
} if (command === "member"){
  function checkMembers(guild) {
    let memberCount = 0
    guild.members.forEach(member => {
      if(!member.user.bot) memberCount++
    })
    return memberCount
  }     
  function checkBots(guild) {
    let botCount = 0
    guild.members.forEach(member => {
      if(member.user.bot) botCount++
    })
    return botCount
  }
  let embed = new Discord.MessageEmbed()
  .setColor('#0000FF')
  .addField('MEMBER COUNT',"現在の" + `${message.guild.name}のユーザー数は`　+ message.guild.memberCount + "人です！",false)
  .addField('BOT COUNT',`現在の${message.guild.name}のBotの数は` +checkBots(message.guild) +"人です！",false)
  .addField('HUMAN COUNT',`現在の${message.guild.name}の人間の数は` + checkMembers(message.guild),false)
  message.channel.send(embed);
} if (command === "suumo"){
  message.delete();
  message.channel.send('あ❗スーモ❗🌚ダン💥ダン💥ダン💥シャーン🎶スモ🌝スモ🌚スモ🌝スモ🌚スモ🌝スモ🌚ス〜〜〜モ⤴🌝スモ🌚スモ🌝スモ🌚スモ🌝スモ🌚スモ🌝ス〜〜〜モ⤵🌞')
} if (command === "rennsura語録"){
  message.delete(5000).then(
  message.channel.send(new Discord.MessageEmbed().setColor('#0000FF').setAuthor('rennsura語録').addField(config.rennsura1,'ecec使う人いなさそう',false)
  .addField(config.rennsura2,'違います\nでもLivescriptからjavascriptに変名した人もちょっと悪い',false).addField(config.rennsura3,'花をホジホジする(意味深)',false)
  .addField(config.rennsura4,'？？？？？？？？',false).addField(config.rennsura5,'??????',false).addField('!t rennsura脳内','rennsuraの脳内の画像を見せてくれるよ',false).addField(config.rennsura6,'Discord.jsはNode.jsのものであってJSのものではありません。',false)
  .addField(config.rennsura7,'妄想がお得意なようで',false).addField(config.rennsura8,'嫌な予感・・・',false).addField(config.rennsura9,'お前だったのか',false)))
} if (command === "ここをお勧めするよ！") {
  message.delete()
  .then(message.channel.send(new Discord.MessageEmbed().setColor('#0000FF').setTitle('ここをお勧めするよ！').setURL('https://www.nisseikyo.or.jp/')));
} if (command === "rennsura脳内"){
  message.delete()
  .then(
  message.channel.send(new Discord.MessageEmbed()  .setColor(Color).setTitle('うわきも').setImage('https://cdn.discordapp.com/attachments/497723494339969025/502838012745351170/rennsura4.png')))
} if (command === "rennsurafire"){
  message.delete();
  const rennsurafire = client.emojis.find(emoji => emoji.name === "a74f74eeed2657412eafd037c3386157");
  message.channel.send(`${rennsurafire}\n:fire:\n`)
} if (command === "emojilist") {
  const emojiList = message.guild.emojis.map(e=>e.toString()).join(" ");
  if(message.guild.emojis.size === 0){
    message.channel.send('emoji１つもないやん');
    return;
  }
  message.channel.send(emojiList)
  .catch(error =>message.channel.send('emojiの数が多すぎます！'+ `\n${error}`))
} if (command === "rolelist"){
  const roleList1 = message.guild.roles.map(r => r.name+"\n");
  const roleList = roleList1.join("")
  message.channel.send("\`\`\`fix\n"+roleList + "\`\`\`")
  .catch(error => message.channel.send('Role数が多すぎて文字数制限に引っかかってしまいました。\n' + `${error}`));
} if (command === 'role'){
  const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
  var user = message.mentions.users.first();
  let perms = message.member.permissions;
  const member2 = message.guild.members.get(args[0])
if (!user && !member2) {
   let embed = new Discord.MessageEmbed()
   .setColor(Color)
   .setThumbnail(message.author.avatarURL())
   .setAuthor(`${message.author.username}の権限`)
   .addField('メンバーをキック',perms.has("KICK_MEMBERS"),true)
   .addField('管理者権限',perms.has("ADMINISTRATOR"),true)
   .addField('チャンネル操作権限',perms.has('MANAGE_CHANNELS'),true)
   .addField("リアクションの追加権限",perms.has("ADD_REACTIONS"),true)
   .addField("role操作権限",perms.has("MANAGE_ROLES_OR_PERMISSIONS"),true)
   .addField("メッセージの管理",perms.has("MANAGE_MESSAGES"),true)
   .addField('全体メンション',perms.has("MENTION_EVERYONE"),true)
   .addField('ニックネーム変更できるか',perms.has("CHANGE_NICKNAME"),true)
   .addField("ニックネーム管理",perms.has("MANAGE_NICKNAMES"),true)
   message.delete()
   .then(message.channel.send(embed))
   return;
} else if(member2) {
  let embed = new Discord.MessageEmbed()
  .setColor(Color)
  .setAuthor(`${member2.user.username}の権限`)
  .setThumbnail(member2.user.avatarURL())
  .addField('メンバーをキック',member2.permissions.has("KICK_MEMBERS"),true)
  .addField('管理者権限',member2.permissions.has("ADMINISTRATOR"),true)
  .addField('チャンネル操作権限',member2.permissions.has('MANAGE_CHANNELS'),true)
  .addField("リアクションの追加権限",member2.permissions.has("ADD_REACTIONS"),true)
  .addField("role操作権限",member2.permissions.has("MANAGE_ROLES_OR_PERMISSIONS"),true)
  .addField("メッセージの管理",member2.permissions.has("MANAGE_MESSAGES"),true)
  .addField('全体メンション',member2.permissions.has("MENTION_EVERYONE"),true)
  .addField('ニックネーム変更できるか',member2.permissions.has("CHANGE_NICKNAME"),true)
  .addField("ニックネーム管理",member2.permissions.has("MANAGE_NICKNAMES"),true)
  message.delete()
  .then(message.channel.send(embed))
  return;
} else {
  var user = message.mentions.users.first();
  let embed = new Discord.MessageEmbed()
  .setColor(Color)
  .setThumbnail(user.avatarURL())
  .setAuthor(`${user.username}の権限`)
  .addField('メンバーをキック',member.permissions.has("KICK_MEMBERS"),true)
  .addField('管理者権限',member.permissions.has("ADMINISTRATOR"),true)
  .addField('チャンネル操作権限',member.permissions.has('MANAGE_CHANNELS'),true)
  .addField("リアクションの追加権限",member.permissions.has("ADD_REACTIONS"),true)
  .addField("role操作権限",member.permissions.has("MANAGE_ROLES_OR_PERMISSIONS"),true)
  .addField("メッセージの管理",member.permissions.has("MANAGE_MESSAGES"),true)
  .addField('全体メンション',member.permissions.has("MENTION_EVERYONE"),true)
  .addField('ニックネーム変更できるか',member.permissions.has("CHANGE_NICKNAME"),true)
  .addField("ニックネーム管理",member.permissions.has("MANAGE_NICKNAMES"),true)
  message.channel.send(embed)
}
} if (command === "myrole"){
  let perms = message.member.permissions;
  let embed = new Discord.MessageEmbed()
  .setColor(Color)
  .setThumbnail(message.author.avatarURL)
  .setAuthor(`${message.author.username}の権限`)
  .addField('メンバーをキック',perms.has("KICK_MEMBERS"),true)
  .addField('管理者権限',perms.has("ADMINISTRATOR"),true)
  .addField('チャンネル操作権限',perms.has('MANAGE_CHANNELS'),true)
  .addField("リアクションの追加権限",perms.has("ADD_REACTIONS"),true)
  .addField("role操作権限",perms.has("MANAGE_ROLES_OR_PERMISSIONS"),true)
  .addField("メッセージの管理",perms.has("MANAGE_MESSAGES"),true)
  .addField('全体メンション',perms.has("MENTION_EVERYONE"),true)
  .addField('ニックネーム変更できるか',perms.has("CHANGE_NICKNAME"),true)
  .addField("ニックネーム管理",perms.has("MANAGE_NICKNAMES"),true)
  message.delete()
  .then(message.channel.send(embed))
} if (command === 'y') {
  const randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });
  const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
  if (!member) return message.reply("Please provide a vaild Mention or USER ID");
  let bot;
  if (member.user.bot === true) {
    bot = "はい";
  } else {
    bot = "いいえ";
  }
  const user213131313131 = message.mentions.users.first() || message.author;
  const embed = new Discord.MessageEmbed()
    .setColor(randomColor)
    .setAuthor(`${member.user.tag} (${member.id})`)
    .setThumbnail(user213131313131.avatarURL)
    .addField("ニックネーム:", `${member.nickname !== null ? `${member.nickname}` : "ニックネームがありません"}`, true)
    .addField("Botですか？", `${bot}`, true)
    .addField("Guild", `${bot}`, true)
    .addField("プレイング", `${member.user.presence.game ? `${member.user.presence.game.name}` : "何もプレイしていないよ！"}`, true)
    .addField("役職", `${member.roles.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "No Roles"}`, true)
    .addField("この鯖に入った時の時間",member.joinedAt, true)
    .addField("アカウント作った時の時間",member.user.createdAt, true)
    .addField("ステータス",member.presence.status, true)
      message.channel.send(embed);
      return;
} if (command === "頭大丈夫？") {
  message.delete()
  .then(message.channel.send({files:["./atama.gif"]}));
} if (command === "thinking"){
  message.delete();
  message.channel.send({files:["./fghjkl.gif"]});
} if (command === "whitethinking"){
  message.delete();
  message.channel.send({files:["./giphy.gif"]})
} if (command === "thinkspinner"){
  message.delete();
  message.channel.send({files:["./tenor.gif"]})
} if (command === "helpneta"){
 let embed = new Discord.MessageEmbed()
  .setTitle('このBotを招待する')
  .setURL('https://discordapp.com/api/oauth2/authorize?client_id=500580866448293899&permissions=8&scope=bot')
   .setColor(Color)
   .setAuthor(`${client.user.tag}のhelp`)
   .addField('!t rennsura語録','rennsuraの語録を教えてくれるよ！',true)
   .addField('!t ここをお勧めするよ！','精神科を進めてくれるよ！',true)
   .addField('!t suumo',"Botがスーモってくれるよ！",true)
   .addField('!t 脱糞','脱糞してくれるよ！',true)
   message.channel.send(embed)
} if(command === "buruburu"){
    message.channel.send({files:['thinkingburuburu.gif']})
    message.delete();
} if (message.content.includes("div")) {
  if (message.content.slice(-1).match(/[qwertyuiop@[asdfghjkl;:zxcvbnm,./]/) || args[0] > 1000000000000000000000000000000){
    message.reply('数字以外の文字は使えません。');
    return; 
  }
  if(message.content.startsWith("!t div 0")){
    message.channel.send('倍数は...................ありません！');
    return;
  }
    else {
    function divisor(num){
    var num = `${args[0]}`
    var results = [];
    for(var i=1; i<=num; i++) {
        if( (num%i == 0) ) {
            results.push(i);
        }
    }
  return results;
}
  var r = divisor(`${args[0]}`)
  message.channel.send(r + 'だよ！') 
  return;
} 
} if(command==="mul"){
  function baisu(num){
    var num = args[0]
    var results = [];
    for(var i=1; i<=num; i++) {
        if( (num%i == 0) ) {
            results.push(i + "と");
        }
    }
  return results;
}
  var r = baisu(`${args[0]}`)
  if(r = "1と") return;
  message.channel.send(args[0] + "は" + r + 'の倍数だよ！') 
} if (command === "nick"){
  const member = message.guild.members.get(args[0]) || message.member;
  if (message.author.id !== config.ownerID && !message.member.hasPermission("MANAGE_NICKNAMES")) {
    message.reply('あなたにニックネームを変更する権限がないのに' + client.user.name + 'がニックネームを変えるという命令を受けると思いますか？')
  }
 if (!member) {
  message.member.setNickname(`${args[0]}`)
  message.channel.send(`${member.nickname}さんのニックネームを${args[0]}に変更したよ！`);
  } else  {
    const nickname = args[1];
    member.setNickname(nickname);
message.channel.send(`${args[0]}さんのニックネームを変更したよ！`);
return;
  }
} if (command ==="ml"){
  const memberList1 = message.guild.members.map(r => "|"+r.user.username+"|");
  var memberList = memberList1.join("")
  try{
  message.channel.send(memberList);
  } catch(e){
message.reply('人が多すぎます！(褒め言葉)\n' + "\`\`\`" +e+"\`\`\`");
}
} if(command === "name"){
      if(message.author.id !== "276250823359594496") return;
       client.user.setUsername(`${args[0]}`)
  .then(user => message.reply('名前を変えることに成功しました。' + `${user.username}`))
  .catch(error => message.reply(`${error}`));
} if(command === "nickbot"){
      if(args[0] > 32){
        message.channel.send('ニックネームが長すぎるよ！')
      }
      const nickname = message.guild.members.get('500580866448293899');
      nickname.setNickname(args[0])
      .then( (nick) => {message.channel.send(`ニックネームを変更しました。${nick}`)});
} if(command === "cl"){
        let embed = new Discord.MessageEmbed()
        .setColor(Color)
        .addField('チャンネルリスト',message.guild.channels.map(c => c.name).join("\n"),false);
        message.channel.send(embed)
} if(command === "poll"){
        const a = "🇦",
         b = "🇧",
         c = "🇨",
         d = "🇩",
         e = "🇪",
         f = "🇫",
         g = "🇬",
         h = "🇭",
         i = "🇮",
         j = "🇯",
         k = "🇰",
         l = "🇱",
         m = "🇲",
         n = "🇳",
         o = "🇴",
         p = "🇵",
         q = "🇶",
         r = "🇷",
         s = "🇸",
         t = "🇹",
               Color = "#9635ff",
               anketo = "📊",
               ok = "👍",
               no = "👎";
              message.channel.send(anketo + "**" +args[0] + "**")
        if(args[0]　&& !args[1]){
          let embed = new Discord.MessageEmbed()
          .setColor(Color)
          .setDescription(ok + ": Yes" + "\n" + no + ": No")
          .setFooter(`\n${message.author.username}によって作成されました。`)
          message.channel.send(embed)
          .then((msg)=>{msg.react(ok)+ msg.react(no)});
        } else if(args[0] && args[1] && !args[2]){
        let embed = new Discord.MessageEmbed()
        .setColor(Color)
        .setDescription(a + args[1])
        .setFooter(`󠂪󠂪󠂪󠂪 󠂪󠂪󠂪󠂪 󠂪󠂪\n${message.author.username}によって作成されました。`)
        message.channel.send(embed)
        .then((msg)=>{msg.react(a)});
        } else if(args[0] && args[1] && args[2] && !args[3]){
          let embed = new Discord.MessageEmbed()
          .setColor(Color)
          .setDescription(a + args[1] + "\n" + b + args[2])
          .setFooter(`\n${message.author.username}によって作成されました。`)
          message.channel.send(embed)
          .then((msg)=>{msg.react(a) + msg.react(b)});
        } else if(args[0] && args[1] && args[2] && args[3] && !args[4]){
          let embed = new Discord.MessageEmbed()
          .setColor(Color)
          .setDescription(a + args[1] + "\n" + b + args[2] + "\n" + c + args[3])
          .setFooter(`\n${message.author.username}によって作成されました。`)
          message.channel.send(embed)
          .then((msg)=>{msg.react(a) + msg.react(b) + msg.react(c)});
        }　else if(args[0] && args[1] && args[2] && args[3] && args[4] && !args[5]){
          let embed = new Discord.MessageEmbed()
          .setColor(Color)
          .setDescription(a + args[1] + "\n" + b + args[2] + "\n" + c + args[3] + "\n" + d + args[4])
          .setFooter(`\n${message.author.username}によって作成されました。`)
          message.channel.send(embed)
          .then((msg)=>{msg.react(a) + msg.react(b) + msg.react(c) + msg.react(d)});
        } else if(args[0] && args[1] && args[2] && args[3] && args[4] && args[5] && !args[6]){
          let embed = new Discord.MessageEmbed()
          .setColor(Color)
          .setDescription(a + args[1] + "\n" + b + args[2] + "\n" + c + args[3] + "\n" +d + args[4] + "\n" +e + args[5])
          .setFooter(`\n${message.author.username}によって作成されました。`)
          message.channel.send(embed)
          .then((msg)=>{msg.react(a) + msg.react(b) + msg.react(c) + msg.react(d) + msg.react(e)});
        } else if(args[0] && args[1] && args[2] && args[3] && args[4] && args[5] && args[6] && !args[7]){
          let embed = new Discord.MessageEmbed()
          .setColor(Color)
          .setDescription(a + args[1] + "\n" + b + args[2] + "\n" + c + args[3] + "\n" + d + args[4] + "\n" + e + args[5] + "\n" + f + args[6])
          .setFooter(`\n${message.author.username}によって作成されました。`)
          message.channel.send(embed)
          .then((msg)=>{msg.react(a) + msg.react(b) + msg.react(c) + msg.react(d) + msg.react(e) + msg.react(f)});
        } else if(args[0] && args[1] && args[2] && args[3] && args[4] && args[5] && args[6] && args[7] && !args[8]){
          let embed = new Discord.MessageEmbed()
          .setColor(Color)
          .setDescription(a + args[1] + "\n" + b + args[2] + "\n" + c + args[3] + "\n" + d + args[4] + "\n" + e + args[5] + "\n" + f + args[6] + "\n" + g + args[7])
          .setFooter(`\n${message.author.username}によって作成されました。`)
          message.channel.send(embed)
          .then((msg)=>{msg.react(a) + msg.react(b) + msg.react(c) + msg.react(d) + msg.react(e) + msg.react(f) + msg.react(g)});
        } else if(args[0] && args[1] && args[2] && args[3] && args[4] && args[5] && args[6] && args[7] && args[8] && !args[9]){
          let embed = new Discord.MessageEmbed()
          .setColor(Color)
          .setDescription(a + args[1] + "\n" + b + args[2] + "\n" + c + args[3] + "\n" + d + args[4] + "\n" + e + args[5] + "\n" + f + args[6] + "\n" + g + args[7] + "\n" + h + args[8])
          .setFooter(`\n${message.author.username}によって作成されました。`)
          message.channel.send(embed)
          .then((msg)=>{msg.react(a) + msg.react(b) + msg.react(c) + msg.react(d) + msg.react(e) + msg.react(f) + msg.react(g) + msg.react(h)});
        } else if(args[0] && args[1] && args[2] && args[3] && args[4] && args[5] && args[6] && args[7] && args[8] && args[9] && !args[10]){
          let embed = new Discord.MessageEmbed()
          .setColor(Color)
          .setDescription(a + args[1] + "\n" + b + args[2] + "\n" + c + args[3] + "\n" + d + args[4] + "\n" + e + args[5] + "\n" + f + args[6] + "\n" + g + args[7] + "\n" + h + args[8] + "\n" + i + args[9])
          .setFooter(`\n${message.author.username}によって作成されました。`)
          message.channel.send(embed)
          .then((msg)=>{msg.react(a) + msg.react(b) + msg.react(c) + msg.react(d) + msg.react(e) + msg.react(f) + msg.react(g) + msg.react(h) + msg.react(i)});
        } else if(args[0] && args[1] && args[2] && args[3] && args[4] && args[5] && args[6] && args[7] && args[8] && args[9] && args[10] && !args[11]){
          let embed = new Discord.MessageEmbed()
          .setColor(Color)
          .setDescription(a + args[1] + "\n" + b + args[2] + "\n" + c + args[3] + "\n" + d + args[4] + "\n" + e + args[5] + "\n" + f + args[6] + "\n" + g + args[7] + "\n" + h + args[8] + "\n" + i + args[9] + "\n" + j + args[10])
          .setFooter(`\n${message.author.username}によって作成されました。`)
          message.channel.send(embed)
          .then((msg)=>{msg.react(a) + msg.react(b) + msg.react(c) + msg.react(d) + msg.react(e) + msg.react(f) + msg.react(g) + msg.react(h) + msg.react(i) + msg.react(j)});
        } else if(args[0] && args[1] && args[2] && args[3] && args[4] && args[5] && args[6] && args[7] && args[8] && args[9] && args[10] && args[11] && !args[12]){
          let embed = new Discord.MessageEmbed()
          .setColor(Color)
          .setDescription(a + args[1] + "\n" + b + args[2] + "\n" + c + args[3] + "\n" + d + args[4] + "\n" + e + args[5] + "\n" + f + args[6] + "\n" + g + args[7] + "\n" + h + args[8] + "\n" + i + args[9] + "\n" + j + args[10]　+ "\n" + k + args[11])
          .setFooter(`\n${message.author.username}によって作成されました。`)
          message.channel.send(embed)
          .then((msg)=>{msg.react(a) + msg.react(b) + msg.react(c) + msg.react(d) + msg.react(e) + msg.react(f) + msg.react(g) + msg.react(h) + msg.react(i) + msg.react(j) + msg.react(k)});
        } else if(args[0] && args[1] && args[2] && args[3] && args[4] && args[5] && args[6] && args[7] && args[8] && args[9] && args[10] && args[11] && args[12] && !args[13]) {
          let embed = new Discord.MessageEmbed()
          .setColor(Color)
          .setDescription(a + args[1] + "\n" + b + args[2] + "\n" + c + args[3] + "\n" + d + args[4] + "\n" + e + args[5] + "\n" + f + args[6] + "\n" + g + args[7] + "\n" + h + args[8] + "\n" + i + args[9] + "\n" + j + args[10]　+ "\n" + k + args[11] + "\n" + l + args[12])
          .setFooter(`\n${message.author.username}によって作成されました。`)
          message.channel.send(embed)
          .then((msg)=>{msg.react(a) + msg.react(b) + msg.react(c) + msg.react(d) + msg.react(e) + msg.react(f) + msg.react(g) + msg.react(h) + msg.react(i) + msg.react(j) + msg.react(k) + msg.react(l)});
        } else if(args[0] && args[1] && args[2] && args[3] && args[4] && args[5] && args[6] && args[7] && args[8] && args[9] && args[10] && args[11] && args[12] && args[13] && !args[14]){
          let embed = new Discord.MessageEmbed()
          .setColor(Color)
          .setDescription(a + args[1] + "\n" + b + args[2] + "\n" + c + args[3] + "\n" + d + args[4] + "\n" + e + args[5] + "\n" + f + args[6] + "\n" + g + args[7] + "\n" + h + args[8] + "\n" + i + args[9] + "\n" + j + args[10]　+ "\n" + k + args[11] + "\n" + l + args[12] + "\n" + m + args[13])
          .setFooter(`\n${message.author.username}によって作成されました。`)
          message.channel.send(embed)
          .then((msg)=>{msg.react(a) + msg.react(b) + msg.react(c) + msg.react(d) + msg.react(e) + msg.react(f) + msg.react(g) + msg.react(h) + msg.react(i) + msg.react(j) + msg.react(k) + msg.react(l) + msg.react(m)});
        } else if(args[0] && args[1] && args[2] && args[3] && args[4] && args[5] && args[6] && args[7] && args[8] && args[9] && args[10] && args[11] && args[12] && args[13] && args[14] && !args[15]){
          let embed = new Discord.MessageEmbed()
          .setColor(Color)
          .setDescription(a + args[1] + "\n" + b + args[2] + "\n" + c + args[3] + "\n" + d + args[4] + "\n" + e + args[5] + "\n" + f + args[6] + "\n" + g + args[7] + "\n" + h + args[8] + "\n" + i + args[9] + "\n" + j + args[10]　+ "\n" + k + args[11] + "\n" + l + args[12] + "\n" + m + args[13] + "\n" + n + args[14])
          .setFooter(`\n${message.author.username}によって作成されました。`)
          message.channel.send(embed)
          .then((msg)=>{msg.react(a) + msg.react(b) + msg.react(c) + msg.react(d) + msg.react(e) + msg.react(f) + msg.react(g) + msg.react(h) + msg.react(i) + msg.react(j) + msg.react(k) + msg.react(l) + msg.react(m) + msg.react(n)}); 
        } else if(args[0] && args[1] && args[2] && args[3] && args[4] && args[5] && args[6] && args[7] && args[8] && args[9] && args[10] && args[11] && args[12] && args[13] && args[14] && args[15] && !args[16]){
          let embed = new Discord.MessageEmbed()
          .setColor(Color)
          .setDescription(a + args[1] + "\n" + b + args[2] + "\n" + c + args[3] + "\n" + d + args[4] + "\n" + e + args[5] + "\n" + f + args[6] + "\n" + g + args[7] + "\n" + h + args[8] + "\n" + i + args[9] + "\n" + j + args[10]　+ "\n" + k + args[11] + "\n" + l + args[12] + "\n" + m + args[13] + "\n" + n + args[14] + "\n" + o + args[15])
          .setFooter(`\n${message.author.username}によって作成されました。`)
          message.channel.send(embed)
          .then((msg)=>{msg.react(a) + msg.react(b) + msg.react(c) + msg.react(d) + msg.react(e) + msg.react(f) + msg.react(g) + msg.react(h) + msg.react(i) + msg.react(j) + msg.react(k) + msg.react(l) + msg.react(m) + msg.react(n) + msg.react(o)}); 
        } else if(args[0] && args[1] && args[2] && args[3] && args[4] && args[5] && args[6] && args[7] && args[8] && args[9] && args[10] && args[11] && args[12] && args[13] && args[14] && args[15] && args[16] && !args[17]) {
          let embed = new Discord.MessageEmbed()
          .setColor(Color)
          .setDescription(a + args[1] + "\n" + b + args[2] + "\n" + c + args[3] + "\n" + d + args[4] + "\n" + e + args[5] + "\n" + f + args[6] + "\n" + g + args[7] + "\n" + h + args[8] + "\n" + i + args[9] + "\n" + j + args[10]　+ "\n" + k + args[11] + "\n" + l + args[12] + "\n" + m + args[13] + "\n" + n + args[14] + "\n" + o + args[15] + `\n` + p + args[16])
          .setFooter(`\n${message.author.username}によって作成されました。`)
          message.channel.send(embed)
          .then((msg)=>{msg.react(a) + msg.react(b) + msg.react(c) + msg.react(d) + msg.react(e) + msg.react(f) + msg.react(g) + msg.react(h) + msg.react(i) + msg.react(j) + msg.react(k) + msg.react(l) + msg.react(m) + msg.react(n) + msg.react(o) + msg.react(p)}); 
        } else if(args[0] && args[1] && args[2] && args[3] && args[4] && args[5] && args[6] && args[7] && args[8] && args[9] && args[10] && args[11] && args[12] && args[13] && args[14] && args[15] && args[16] && args[17] && !args[18]) {
          let embed = new Discord.MessageEmbed()
          .setColor(Color)
          .setDescription(a + args[1] + "\n" + b + args[2] + "\n" + c + args[3] + "\n" + d + args[4] + "\n" + e + args[5] + "\n" + f + args[6] + "\n" + g + args[7] + "\n" + h + args[8] + "\n" + i + args[9] + "\n" + j + args[10]　+ "\n" + k + args[11] + "\n" + l + args[12] + "\n" + m + args[13] + "\n" + n + args[14] + "\n" + o + args[15] + `\n` + p + args[16] + "\n" + q + args[17])
          .setFooter(`\n${message.author.username}によって作成されました。`)
          message.channel.send(embed)
          .then((msg)=>{msg.react(a) + msg.react(b) + msg.react(c) + msg.react(d) + msg.react(e) + msg.react(f) + msg.react(g) + msg.react(h) + msg.react(i) + msg.react(j) + msg.react(k) + msg.react(l) + msg.react(m) + msg.react(n) + msg.react(o) + msg.react(p) + msg.react(q)}); 
        } else if(args[0] && args[1] && args[2] && args[3] && args[4] && args[5] && args[6] && args[7] && args[8] && args[9] && args[10] && args[11] && args[12] && args[13] && args[14] && args[15] && args[16] && args[17] && args[18] && !args[19]){
        let embed = new Discord.MessageEmbed()
          .setColor(Color)
          .setDescription(a + args[1] + "\n" + b + args[2] + "\n" + c + args[3] + "\n" + d + args[4] + "\n" + e + args[5] + "\n" + f + args[6] + "\n" + g + args[7] + "\n" + h + args[8] + "\n" + i + args[9] + "\n" + j + args[10]　+ "\n" + k + args[11] + "\n" + l + args[12] + "\n" + m + args[13] + "\n" + n + args[14] + "\n" + o + args[15] + `\n` + p + args[16] + "\n" + q + args[17] + "\n" + r + args[18])
          .setFooter(`\n${message.author.username}によって作成されました。`)
          message.channel.send(embed)
          .then((msg)=>{msg.react(a) + msg.react(b) + msg.react(c) + msg.react(d) + msg.react(e) + msg.react(f) + msg.react(g) + msg.react(h) + msg.react(i) + msg.react(j) + msg.react(k) + msg.react(l) + msg.react(m) + msg.react(n) + msg.react(o) + msg.react(p) + msg.react(q) + msg.react(r)}); 
        } else if(args[0] && args[1] && args[2] && args[3] && args[4] && args[5] && args[6] && args[7] && args[8] && args[9] && args[10] && args[11] && args[12] && args[13] && args[14] && args[15] && args[16] && args[17] && args[18] && args[19] && !args[20]) {
          let embed = new Discord.MessageEmbed()
          .setColor(Color)
          .setDescription(a + args[1] + "\n" + b + args[2] + "\n" + c + args[3] + "\n" + d + args[4] + "\n" + e + args[5] + "\n" + f + args[6] + "\n" + g + args[7] + "\n" + h + args[8] + "\n" + i + args[9] + "\n" + j + args[10]　+ "\n" + k + args[11] + "\n" + l + args[12] + "\n" + m + args[13] + "\n" + n + args[14] + "\n" + o + args[15] + `\n` + p + args[16] + "\n" + q + args[17] + "\n" + r + args[18] + "\n" + s + args[19])
          .setFooter(`\n${message.author.username}によって作成されました。`)
          message.channel.send(embed)
          .then((msg)=>{msg.react(a) + msg.react(b) + msg.react(c) + msg.react(d) + msg.react(e) + msg.react(f) + msg.react(g) + msg.react(h) + msg.react(i) + msg.react(j) + msg.react(k) + msg.react(l) + msg.react(m) + msg.react(n) + msg.react(o) + msg.react(p) + msg.react(q) + msg.react(r) + msg.react(s)}); 
        } else if(args[0] && args[1] && args[2] && args[3] && args[4] && args[5] && args[6] && args[7] && args[8] && args[9] && args[10] && args[11] && args[12] && args[13] && args[14] && args[15] && args[16] && args[17] && args[18] && args[19] && args[20] && !args[21]) {
          let embed = new Discord.MessageEmbed()
          .setColor(Color)
          .setDescription(a + args[1] + "\n" + b + args[2] + "\n" + c + args[3] + "\n" + d + args[4] + "\n" + e + args[5] + "\n" + f + args[6] + "\n" + g + args[7] + "\n" + h + args[8] + "\n" + i + args[9] + "\n" + j + args[10]　+ "\n" + k + args[11] + "\n" + l + args[12] + "\n" + m + args[13] + "\n" + n + args[14] + "\n" + o + args[15] + `\n` + p + args[16] + "\n" + q + args[17] + "\n" + r + args[18] + "\n" + s + args[19] +"\n" + t + args[19])
          .setFooter(`\n${message.author.username}によって作成されました。`)
          message.channel.send(embed)
          .then((msg)=>{msg.react(a) + msg.react(b) + msg.react(c) + msg.react(d) + msg.react(e) + msg.react(f) + msg.react(g) + msg.react(h) + msg.react(i) + msg.react(j) + msg.react(k) + msg.react(l) + msg.react(m) + msg.react(n) + msg.react(o) + msg.react(p) + msg.react(q) + msg.react(r) + msg.react(s) + msg.react(t)}); 
        } else {
          message.channel.send('アンケートは20までに制限されています。');
        }
} if(command === 'bin') {
  var tesu = parseInt(args[0]);
  var nisin = tesu.toString(2);
  message.channel.send(''+ nisin +'')
  return;
} if(command === "goo"){
  fs.readFile('./main.js', 'utf8', function (err,text) {
    const kensakusurumoji = message.content.replace(/\s+/g, "").slice(5)
    const lines = text.split('\n') // 行ごとの配列
    const index = lines.findIndex(line => ~line.indexOf(kensakusurumoji)) // どの行にあるか検索
    const result = ~index ? (index + 1) + '行目にあって、' : 'どこにもなくて、'  
    var pos = text.indexOf(kensakusurumoji);
    var nang = text.indexOf(kensakusurumoji)
    if(nang === -1){
     message.channel.send('そんな文字ありません')
      return;
    }
    for(var i = 1;pos !== -1; i++) {
      pos = text.indexOf(kensakusurumoji, pos + 1);
    }
    message.channel.send(result + nang + "番目にあって、" + "全部で" + i + "あったよ！")

  });
} if(command === "emojiid"){
    const args = message.content.slice(config.prefix.length).trim().split(/:+/g);
    message.channel.send(args[2])
    .catch(error => message.channel.send('その絵文字はカスタム絵文字じゃないのでIDはありません'))
} if(command === "emojiwiki"){
    const test = client.emojis.map(e=> e.toString()).join(" ").split("<:kusa:518020820136886272>")
    const test1 = client.emojis.map(e=> e.toString()).join(" ").split("<:spamremoval:498787553038696449>");
    message.channel.send(test[0])
    message.channel.send(test1[0])
} if(command === "end") {
  message.channel.send(message.content.slice(-1));
} if(command === "role検索"){
const role = message.guild.roles.find(r=> r.name === args[0]);
message.channel.send(role)
} if(command === "eall"){
  message.delete();
var emoji = client.emojis.find(emoji => emoji.name === args[0]);
if(!emoji) { 
  message.channel.send('そのemojiが見つかりませんでした')  
  return; 
}
message.channel.send(`${emoji}`);
} if(command === "回"){
    message.delete();
   message.channel.send({files:["./thinkspin.gif"]})
} if(command === "w"){
if(args[0] === "ミクロネシア" || args[0] === "micronesia" || args[0] === "みくろねしあ" || args[0] === "みくろねしあれんぽう" || args[0] === "ミクロネシア連邦") return;
        weather.find({search: args[0], degreeType: 'C'}, function(err, result) {
            if (err) message.channel.send(err);
            if (result.length === 0) {
                message.channel.send('**場所を取得できませんでした**') 
                return; 
            } 
            var current = result[0].current;
            switch(current.skytext){
            case "Mostly Sunny": 
            var skytext = "ほぼ晴れ";
            break;
            case "Cloudy" :
            var skytext = "曇り";
            break;
            case "Partly Cloudy":
            var skytext = "晴れのち曇り";
            break;
            case "Sunny":
            var skytext = "晴れ";
            break;
            case "Clear" :
            var skytext = "雲1つない快晴";
            break;
            case "Mostly Clear":
            var skytext = "ほぼ快晴";
            break;
            case "Mostly Cloudy":
            var skytext = "ほぼ曇り";
            break;
            case "Partly Sunny":
            var skytext = "所により晴れ";
            break;
            case "Rain" :
            var skytext = "雨";
            break;
            case "Light Rain":
            var skytext = "小雨";
            break;
            case "Rain Showers":
            var skytext = "にわか雨または驟雨";
            break;
            case "Fog" :
            var skytext = "霧";
            default:
            var skytext = current.skytext;
            break
            }
            const embed = new Discord.MessageEmbed()
                .setDescription('**' + skytext + '**') 
                .setAuthor(`${current.date}の${current.observationpoint}の天気`) 
                .setThumbnail(current.imageUrl) 
                .setColor(Color) 
                .addField('温度',`${current.temperature}℃`, true)
                .addField('体感温度', `${current.feelslike}℃`, true)
                .addField('風',current.winddisplay, true)
                .addField('湿度', `${current.humidity}%`, true);
            message.channel.send(embed);
        });
} if(command === "w1"){
if(args[0] === "東京"){ 
  var options = {
    url: `https://rss-weather.yahoo.co.jp/rss/days/13.xml`,
    method: 'GET'
}
  request(options, function (error, response, body) { 
 $ = che.load(body);
 var results = [];
$("item").each(function(i, el) {
  if(i  >=  3) return false;
  var name = $(this).children("title").text();
  var price = $(this).children("description").text();
 let embed = new Discord.MessageEmbed()
 .setTitle('東京の天気')
 .addField(name,price)
 .setColor(Color)
 message.channel.send(embed);
});
  });
} if(args[0] === "神奈川"){
  var options = {
    url: `https://rss-weather.yahoo.co.jp/rss/days/14.xml`,
    method: 'GET'
}
  request(options, function (error, response, body) { 
 $ = che.load(body);
$("item").each(function(i, el) {
  if(i  >=  3) return false;
  var name = $(this).children("title").text();
  var price = $(this).children("description").text();
 let embed = new Discord.MessageEmbed()
 .setTitle('神奈川の天気')
 .addField(name,price)
 .setColor(Color)
 message.channel.send(embed);
});
  });
} if(args[0] === "千葉県"){
  var options = {
    url: `https://rss-weather.yahoo.co.jp/rss/days/12.xml`,
    method: 'GET'
}
  request(options, function (error, response, body) { 
 $ = che.load(body);
$("item").each(function(i, el) {
  if(i  >=  3) return false;
  var name = $(this).children("title").text();
  var price = $(this).children("description").text();
 let embed = new Discord.MessageEmbed()
 .setTitle('千葉の天気')
 .addField(name,price)
 .setColor(Color)
 message.channel.send(embed);
});
  });
} if(args[0] === "埼玉"){
  var options = {
    url: `https://rss-weather.yahoo.co.jp/rss/days/11.xml`,
    method: 'GET'
}
  request(options, function (error, response, body) { 
 $ = che.load(body);
$("item").each(function(i, el) {
  if(i  >=  3) return false;
  var name = $(this).children("title").text();
  var price = $(this).children("description").text();
 let embed = new Discord.MessageEmbed()
 .setTitle('千葉の天気')
 .addField(name,price)
 .setColor(Color)
 message.channel.send(embed);
});
  });
} if(args[0] === "茨城"){
  var options = {
    url: `https://rss-weather.yahoo.co.jp/rss/days/8.xml`,
    method: 'GET'
}
  request(options, function (error, response, body) { 
 $ = che.load(body);
$("item").each(function(i, el) {
  if(i  >=  3) return false;
  var name = $(this).children("title").text();
  var price = $(this).children("description").text();
 let embed = new Discord.MessageEmbed()
 .setTitle('茨城の天気')
 .addField(name,price)
 .setColor(Color)
 message.channel.send(embed);
});
  });
} if(args[0] === "栃木"){
  var options = {
    url: `https://rss-weather.yahoo.co.jp/rss/days/9.xml`,
    method: 'GET'
}
  request(options, function (error, response, body) { 
 $ = che.load(body);
$("item").each(function(i, el) {
  if(i  >=  3) return false;
  var name = $(this).children("title").text();
  var price = $(this).children("description").text();
 let embed = new Discord.MessageEmbed()
 .setTitle('栃木の天気')
 .addField(name,price)
 .setColor(Color)
 message.channel.send(embed);
});
  });
} if(args[0] === "群馬"){
  var options = {
    url: `https://rss-weather.yahoo.co.jp/rss/days/10.xml`,
    method: 'GET'
}
  request(options, function (error, response, body) { 
 $ = che.load(body);
$("item").each(function(i, el) {
  if(i  >=  3) return false;
  var name = $(this).children("title").text();
  var price = $(this).children("description").text();
 let embed = new Discord.MessageEmbed()
 .setTitle('群馬の天気')
 .addField(name,price)
 .setColor(Color)
 message.channel.send(embed);
});
  });
} if(args[0] === "山梨"){
  var options = {
    url: `https://rss-weather.yahoo.co.jp/rss/days/19.xml`,
    method: 'GET'
}
  request(options, function (error, response, body) { 
 $ = che.load(body);
$("item").each(function(i, el) {
  if(i  >=  3) return false;
  var name = $(this).children("title").text();
  var price = $(this).children("description").text();
 let embed = new Discord.MessageEmbed()
 .setTitle('山梨の天気')
 .addField(name,price)
 .setColor(Color)
 message.channel.send(embed);
});
  });
}
} if(command==="news"){
  switch(args[0]){
  case  "1" :
  var ja = "社会";
  break;
  case "2" :
  var ja = "科学・医療";
  break;
  case "3" :
  var ja = "文化・エンタメ";
  break;
  case "4" :
  var ja = "政治"
  break;
  case "5" :
  var ja = "経済"
  break;
  case "6" :
  var ja = "国際"
  break;
  case "7" :
  var ja = "スポーツ";
  break;
  default :
  var ja = "社会"

}
  if(!args[0]){
var options = {
    url: `http://www3.nhk.or.jp/rss/news/cat0.xml`,
    method: 'GET'
}
  request(options, function (error, response, body) { 
 $ = che.load(body);

$("item").each(function(i, el) {
  if(i  >=  3) return false;
  var name = $(this).children("title").text();
  var price = $(this).children("description").text();
 let embed = new Discord.MessageEmbed()
 .setTitle('NHKニュース')
 .setURL('http://www3.nhk.or.jp/news/')
 .addField(name,price)
 .setColor(Color)
 var results = [];
 results.push(embed)
  message.channel.send(results);
});
  });
} else if(args[0]){
  var options = {
    url: `http://www3.nhk.or.jp/rss/news/cat${args[0]}.xml`,
    method: 'GET'
}
  request(options, function (error, response, body) { 
 $ = che.load(body);

$("item").each(function(i, el) {
  if(i  >=  3) return false;
  var name = $(this).children("title").text();
  var price = $(this).children("description").text();
 let embed = new Discord.MessageEmbed()
 .setTitle(`NHKニュース|${ja}`)
 .setURL('http://www3.nhk.or.jp/news/')
 .addField(name,price)
 .setColor(Color)
 var results = [];
 results.push(embed)
  message.channel.send(results);
});
  });
} if(args[0] === "8") {
  var options = {
    url: 'https://news.yahoo.co.jp/pickup/computer/rss.xml',
    method: 'GET'
}
  request(options, function (error, response, body) { 
 $ = che.load(body);
$("item").each(function(i, el) {
  if(i  >=  3) return false;
  var name = $(this).children("title").text();
  var description = $(this).children("link").text()
 let embed = new Discord.MessageEmbed()
 .setTitle(name)
 .setURL(description)
 .setColor(Color)
 var results = [];
 results.push(embed)
  message.channel.send(results);
});
  });
} if(args[0] === "9"){
  var options = {
    url: 'https://www.gizmodo.jp/index.xml',
    method: 'GET'
}
  request(options, function (error, response, body) { 
 $ = che.load(body);
$("item").each(function(i, el) {
  if(i  >=  3) return false;
  var name = $(this).children("title").text();
  var description = $(this).children("description").text()
 let embed = new Discord.MessageEmbed()
 .setAuthor('ギズモード・ジャパン')
 .setTitle(name)
 .setDescription(description)
 .setColor(Color)
 var results = [];
 results.push(embed)
  message.channel.send(results);
});
  })
}
} if(command === "ec"){
  if(!args[0]){
    message.channel.send('例 ： !t ec 213191');
    return;
  } if(message.content.replace(/\s+/g, "").slice(5).match(/\D/)) {
    message.channel.send("半角数字にしてね");
    return;
  }
  var rep = message.content.replace(/\s+/g, "");
  var red = parseInt(rep.slice(5 , 7)).toString(16);
  var green = parseInt(rep.slice(8 , 9)).toString(16);
  var blue = parseInt(rep.slice(8 , 10)).toString(16);
let embed = new Discord.MessageEmbed()
.setTitle('←この色が出たよ！')
.setColor(red + green + blue)
.setDescription(`#${red}${green}${blue}`)
message.channel.send(embed)

} if(command === "gazo"){
  gis(message.content.replace(/\s+/g, "").slice(6).replace(/\s+/g, ""), logResults);
  function logResults(error, results) {
    if (error) {
      console.log(error);
    } else {
      var current = results[0];
      if(current.length === 0){ message.channel.send('画像が見つかりませんでした'); return;
      }
      let embed = new Discord.MessageEmbed()
      .setColor(Color)
      .setImage(current.url)
    message.channel.send(embed);
    }
  }
} if(command === "gazo1"){
  if(message.author.id !== config.ownerID) return;
   gis(message.content.replace(/\s+/g, "").slice(6).replace(/\s+/g, ""), logResults);
  function logResults(error, results) {
    if (error) {
      console.log(error);
    } else {
      var current = results[0];
      var push = 1;
      if(current.length === 0){ message.channel.send('画像が見つかりませんでした'); return; }
      while(push !== 20) {
      message.channel.send(results[push].url)
        push++
      }
    }
  }
}if(command === "wiki"){
  const wiki = require('wikijs').default({
    apiUrl : 'http://ja.wikipedia.org/w/api.php'
  });
  (async() => {
    const page = await wiki.page(message.content.replace(/\s+/g, "").slice(6));
    const content = await page.summary();
    message.channel.send("\`\`\`" +content + "\`\`\`")
  })()
  .catch(error => message.channel.send('記事が見つかりませんでした'))
} if(command === "moji"){
  message.channel.send(message.content.replace(/\s+/g, "").slice(6).length + "文字だね");
    }if (command === "gloall") {
      message.channel.send(client.channels.filter(m => m.name === "hajimete-chat").map(c => c.guild.name))
    } if(command === "vc") {
        if(!message.member.voice.channel) {
          message.channel.send('まずボイスチャンネルに入りましょう')
          return;
        }
      			const VoiceText = require('voicetext');
			var voice = new VoiceText(process.env.VTAPI);
			var now = message.createdTimestamp;  
			voice.speaker(voice.SPEAKER.SHOW).emotion(voice.EMOTION.HAPPINESS).emotion_level(voice.EMOTION_LEVEL.HIGH).volume(200).speak(`${message.content.slice(5)}`, (e, buf) => {
				if (e) {
					console.error(e);
					return;
				}
				fs.writeFile(`./${now}.wav`, buf, 'binary', e => {
					if (e) {
						console.error(e);
						return; 
					}
					const vc = message.member.voice.channel
					vc.join().then(connection => {　
                      				if (e) {
					console.error(e);
					return;
				}
						const dispatcher = connection.play(`./${now}.wav`);
						dispatcher.on('end', reason => {
							fs.unlink(`./${now}.wav`, err => {
								if (err) console.log(err);
							});
						});
					});
				});
			});
		} if (command === "input") {
  const filter = m => m.author.id === message.author.id;
  const body = await message.channel.awaitMessages(filter, {
    max: 1,
    time: 10000
  })
  if(body && body.size) {
   message.channel.send("結果:" + body.first().content) ;
  } else {
    message.channel.send("へんじがない。ただの屍のようだ")
  }
  }if(command === "nuke") {
    if(!message.member.permissions.has('MANAGE_CHANNELS')) return;
    message.channel.send('本当にやりますか？\nやる場合は \`YES\` やらない場合は \`NO\` と答えてください')
     const filter = m => m.author.id === message.author.id;
  const body = await message.channel.awaitMessages(filter, {
    max: 1,
    time: 10000
  })
  if(body.first().content === "YES") {
      let embed = new Discord.MessageEmbed()
  .setDescription("チャンネルを作り直しました")
      .setImage("https://gifimage.net/wp-content/uploads/2017/06/nuke-gif-6.gif")
  .setColor(Color)
    message.channel.delete()
message.channel.clone()
    .then(channel => channel.send(embed))
    .then(msg => msg.delete(10000))
    .catch(error => "チャンネルは....何一つ......作れませんでした........")
  }  else {
    message.channel.send('キャンセルしました');
  } 
  } if(command === "kuro") {
var builder = kuromoji.builder({
  // ここで辞書があるパスを指定します。今回は kuromoji.js 標準の辞書があるディレクトリを指定
  dicPath: 'node_modules/kuromoji/dict'
});

// 形態素解析機を作るメソッド
builder.build(function(err, tokenizer) {
  // 辞書がなかったりするとここでエラーになります(´・ω・｀)
  if(err) { throw err; }

  // tokenizer.tokenize に文字列を渡すと、その文を形態素解析してくれます。
  var tokens = tokenizer.tokenize(message.content.slice(7).trim());
  var result = [];
  for(var i = 0; i < tokens.length; i++){
   result.push(`
${tokens[i].surface_form},\
${tokens[i].pos},\
${tokens[i].pos_detail_1},\
${tokens[i].pos_detail_2},\
${tokens[i].pos_detail_3},\
${tokens[i].conjugated_type},\
${tokens[i].conjugated_form}\n`)
  }
  var result1 = result.join("")
  message.channel.send("\`\`\`" + result1 + "\`\`\`");
});
  }if(command === "base") {
 var b = new Buffer(message.content.slice(7).trim());
message.channel.send(b.toString('base64'));
  } if(command ==="basede") {
sleep(1 , function () {
  var b = new Buffer(message.content.slice(9).trim(), 'base64')
message.channel.send(b.toString());
})
  }　if(command === "q") {
         const filter = m => m.author.id === message.author.id;
        var q = ["次のうち、座り方を表すものはどれ?", 
                 "イは何行でしょう？" , 
                 "「忠臣蔵」に登場する四十七士は、もともと何藩の武士?"
                ,"正統的なことを英語でオーソドックスといいますが異端的なことを英語で何という？",
                "1549年、フランシスコ・ザビエルが日本に伝えたものはどれ?",
                "温泉地として知られる別府があるのは何県?",
                "アニメ「ちびまる子ちゃん」で、主人公・まる子は小学校何年生?"
                ,"マリモの産地として知られる北海道の湖はどれ?",
                "次のゲームクリエイターの中でかつてビックリマンシールの制作を手がけたという過去を持つのは？",
                " アニメ世界名作劇場の絵皿プレゼントキャンペーンが好評なコンビニチェーンは？",// 10
                "日本で最初に女子のプロ選手が誕生したスポーツは何?"
                ,"現在発行されている日本の紙幣の印刷で、最も多くの色が使われているものはどれ?",
                "太宰府天満宮に奉られている「学問の神様」と呼ばれる人物は誰?",
                "「鎌倉の大仏」があるのはどこ?",
                "マリリン・モンローが16歳で、最初に結婚した相手の職業はどれ?"
                ,"1976年６月に、当時のボクシング世界ヘビー級王者モハメド・アリと闘った日本人プロレスラーは誰？",
                 "「悪貨は良貨を駆逐する」という法則に名を残した、イギリスの財政家は誰?"//17
                ]
        var s = ["\n1. あぐら\n2. くしゃみ\n3. しゃっくり\n4. いびき",
                 "\n1. あ行 \n2. か行 \n3. さ行 \n4. た行" , 
                 "\n1. 備前 \n2. 摂津 \n3. 姫路 \n4. 赤穂",
                 "\n1. ヘテロドックス \n2. パラドックス \n3. ドグマドックス \n4. オーソドックス",
                 "\n1. カステラ\n2. キリスト教 \n3. 羅針盤\n4. 鉄砲",
                 " \n1. 熊本県\n2. 佐賀県 \n3. 宮崎県\n4. 大分県",
                 " \n1. 5年生\n2. 4年生\n3. 2年生\n4. 3年生",
                "\n1. 阿寒湖 \n2. 浜名湖\n3. 河口湖\n4. 琵琶湖"
                ,"\n1. 広井王子\n2. 堀井雄二\n3. 糸井重里\n4. 飯野賢治",
                "\n1. ミニストップ\n2. セブンイレブン\n3. ファミリーマート\n4. ローソン",// 10
                " \n1. プロレス\n2. 競馬\n3. 競輪\n4. ゴルフ",
                 "\n1. 二千円札\n2. 五千円札\n3. 千円札\n4. 一万円札",
                "\n1. 菅原道真\n2. 吉田松陰\n3. 本居宣長\n4. 杉田玄白",
                "\n1. 奈良県\n2. 神奈川県\n3. 千葉県\n4. 石川県",
                "\n 1. 舞台俳優\n2. 航空機整備士\n3. 小児科医\n4. 報道カメラマン",
                 "\n 1. ジャイアント馬場 \n2. ジャンボ鶴田\n 3.力道山\n 4.アントニオ猪木",
                 "\n 1. パーキンソン\n2. グレシャム\n3. サミュエルソン\n4. ケインズ"//17
                ]
        var a = ["1","1","4","1","2","4","4","1","1","2","3","1","1","2","2","4","2"]
        var q1 =  Math.floor(Math.random() * q.length);    
    message.channel.send(q[q1] + s[q1])
message.channel.awaitMessages(filter, {
    max: 1,
    time: 5 * 1000,
   errors: ['time']
  }).then(body => {
  if(body.first().content === a[q1]) {
message.channel.send('正解です！')
  }  else {
    message.channel.send('違います！！！正解は**' +a[q1]+'**でした！');
  } 
}).catch(err => message.channel.send('時間切れです！正解は**' + a[q1] + '**でした!'))
} if(command === "canvas") {
    var canvas = Canvas.createCanvas( 300, 300 );
    var ctx = canvas.getContext( '2d' );
	       ctx.globalAlpha = 0.5;

          let roundColor = () => {
            return Math.floor(Math.random() * 255);
          };

          for (let i = 0; i < 100; i++) {
            let x = Math.floor(Math.random() * 400);
            let y = Math.floor(Math.random() * 200);
            let r = Math.floor(Math.random() * 200);

            ctx.fillStyle = `rgb(${roundColor()}, ${roundColor()}, ${roundColor()})`;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, 2*Math.PI);
            ctx.stroke();
            ctx.fill();
          }
    ctx.font = 'bold 20px HG行書体';
    ctx.fillStyle = 'red';
    ctx.textAlign = 'left';

    ctx.fillText(message.author.username, 20, 20);
  ctx.fillStyle = 'red';
  ctx.textAlign = 'left';
    var b64 = canvas.toDataURL().split( ',' )[1];
    var buf = new Buffer( b64, 'base64' );
    fs.writeFile('xxx.png', buf, function(){
      message.channel.send({
        files: [{
          attachment: './xxx.png',
          name: 'canvas.png'
        }]
      })
    });
  } if(command === "canvas1"){
    var canvas = Canvas.createCanvas( 300, 300 );
    var ctx = canvas.getContext( '2d' );
  //. 斜めに赤い線が１本引いてあるだけの画像を作る
  ctx.beginPath();
  ctx.moveTo( 100, 100 );
  ctx.lineTo( 200, 200 );
  ctx.strokeStyle = 'red';
    ctx.stroke()
    ctx.beginPath();
    ctx.moveTo( 300, 200 );
    ctx.lineTo( 200, 500 );
    ctx.strokeStyle = 'red';
      ctx.stroke()
      ctx.beginPath();
      ctx.arc(200, 30, 50, 0/180*Math.PI, 360/180*Math.PI);
      ctx.stroke();
        let g = ctx.createLinearGradient(0, 0, 100, 100);
        g.addColorStop(0.0, 'red');
        g.addColorStop(0.5, 'blue');
        g.addColorStop(1.0, 'yellow');
        ctx.fillStyle = g;
        ctx.fillRect(10, 10, 100, 100);
        ctx.fillStyle = "#FF00FF";
        ctx.strokeStyle = "#0ff";
        ctx.beginPath();
        ctx.moveTo(50, 100);
        ctx.lineTo(250, 100);
        ctx.lineTo(85, 210);
        ctx.lineTo(150,30);
        ctx.lineTo(215, 210);
        ctx.lineTo(50,100);
        ctx.fill();
        ctx.stroke();
        var b64 = canvas.toDataURL().split( ',' )[1];
        var buf = new Buffer( b64, 'base64' );
        fs.writeFile('xxx.png', buf, function(){
          message.channel.send({
            files: [{
              attachment: './xxx.png',
              name: 'canvas.png'
            }]
          })
        });
  }
}); 
client.login(process.env['DISCORD_BOT_TOKEN']);
