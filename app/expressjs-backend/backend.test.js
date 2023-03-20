// Add mongdb user services
const listServices = require("./models/task-services");

test_Uuid = "2170dca8-0ab6-4694-bcae-2848324df036";
test_id = '641255920462342686b13c54';
test_image = "640d23cc77710828a4c168b5";

test("test getList - all by userUuid", async () => {
    const result = await listServices.getLists(test_Uuid);

    // expected = {  
    //    _id: ObjectId("6412502d20d2e72df61eb617"),
    //    title: "Groceries",
    //    items: Array
    //      0: "Milk"
    //      1: "Eggs"
    //      2: "Banana"
    //      3: "Chicken"
    //    image: "640d23cc77710828a4c168b5"
    //    userUuid: "2170dca8-0ab6-4694-bcae-2848324df036"
    //  };

    expect(result).toBeTruthy();
});

test("test findListById notfound", async () => {
    const result = await listServices.findListById('6412502d20d2e72df61eb618');
    console.log("findListById result: " + result);

    expect(result).toBe(null);
});

test("test findListById Groceries", async () => {
    list = { 
        userUuid: test_Uuid, 
        title: "Groceries", 
        items: ["Milk"], 
        image: test_image,
        status: ["0"],
        priority: ["low"] };
    const add = await listServices.addList(list);
    const id = add._id;
    const result = await listServices.findListById(id);
    console.log("findListById result: " + result);

    expect(result.title).toBe("Groceries");
});

test("test addList error missing items", async () => {
    list = { userUuid: test_Uuid, title: "School", image: test_image };

    // expected = {  
    //    _id: ObjectId("6412502d20d2e72df61eb617"),
    //    title: "School",
    //    items: missing
    //    image: "640d23cc77710828a4c168b5"
    //    userUuid: "2170dca8-0ab6-4694-bcae-2848324df036"
    //  };

    await expect(listServices.addList(list)).rejects.toThrowError(
        "List validation failed: items: List cannot be empty."
    );
});

test("test addList error missing title", async () => {
    list = { userUuid: test_Uuid, items: ["presentation on friday"], image: test_image };

    // expected = {  
    //    _id: ObjectId("6412502d20d2e72df61eb617"),
    //    title: missing,
    //    items: Array
    //      0: "presentation on friday"
    //    image: "640d23cc77710828a4c168b5"
    //    userUuid: "2170dca8-0ab6-4694-bcae-2848324df036"
    //  };

    await expect(listServices.addList(list)).rejects.toThrowError(
        "List validation failed: title: Path `title` is required."
    );
});

test("test addList School, presentation on friday", async () => {
    list = { 
        userUuid: test_Uuid, 
        title: "School", 
        items: ["presentation on friday"], 
        image: test_image,
        status: ["0"],
        priority: ["low"] };
    const add = await listServices.addList(list);
    test_id = add._id;
    const result = await listServices.findListById(test_id);
    // expected = {  
    //    _id: ObjectId("6412502d20d2e72df61eb617"),
    //    title: "School",
    //    items: Array
    //      0: "presentation on friday"
    //    image: "640d23cc77710828a4c168b5"
    //    userUuid: "2170dca8-0ab6-4694-bcae-2848324df036"
    //  };
    expect(result.title).toBe("School");
});

test("test deleteList  School", async () => {
    const result = await listServices.findListById(test_id);
    console.log("deleteList result:" + result);
    const del = await listServices.deleteList(test_id);

    // expected = {  
    //    _id: ObjectId("6412502d20d2e72df61eb617"),
    //    title: "Groceries",
    //    items: Array
    //      0: "Milk"
    //      1: "Eggs"
    //      2: "Banana"
    //      3: "Chicken"
    //    image: "640d23cc77710828a4c168b5"
    //    userUuid: "2170dca8-0ab6-4694-bcae-2848324df036"
    //  };
    const after_result = await listServices.getLists(test_Uuid);

    expect(after_result[0].title).toBe("Groceries");
});

// afterAll(async () => {
//   await userServices.disconnectDB();
// });