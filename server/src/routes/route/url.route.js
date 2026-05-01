import express from "express";
import { createUrl ,getUserUrls , toggleUrlStatus} from "../../controllers/url.controller.js";
import verifyUser from "../../middleware/verifyUser.middleware.js";

const urlRoute = express.Router();

urlRoute.post("/create",createUrl);
urlRoute.get('/all',verifyUser,getUserUrls);
urlRoute.get("/toggleUrlStatus/:id",verifyUser,toggleUrlStatus);

export default urlRoute;