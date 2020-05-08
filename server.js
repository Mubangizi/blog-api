const express = require('express'),
swaggerUi = require('swagger-ui-express'),
apiDocumentation = require('./api_docs.json'),
bodyParser = require("body-parser");

const createApp = (app_instance) =>{
  // environment variables
  process.env.NODE_ENV = app_instance || 'development';
  // config variables
   require('./app/config/config.js');
  const app = express();

  routes = require("./app/routes");

  app.use(bodyParser.json());

  routes(app);

  app.listen(global.gConfig.node_port, () => {
      console.log(`${global.gConfig.config_id} server running on port ${global.gConfig.node_port}`);
  });
  
  return app;
}


const app = createApp(process.env.NODE_ENV);

// api documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDocumentation));


module.exports = app;

