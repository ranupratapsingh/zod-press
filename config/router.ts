import express from "express";
import pingController from "../app/controllers/ping_controller";

const router = express.Router();
router.get('/ping', pingController.ping);

export default router;
