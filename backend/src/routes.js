import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import DeliverymanSessionController from './app/controllers/DeliverymanSessionController';
import UserController from './app/controllers/UserController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';
import PackageController from './app/controllers/PackageController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';
import DeliverymanProblemController from './app/controllers/DeliverymanProblemController';
import CancelDeliveryController from './app/controllers/CancelDeliveryController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// Store files flow
routes.post('/files', upload.single('file'), FileController.store);

// Admin Session
routes.post('/sessions', SessionController.store);

// Deliveryman Session
routes.post('/sessions/deliveryman', DeliverymanSessionController.store);

// Delivery control | Token is not needed
routes.get('/delivery/deliveryman/:id/deliveries', DeliveryController.index);
routes.get('/delivery/deliveryman/:id/delivered', DeliveryController.show);
routes.post('/delivery', DeliveryController.store);
routes.put('/delivery', DeliveryController.update);

// Delivery problems manager
routes.post('/delivery/:id/problems', DeliverymanProblemController.store);
routes.get('/delivery/:id/problems', DeliveryProblemController.show);

// Token authentication | Only admins
routes.use(authMiddleware);

// Admin accounts manager
routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.put('/users', UserController.update);
routes.delete('/users/:id', UserController.delete);

// Recipients register
routes.get('/recipients', RecipientController.index);
routes.get('/recipients/:id', RecipientController.show);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);

// Delivery men control
routes.get('/deliveryman', DeliverymanController.index);
routes.get('/deliveryman/:id', DeliverymanController.show);
routes.post('/deliveryman', DeliverymanController.store);
routes.put('/deliveryman/:id', DeliverymanController.update);
routes.delete('/deliveryman/:id', DeliverymanController.delete);

// Packages control
routes.get('/packages', PackageController.index);
routes.get('/packages/:id', PackageController.show);
routes.post('/packages', PackageController.store);
routes.put('/packages/:id', PackageController.update);
routes.delete('/packages/:id', PackageController.delete);

// Admin problems control
routes.get('/delivery/problems', DeliveryProblemController.index);

routes.delete('/problem/:id/cancel-delivery', CancelDeliveryController.delete);

export default routes;
