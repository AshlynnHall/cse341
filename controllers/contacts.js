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

const createContact = async (req, res) => {
  const db = req.app.locals.db;
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;
  if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  const result = await db.collection('contacts').insertOne({
    firstName,
    lastName,
    email,
    favoriteColor,
    birthday
  });
  res.status(201).json({ id: result.insertedId });
};

const updateContact = async (req, res) => {
  const db = req.app.locals.db;
  const userId = new ObjectId(req.params.id);
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;
  if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  const result = await db.collection('contacts').replaceOne(
    { _id: userId },
    { firstName, lastName, email, favoriteColor, birthday }
  );
  if (result.matchedCount === 0) {
    return res.status(404).json({ message: 'Contact not found.' });
  }
  res.status(204).send();
};

const deleteContact = async (req, res) => {
  const db = req.app.locals.db;
  const userId = new ObjectId(req.params.id);
  const result = await db.collection('contacts').deleteOne({ _id: userId });
  if (result.deletedCount === 0) {
    return res.status(404).json({ message: 'Contact not found.' });
  }
  res.status(204).send();
};

module.exports = { getAll, getSingle, createContact, updateContact, deleteContact };