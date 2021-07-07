require('dotenv-flow').config();
const accessTokenSecret='SD@FD{S=*(^dsv$bm%dl&kf}';
let cookierParser = require('cookie-parser');
let express = require('express');
let PublicAPI = require('./publicAPI.js');
let app = express();
let httpServerPort = process.env["HTTP_PORT"];
//================================================================
/*****************************************************************/
/* if the server is connected to the internet via a web server   */
/* that have SSL cert,use the following 2 statements to start    */ 
/* the backend                                                   */    
/*****************************************************************/
let http =require('http');
let httpServer= http.createServer(app);
let publicAPIRouter= express.Router();
let publicAPI=new PublicAPI();

console.log(process.env.NODE_ENV+" Mode");
console.log("DB server name="+process.env.DATABASE_HOST);
//================================================================
app.use(express.urlencoded({extended: true}));
app.use(express.json()); // parse application/json, basically parse incoming Request Object as a JSON Object 
app.use(cookierParser(accessTokenSecret)); //signed cookie key
app.use('/publicAPI',publicAPIRouter);

publicAPIRouter.get('/genReport',publicAPI.genReport);
publicAPIRouter.get('/getCategoryList',publicAPI.getCategoryList);
publicAPIRouter.get('/getIncidentStat',publicAPI.getIncidentStat);
publicAPIRouter.get('/getSystemList',publicAPI.getSystemList);
publicAPIRouter.post('/saveBaseCount',publicAPI.saveBaseCount);
publicAPIRouter.post('/saveIncidentList',publicAPI.saveIncidentList);

httpServer.listen(httpServerPort, function() {
    console.log('server up and running at %s port', httpServerPort);
});