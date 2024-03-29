const express = require("express");
const router = express.Router();

const itemsController = require('../controllers/items');

router.post("/additem/:userId", itemsController.add_newItem);

router.put("/updateitem/:itemId", itemsController.update_item);

router.get("/allitem", itemsController.all_item);

router.get("/getitembytype/:itemType", itemsController.item_bytype);

router.get("/getitembyuser/:userId", itemsController.item_byuser);

router.get("/countitem", itemsController.count_item);

router.get("/getitembyuser/:userId/:itemType", itemsController.item_byusertype);

router.get("/getitembygenreconsole/:genre/:console", itemsController.item_bygenreconsole);

router.get("/getitembyconsole/:console", itemsController.item_byconsole);

router.get("/:itemId", itemsController.one_item);

router.delete("/:itemId", itemsController.delete_item);

module.exports = router;