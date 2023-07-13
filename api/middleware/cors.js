const cors = require("cors");
const corsConfig = require("../config/cors.config.js");

corsMiddleware = (req, res) => {
    return cors(corsConfig)
};

module.exports = corsMiddleware;