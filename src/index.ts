import app from "./app";
import config from "./config";
import { initDB } from "./db";

const port = process.env.PORT || config.port;

const main = async () => {
  try {
    await initDB();

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Server failed:", error);
  }
};

main();
