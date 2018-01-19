module.exports = {
  addImage(req, res) {
    const { user_id, image_url, image_text } = req.params;
    req.app
      .get("db")
      .add_image(user_id, image_url, image_text)
      .then(() => {
        view_image(user_id).then(images => {
          res.send(info);
        });
      });
  }
};
