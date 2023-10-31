const express = require('express');
const { run, insertData,searchData, showAll } = require('./mongodb');//conexion a mongo:
let bodyParser = require('body-parser');//Require body-parser (to receive post data from clients)  //npm i body-parser
const cors = require('cors'); // Importa el middleware CORS
const path = require('path');
const app = express();
const dirFrontEnd="../FrontEnd/ToDo/dist/to-do";
//conexion con mongo
run();
app.use(cors());
app.use(express.json());

// Configura la carpeta de archivos estáticos para los archivos generados por Angular
app.use(express.static(path.join(__dirname, dirFrontEnd)));

// Ruta para servir la aplicación Angular (manejo de SPA)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, dirFrontEnd));
});

//recibir datos json, si esperamos forma: bodyParser.urlencoded()
app.post('/',bodyParser.json(),async (req, res) => {
  const datos=req.body;
  if("search" in datos){
    console.log("search data: ",await searchData(datos.search));
    res.json(await searchData(datos.search));
  }
  else if("name" in datos)//para add
    insertData(datos);
  else{
    console.log("showAll")
    //await showAll();
    res.json(await showAll())    
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`La aplicación está corriendo en el puerto ${port}`);
});
