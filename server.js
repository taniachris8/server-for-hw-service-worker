import express from "express";
import cors from "cors";
import pino from "pino";
import pinoPretty from "pino-pretty";
import * as crypto from "crypto";
import { faker } from "@faker-js/faker";


const app = express();
const logger = pino(pinoPretty());

app.use(cors());
app.use(express.json());
app.use("/img", express.static("img"));

function createRandomNews() {
  return {
    date: faker.date.recent({ days: 10 }),
    image: faker.image.urlPicsumPhotos({ width: 750, height: 450 }),
    title: faker.lorem.sentence(),
  };
}

app.get("/news", (req, res) => {
    const news = faker.helpers.multiple(createRandomNews, {
      count: 3,
    });

  const responseBody = {
    status: "ok",
    news,
  };

  logger.info("News requested");
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
