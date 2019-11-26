var express = require('express');
var router = express.Router();

var CastleSdk= require('@castleio/sdk');

// Read Synchrously
var database = require("./dataBase.json");
const castle = new CastleSdk.Castle({ apiSecret: 'JD465z26NzbCeaX7d3z5pijmsbG2Ughy'});


/* GET users listing. */
router.post("/", async (req, res) => {

  /*
  var response = await castle.authenticate({
    event: CastleSdk.EVENTS.LOGIN_SUCCEEDED,
    user_id: req.body.username,
    user_traits: {
      username: req.body.username,
      registered_at: "2015-02-23T22:28:55.387Z",
    },
    context: {
      ip: req.ip,
      client_id: req.cookies['__cid'],
      headers: req.headers,
    },
  }).catch((err) => { console.error(err); });

  console.log(response)
  */
  for (const user of database.users) {
    if (req.body.username ===  user.username && req.body.password ===  user.password) {
      var response = await castle.authenticate({
        event: CastleSdk.EVENTS.LOGIN_SUCCEEDED,
        user_id: req.body.username,
        user_traits: {
          username: req.body.username,
          registered_at: "2015-02-23T22:28:55.387Z",
        },
        context: {
          ip: req.ip,
          client_id: req.cookies['__cid'],
          headers: req.headers,
        },
      }).catch((err) => { console.error(err); res.status(400).send(false) });
      return res.status(200).send(response);
    }
  }

  castle.track({
    event: CastleSdk.EVENTS.LOGIN_FAILED,
    user_id: req.body.username,
    user_traits: {
      username: req.body.username,
      registered_at: "2015-02-23T22:28:55.387Z",
    },
    context: {
      ip: req.ip,
      client_id: req.cookies['__cid'],
      headers: req.headers,
    },
  });
  res.status(400).send(false);
});



module.exports = router;
