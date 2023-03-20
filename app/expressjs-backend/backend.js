const express = require("express");
const cors = require("cors");
const multer = require("multer");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

// Add mongdb user services
const listServices = require("./models/task-services");

const app = express();
const port = 5000;
const APP_VERSION = "1.0.0";

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Hello World! - node backend app version ${APP_VERSION}`);
});

app.get('/lists', async (req, res) => {
  const { userUuid } = req.query;
  try {
    const lists_from_db = await listServices.getLists(userUuid);
    res.send({ tasks_list: lists_from_db });
  } catch (error) {
    console.log('Mongoose error: ' + error);
    res.status(500).send('An error ocurred in the server.');
  }
});

app.get('/lists/:id', async (req, res) => {
  const id = req.params['id']; //or req.params.id
  let result = await listServices.findListById(id);
  if (result === undefined || result === null)
    res.status(404).send('Resource not found.');
  else
    res.send({ tasks_list: result });
});

app.post('/lists/:id', async (req, res) => {
    console.log("received post request");
    const id = req.params['id']; //or req.params.id
    let result = await listServices.findListById(id);
    if (result === undefined || result === null)
        res.status(404).send('Resource not found.');
    else {
        result.status = req.body.status;
        await listServices.updateList(id, result);
        res.send({ tasks_list: result });
    }
});

app.post("/lists", async (req, res) => {
  console.log("received post request")
  const list = req.body;
  const savedList = await listServices.addList(list);
  if (savedList)
    res.status(201).send(savedList);
  else
    res.status(500).end();
});

app.delete("/lists/:id", async (req, res) => {
  console.log("received delete request");
  const id = req.params["id"];
  console.log(id);
  if (await listServices.deleteList(id))
    res.status(204).end();
  else
    res.status(404).send("Resource not found.");
});

/*image requests start here*/

// Configure multer to store uploaded files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Add middleware to parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Define a route for handling image uploads
app.post('/upload', upload.single('image'), async (req, res, next) => {
  console.log("received post request");
  // Create a new image from the request data
  const newImage = {
    name: req.body.name,
    data: req.file.buffer,
    contentType: req.file.mimetype
  }

  if (await listServices.addImage(newImage))
    res.status(200).end();
  else
    res.status(505).send("Resource not found.");
});

// Define a route for retrieving images
app.get('/images/:id', (req, res, next) => {
  // Find the image by ID in MongoDB
  Image.findById(req.params.id, (err, image) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (!image) {
      return res.status(404).send('Image not found');
    }

    // Send the image data as a response with the appropriate Content-Type header
    const formattedImage = (image => ({
      _id: image._id.toString(),
      data: image.data.toString('base64'),
      contentType: image.contentType,
      filename: image.filename,
    }));
    res.send(formattedImage(image));
  });
});

app.get('/images', async (req, res) => {
  try {
    const images = await listServices.getImages();
    const formattedImages = images.map(image => ({
      _id: image._id.toString(),
      data: image.data.toString('base64'),
      contentType: image.contentType,
      filename: image.filename,
    }));
    res.send(formattedImages);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.delete('/images/:id', async (req, res) => {
  console.log("received delete request");
  const id = req.params["id"];
  console.log(id);
  if (await listServices.deleteImageById(id))
    res.status(204).end();
  else
    res.status(404).send("Resource not found.");
});

//image requests end here

app.listen(process.env.PORT || port, () => {
  if (process.env.PORT) {
    console.log(
      `REST API Version ${APP_VERSION} is listening on port: ${process.env.PORT}.`
    );
  } else {
    console.log(
      `REST API Version ${APP_VERSION} is listening on port: ${port}.`
    );
  }
});
