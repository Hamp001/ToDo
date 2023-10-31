const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://hugo:cotrasena@webbapp.excgson.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
// Selecciona la base de datos
const database = client.db("prueba1");
// Selecciona la colección en la que deseas insertar datos
const collection = database.collection("tasks");

async function close(){
  await client.close();
}
async function run() {
  //try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("prueba1").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  //} finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  //}
}
async function insertData(documentToInsert) {
  try {
    // Inserta el documento en la colección
    const result = await collection.insertOne(documentToInsert); 
    console.log(`Documento insertado con éxito. ID del documento: ${result.insertedId}`);
  } catch (error) {
    console.error("Error al insertar el documento:", error);
  } 
}
async function searchData(dataToSearch){
  try{
    const result =await collection.findOne({name: dataToSearch});
    return result;
  }catch (error){
    console.error("Error en la consulta:",error);
  }
}
async function showAll(){
  try{
    const result=await collection.find().toArray()
    console.log(result)
    return result
  }catch(error){
    console.error("Error en la consulta",error)
  }
}
module.exports={
  run,
  searchData,
  insertData,
  showAll,
  close
}
