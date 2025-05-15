const routes = require('express').Router();

const baseController = require('../controllers');
const contactsRouter = require('./contacts');

routes.get('/', baseController.getName);
routes.use('/contacts', contactsRouter);

module.exports = routes;