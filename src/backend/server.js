import express from 'express';
import mongodb from 'mongodb';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
const dbUrl = 'mongodb://localhost:27017';
const dbName = 'crudwithredux';

function validateGame(game) {
  let errors = {};
  if (game.title === '') {
    errors.title = "Title can't be empty"
  }

  if (game.cover === '') {
    errors.cover = "Cover can't be empty"
  }
  let isValid = Object.keys(errors).length === 0;

  return { errors, isValid };
}

mongodb.MongoClient.connect(dbUrl, function(_err, client) {
  const db = client.db(dbName);

  app.get('/api/games', (req, res) => {
    db.collection('games').find({}).toArray((_err, games) => {
      res.json({ games });
    });
  });

  app.post('/api/games', (req, res) => {
    const { errors, isValid } = validateGame(req.body);
    if (isValid) {
      const { title, cover } = req.body;
      db.collection('games').insert({ title, cover }, (err, result) => {
        if (err) {
          res.status(500).json({ errors: { global: 'Something went wrong' } });
        } else {
          res.json({ game: result.ops[0] });
        }
      });
    } else {
      res.status(400).json({ errors });
    }
  });

  app.get(`/api/games/:id`, (req, res) => {
    db.collection('games').findOne({ _id: new mongodb.ObjectId(req.params.id) }, (_err, game) => {
      res.json({ game });
    });
  });

  app.put(`/api/games/:id/update`, (req, res) => {
    const { errors, isValid } = validateGame(req.body);
    if (isValid) {
      const { title, cover } = req.body;
      db.collection('games').findOneAndUpdate(
        { _id: new mongodb.ObjectId(req.params.id) },
        { $set: { title, cover } },
        { returnOriginal: false },
        (err, result) => {
          if (err) {
            res.status(500).json({ errors: { global: 'Something went wrong' } });
          } else {
            res.json({ game: result.value });
          }
        }
      );
    } else {
      res.status(400).json({ errors });
    }
  });

  app.delete(`/api/games/:id`, (req, res) => {
    db.collection('games').deleteOne(
      { _id: new mongodb.ObjectId(req.params.id) },
      (err, result) => {
        if (err) {
          res.status(500).json({ errors: { global: 'Something went wrong' } });
        } else {
          res.json({ }); // empty json object for delete
        }
    });
  });

  app.use((req, res) => {
    res.status(404).json({
      errors: {
        global: 'This endpoint is not implemented yet.'
      }
    });
  });

  app.listen(8080, () => console.log('Server running!!!'));
});
