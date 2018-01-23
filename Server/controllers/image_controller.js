module.exports = {
  addImage(req, res) {
    const { user_id, image_url, image_text, category} = req.body;
    req.app
      .get("db")
      .add_image(user_id, image_url, image_text, category)
      .then(() => {
        res.status(200).send('OK');
      });
  }

  // editImage(req, res){
  //   req.app
  //     .get("db")
  //     .
  // }
};
