const mongoose = require("mongoose");
const ListSchema = require("./list");
const listServices = require("./task-services");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;
let conn;
let listModel;

test_Uuid = "2170dca8-0ab6-4694-bcae-2848324df036";
test_id = '641255920462342686b13c54';
test_image = "640d23cc77710828a4c168b5";

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    conn = await mongoose.createConnection(uri, mongooseOpts);

    listModel = conn.model("List", ListSchema);

    listServices.setConnection(conn);
});

afterAll(async () => {
    await conn.dropDatabase();
    await conn.close();
    await mongoServer.stop();
});

beforeEach(async () => {
    let dummyList = {
        userUuid: test_Uuid,
        title: "School",
        items: ["presentation on friday"],
        image: test_image,
        status: ["0"],
        priority: ["low"]
    };
    let result = new listModel(dummyList);
    await result.save();
});

afterEach(async () => {
    await listModel.deleteMany();
});

test("Fetching all list with Uuid", async () => {
    const lists = await listServices.getLists(test_Uuid);
    expect(lists).toBeDefined();
    expect(lists.length).toBeGreaterThan(0);
});

test("Fetching by invalid id format", async () => {
    const anyId = "123";
    const list = await listServices.findListById(anyId);
    console.log(list);
    expect(list).toBeNull();
});

test("Fetching by valid id and not finding", async () => {
    const anyId = "6132b9d47cefd0cc1916b6a9";
    const list = await listServices.findListById(anyId);
    expect(list).toBeNull();
});

test("Fetching by valid id and finding", async () => {
    const dummyList = {
        userUuid: test_Uuid,
        title: "School",
        items: ["presentation on friday"],
        image: test_image,
        status: ["0"],
        priority: ["low"]
    };
    const result = new listModel(dummyList);
    const addedlist = await result.save();
    const foundlist = await listServices.findListById(addedlist._id);
    expect(foundlist).toBeDefined();
    expect(foundlist.id).toBe(addedlist.id);
    expect(foundlist.title).toBe(addedlist.title);
    expect(foundlist.items).toStrictEqual(addedlist.items);
});

test("Adding user -- successful path", async () => {
    const dummyList = {
        userUuid: test_Uuid,
        title: "School",
        items: ["presentation on friday"],
        image: test_image,
        status: ["0"],
        priority: ["low"]
    };
    const result = await listServices.addList(dummyList);
    expect(result).toBeTruthy();
    expect(result.title).toBe(dummyList.title);
    expect(result.items).toStrictEqual(dummyList.items);
    expect(result).toHaveProperty("_id");
});

test("Adding user -- failure path with no title", async () => {
    const dummyList = {
        userUuid: test_Uuid,
        items: ["presentation on friday"],
        image: test_image,
        status: ["0"],
        priority: ["low"]
    };
    await expect(listServices.addList(dummyList)).rejects.toThrowError(
        "List validation failed: title: Path `title` is required."
    );
});

test("Adding user -- failure path with empty title", async () => {
    const dummyList = {
        userUuid: test_Uuid,
        title: "",
        items: ["presentation on friday"],
        image: test_image,
        status: ["0"],
        priority: ["low"]
    };
    await expect(listServices.addList(dummyList)).rejects.toThrowError(
        "List validation failed: title: Path `title` is required."
    );
});

test("Adding user -- failure path with no items", async () => {
    const dummyList = {
        userUuid: test_Uuid,
        title: "School",
        image: test_image,
        status: ["0"],
        priority: ["low"]
    };
    await expect(listServices.addList(dummyList)).rejects.toThrowError(
        "List validation failed: items: List cannot be empty."
    );
});

test("Deleting a user by Id -- successful path", async () => {
    const dummyList = {
        userUuid: test_Uuid,
        title: "School",
        items: ["presentation on friday"],
        image: test_image,
        status: ["0"],
        priority: ["low"]
    };
    const result = new listModel(dummyList);
    const addedlist = await result.save();
    const deleteResult = await listServices.deleteList({ _id: addedlist._id });
    expect(deleteResult).toBeTruthy();
});

test("Deleting a user by Id -- inexisting id", async () => {
    const anyId = "6132b9d47cefd0cc1916b6a9";
    const deleteResult = await listServices.deleteList({ _id: anyId });
    expect(deleteResult).toBeNull();
});

test("Fetching all Images", async () => {
    const result = await listServices.getImages();
    expect(result).toBeTruthy();
});

test("adding a image by Id", async () => {
    const dummyImage = {
        data:'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
        contentType:"image/png"
    }
    const result = await listServices.addImage(dummyImage);
    expect(result).toBeTruthy();
});

test("Deleting a image by Id", async () => {
    const dummyImage = {
        data:'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
        contentType:"image/png"
    }
    const result = await listServices.addImage(dummyImage);
    const deleteResult = await listServices.deleteImageById(result.id);
    expect(deleteResult).toBeTruthy();
});

test("Updating a list by Id", async () => {
    const dummyList = {
        userUuid: test_Uuid,
        title: "School",
        items: ["presentation on friday"],
        image: test_image,
        status: ["0"],
        priority: ["low"]
    };
    const result = new listModel(dummyList);
    const addedlist = await result.save();
    const updateResult = await listServices.updateList(addedlist._id, dummyList);
    expect(updateResult).toBeTruthy();
});