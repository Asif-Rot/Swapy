const express = require("express");
const router = express.Router();

const tradeController = require('../controllers/trade');
/**
 * Router for trade
 */
router.post("/createTrade", tradeController.createTrade);
router.get("/userTrade/:userID",  tradeController.getAllUserTrades);
router.get("/allTrade",  tradeController.getAllTrades);
router.get("/oneTrade/:tradeID",  tradeController.getOneTrade);
router.delete("/:tradeID",  tradeController.deleteTrade);


module.exports = router;