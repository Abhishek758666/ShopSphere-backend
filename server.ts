import app from "./src/app";
import { envConfig } from "./src/config/envConfig";

const startServer = () => {
  const port = envConfig.PORT || 8001;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer();
