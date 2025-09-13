import express from 'express';
import pingController from '../app/controllers/ping_controller.ts';
import productsController from '../app/controllers/products_controller.ts';

const router = express.Router();
router.get('/ping', pingController.ping);
router.get('/products', productsController.index);

export default router;
