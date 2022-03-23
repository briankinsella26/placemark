import { assert } from "chai";
import {testPlacemarks, ballyhealyCastle, barygyCastle} from "../fixtures.js"
import { db } from "../../src/models/db.js";
import { assertSubset } from "../test-utils.js";

suite("Placemark Model tests", () => {

  setup(async () => {
    db.init("mongo");
    await db.placemarkStore.deleteAllPlacemarks();
    for (let i = 0; i < testPlacemarks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPlacemarks[i] = await db.placemarkStore.addPlacemark(testPlacemarks[i]);
    }
  });

  test("create a placemark", async () => {
    const newPlacemark = await db.placemarkStore.addPlacemark(ballyhealyCastle);
    assertSubset(ballyhealyCastle, newPlacemark);
  });

  test("get a placemark - success", async () => {
    const placemark = await db.placemarkStore.addPlacemark(barygyCastle);
    const newPlacemark = await db.placemarkStore.getPlacemarkById(placemark._id);
    assert.equal(barygyCastle.name, newPlacemark.name)
  });

  test("get a placemark - bad params", async () => {
    assert.isNull(await db.placemarkStore.getPlacemarkById(""));
    assert.isNull(await db.placemarkStore.getPlacemarkById());
  });


  test("update a placemark - success", async () => {
    const placemark = await db.placemarkStore.addPlacemark(ballyhealyCastle);
    await db.placemarkStore.editPlacemark(ballyhealyCastle, barygyCastle);
    const updatedPlacemark = await db.placemarkStore.getPlacemarkById(placemark._id);
    assert.equal(updatedPlacemark.name, barygyCastle.name)
  });

  test("delete a placemark - success", async () => {
    const placemark = await db.placemarkStore.addPlacemark(barygyCastle);
    const allPlacemarks = await db.placemarkStore.getAllPlacemarks();
    await db.placemarkStore.deletePlacemarkById(placemark._id);
    const remainderPlacemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(remainderPlacemarks.length, allPlacemarks.length - 1);
    const deletedPlacemark = await db.placemarkStore.getPlacemarkById(placemark._id);
    assert.isNull(deletedPlacemark);
  });

  test("delete all placemarks - success", async () => {
    await db.placemarkStore.deleteAllPlacemarks();
    const remainginPlacemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(remainginPlacemarks.length, 0);
  });

  test("delete one placemark - fail", async () => {
    await db.placemarkStore.deletePlacemarkById("bad-id");
    const placemarks = await db.placemarkStore.getAllPlacemarks();
    assert.equal(placemarks.length, testPlacemarks.length);
  });


})