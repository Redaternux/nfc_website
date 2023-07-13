
const itemsRoutes = require('./items.routes');


module.exports = function(app) {

    app.use("/api/items", itemsRoutes);

  };
