const mongoose = require("mongoose");
const ListSchema = require("./list");
const dotenv = require("dotenv");

// Create a schema for the images
const imageSchema = new mongoose.Schema({
  name: String,
  data: Buffer,
  contentType: String
});

dotenv.config();

// Uncomment the following to debug mongoose queries, etc.
//mongoose.set("debug", true);

let dbConnection;

function setConnection(newConn) {
  dbConnection = newConn;
  return dbConnection;
}

function getDbConnection() {
  if (!dbConnection) {
    dbConnection = mongoose.createConnection(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  return dbConnection;
}

// mongoose
//   .connect(
//     "mongodb+srv://" +
//     process.env.MONGO_USER +
//     ":" +
//     process.env.MONGO_PWD +
//     "@" +
//     process.env.MONGO_CLUSTER +
//     "/" +
//     process.env.MONGO_DB +
//     "?retryWrites=true&w=majority",
//     {
//       useNewUrlParser: true, //useFindAndModify: false,
//       useUnifiedTopology: true,
//     }
//   )
//   .catch((error) => console.log(error));

async function getImages() {
  const Image = getDbConnection().model("Image", imageSchema);
  return await Image.find();
}

async function addImage(newImage){
  const Image = getDbConnection().model("Image", imageSchema);

  const imageToAdd = new Image(newImage);

  const savedImage = await imageToAdd.save();
  return savedImage;

}

async function deleteImageById(id) {
  const Image = getDbConnection().model("Image", imageSchema);
  return await Image.findByIdAndDelete(id);
}

async function getLists(userUuid) {
  const listModel = getDbConnection().model("List", ListSchema);
  return await listModel.find({ userUuid: userUuid });
}


async function findListById(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  const listModel = getDbConnection().model("List", ListSchema);
  // try {
  return await listModel.findById(id);
  // } catch (error) {
  //   console.log(error);
  //   return false;
  // }
}

async function addList(list) {
  const listModel = getDbConnection().model("List", ListSchema);
  // try {
  const listToAdd = new listModel(list);
  const savedList = await listToAdd.save();
  return savedList;
  // } catch (error) {
  //   console.log(error);
  //   return false;
  // }
}

async function updateList(id, list) {
  const listModel = getDbConnection().model("List", ListSchema);
  return await listModel.findByIdAndUpdate(id, list, { new: true });
}



async function deleteList(id) {

  const listModel = getDbConnection().model("List", ListSchema);
  return await listModel.findByIdAndDelete(id);
}

module.exports = {
  getImages,
  addImage,
  deleteImageById,
  getLists,
  findListById,
  addList,
  deleteList,
  setConnection,
  updateList,
};
