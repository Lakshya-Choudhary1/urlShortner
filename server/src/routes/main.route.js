import express from 'express';
import urlRoute from './route/url.route.js';
import userRoute from "./route/user.route.js";

const router = express.Router();

router.use('/url',urlRoute);
router.use("/user",userRoute)

export default router;