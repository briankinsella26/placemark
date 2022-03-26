/* eslint-disable no-await-in-loop */
import { assert } from "chai";
import { placemarkService } from "./placemark-service.js";
import { assertSubset } from "../test-utils.js";
import { ballyhealyCastle, testPlacemarks, maggie, maggieCredentials } from "../fixtures.js";

let user = null;

suite("placemark API tests", () => {

  setup(async () => {
    placemarkService.clearAuth();
    user = await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggieCredentials);
    await placemarkService.deleteAllplacemarks();
    await placemarkService.deleteAllUsers();
    user = await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggieCredentials);
  });

  teardown(async () => {});

  test("create placemark", async () => {
    const returnedplacemark = await placemarkService.createplacemark(ballyhealyCastle);
    assert.isNotNull(returnedplacemark);
    assertSubset(ballyhealyCastle, returnedplacemark);
  });

  test("delete a placemark", async () => {
    const placemark = await placemarkService.createplacemark(ballyhealyCastle);
    const response = await placemarkService.deleteplacemark(placemark._id);
    assert.equal(response.status, 204);
    try { 
      const returnedplacemark = await placemarkService.getplacemark(placemark.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No placemark with this id", "Incorrect Response Message");
    }
  });

  test("create multiple placemarks", async () => {
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      await placemarkService.createplacemark(testPlacemarks[i]);
    }
    let returnedLists = await placemarkService.getAllplacemarks();
    assert.equal(returnedLists.length, testPlacemarks.length);
    await placemarkService.deleteAllplacemarks();
    returnedLists = await placemarkService.getAllplacemarks();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant placemark", async () => {
    try {
      const response = await placemarkService.deleteplacemark("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No placemark with this id", "Incorrect Response Message");
    }
  });
});
