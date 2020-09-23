const User = require("../database/User");
const msgs = require("../notifications/newUserNotifications");

exports.emailConfirm = (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      if (!user) {
        res.json({ msg: msgs.nichtgefunden });
      } else if (user && !user.confirmed) {
        User.findByIdAndUpdate(id, { confirmed: true })
          .then(() => res.json({ msg: msgs.bestaetigt }))
          .catch((err) => console.log(err));
      } else {
        res.json({ msg: msgs.schonbestaetigt });
      }
    })
    .catch((err) => console.log(err));
};
