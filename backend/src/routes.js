import { Router } from 'express';
import multer from 'multer';

import bruteFroce from './config/brute';
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

import validateDeliverymanSession from './app/validators/Session/DeliverymanStore';
import validateUserSession from './app/validators/Session/UserStore';
import validateUserStore from './app/validators/User/Store';
import validateUserUpdate from './app/validators/User/Update';
import validateRecipientStore from './app/validators/Recipient/Store';
import validateRecipientUpdate from './app/validators/Recipient/Update';
import validatePackageStore from './app/validators/Package/Store';
import validatePackageUpdate from './app/validators/Package/Update';
import validateDeliverymanProblemStore from './app/validators/DeliverymanProblem/Store';
import validateDeliverymanStore from './app/validators/Deliveryman/Store';
import validateDeliverymanUpdate from './app/validators/Deliveryman/Update';
import validateDeliveryStore from './app/validators/Delivery/Store';
import validateDeliveryUpdate from './app/validators/Delivery/Update';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// Store files flow
routes.post('/files', upload.single('file'), FileController.store);

// Admin Session
routes.post(
  '/sessions',
  bruteFroce.prevent,
  validateUserSession,
  SessionController.store
);

// Deliveryman Session
routes.post(
  '/sessions/deliveryman',
  bruteFroce.prevent,
  validateDeliverymanSession,
  DeliverymanSessionController.store
);

// Delivery control | Token is not needed
routes.get('/delivery/deliveryman/:id/deliveries', DeliveryController.index);
routes.get('/delivery/deliveryman/:id/delivered', DeliveryController.show);
routes.post('/delivery', validateDeliveryStore, DeliveryController.store);
routes.put('/delivery', validateDeliveryUpdate, DeliveryController.update);

// Delivery problems manager
routes.post(
  '/delivery/:id/problems',
  validateDeliverymanProblemStore,
  DeliverymanProblemController.store
);
routes.get('/delivery/:id/problems', DeliveryProblemController.show);

// Token authentication | Only admins
routes.use(authMiddleware);

// Admin accounts manager
routes.get('/users', UserController.index);
routes.post('/users', validateUserStore, UserController.store);
routes.put('/users', validateUserUpdate, UserController.update);
routes.delete('/users/:id', UserController.delete);

// Recipients register
routes.get('/recipients', RecipientController.index);
routes.get('/recipients/:id', RecipientController.show);
routes.post('/recipients', validateRecipientStore, RecipientController.store);
routes.put(
  '/recipients/:id',
  validateRecipientUpdate,
  RecipientController.update
);
routes.delete('/recipients/:id', RecipientController.delete);

// Delivery men control
routes.get('/deliveryman', DeliverymanController.index);
routes.get('/deliveryman/:id', DeliverymanController.show);
routes.post(
  '/deliveryman',
  validateDeliverymanStore,
  DeliverymanController.store
);
routes.put(
  '/deliveryman/:id',
  validateDeliverymanUpdate,
  DeliverymanController.update
);
routes.delete('/deliveryman/:id', DeliverymanController.delete);

// Packages control
routes.get('/packages', PackageController.index);
routes.get('/packages/:id', PackageController.show);
routes.post('/packages', validatePackageStore, PackageController.store);
routes.put('/packages/:id', validatePackageUpdate, PackageController.update);
routes.delete('/packages/:id', PackageController.delete);

// Admin problems control
routes.get('/delivery/problems', DeliveryProblemController.index);

routes.delete('/problem/:id/cancel-delivery', CancelDeliveryController.delete);

export default routes;
