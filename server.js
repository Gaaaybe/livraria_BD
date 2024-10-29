import "dotenv/config";
import app from "./src/app.js";
import logger from "./src/config/logger.js";

const PORT = 3001;

app.listen(PORT, () => {
    logger.log('info', `Servidor rodando no link http://localhost:${PORT}/`);
});