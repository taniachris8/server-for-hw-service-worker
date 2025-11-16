import express from "express";
import cors from "cors";
import pino from "pino";
import pinoPretty from "pino-pretty";
import * as crypto from "crypto";

const app = express();
const logger = pino(pinoPretty());

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

app.get("/news", (req, res) => {

    const news = [
      {
        id: crypto.randomUUID(),
        date: Date.now(),
        image: "./img/1ljx_855v_201217.jpg",
        title: "Студия A24 объявила о новом триллере с Флоренс Пью",
      },
      {
        id: crypto.randomUUID(),
        date: Date.now(),
        image: "./img/srcimggwcn_vgqz_201218.jpg",
        title: "Том Харди возвращается в образе злодея в новом экшене Netflix",
      },
      {
        id: crypto.randomUUID(),
        date: Date.now(),
        image: "./img/srcimgprer_61wi_201217.jpg",
        title: "Пиксар работает над сиквелом “Души”",
      },
    ];

  const responseBody = {
    status: "ok",
    timestamp: Date.now(),
    news,
  };

  logger.info("New messages requested");
  res.status(200).json(responseBody);
});

const port = process.env.PORT || 7070;

const bootstrap = async () => {
  try {
    app.listen(port, () =>
      logger.info(`Server has been started on http://localhost:${port}`)
    );
  } catch (error) {
    console.error(error);
  }
};

bootstrap();
