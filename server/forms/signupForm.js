const { CLIENT_ORIGIN } = require("../configs/serverConfig");

module.exports = {
  confirm: (id) => ({
    subject:
      "Bestätigen Sie Ihre E-Mail-Adresse für die erfolgreiche Anmeldung",
    html: `
      <a href='${CLIENT_ORIGIN}/bestaetigen/${id}'>
        Klicken Sie auf den Link, um die Bestätigung abzuschließen
      </a>
    `,
    text: `Copy and paste this link: ${CLIENT_ORIGIN}/bestaetigen/${id}`,
  }),
};
