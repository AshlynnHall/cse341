const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  const db = req.app.locals.db;
  const contacts = await db.collection('contacts').find().toArray();
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(contacts);
};

const getSingle = async (req, res) => {
  const db = req.app.locals.db;
  const userId = new ObjectId(req.params.id);
  const contact = await db.collection('contacts').findOne({ _id: userId });
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(contact);
};

module.exports = { getAll, getSingle };