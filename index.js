require("dotenv").config();

const prepareText = require("./prepareText");
const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

let ignore = true;
setTimeout(() => {
  ignore = false;
}, 1000);
bot.use((ctx, next) => {
  if (!ignore) {
    next();
  }
});

bot.start((ctx) =>
  ctx.reply(
    `Чтобы использовать этого бота, напишите "@${ctx.botInfo.username} _ваш текст_"`,
    {
      parse_mode: "Markdown",
    }
  )
);
bot.on("inline_query", (ctx) => {
  const results = [];
  if (ctx.inlineQuery.query) {
    const text = prepareText(ctx.inlineQuery.query, 5);
    results.push({
      type: "article",
      id: Math.random(),
      title: "Send glitchy text",
      description: text,
      input_message_content: {
        message_text: text,
      },
    });
  }
  ctx.answerInlineQuery(results);
});
bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
