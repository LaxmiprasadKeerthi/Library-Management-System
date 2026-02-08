const express = require("express");
const router = express.Router();
const { getStatus } = require("../controllers/statusController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getStatus);

module.exports = router;
