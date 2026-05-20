import app from "./app";
import config from "./config";


const port = config.port

const main = async () => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

main()