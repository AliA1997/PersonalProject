let messages = [];
let id = 0;

module.exports = {
    create: ( req, res ) => {
      const { text } = req.body;
      const {user} = req.session;
      messages.push({ id, text });
      user.messages.push({id, text});
      id++;
      res.status(200).send( messages );
    }
}