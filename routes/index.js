const express = require('express');
const router = express.Router();

 
router.use("/admain",require("../controller/admainUser"))
router.use("/category",require("../controller/category"))
router.use("/news",require("../controller/news"))
router.use("/swiper",require("../controller/swiper"))
router.use("/topic",require("../controller/topic"))
router.use("/comment",require("../controller/comment"))

router.use("/demo",require("../controller/loginJwt"))
router.use("/demonews",require("../controller/getNewsJwt"))

module.exports = router;
