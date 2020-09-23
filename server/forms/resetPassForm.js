const { CLIENT_ORIGIN } = require("../configs/serverConfig");

module.exports = {
  confirm: (id) => ({
    subject:
      "Bestätigen Sie Ihre E-Mail-Adresse, um Ihr Passwort zurückzusetzen",
    html: `
      <a href='${CLIENT_ORIGIN}/confirm/email/${id}'>
        Klicken Sie auf den Link, um die Bestätigung abzuschließen
      </a>
    `,
    text: `Copy and paste this link: ${CLIENT_ORIGIN}/confirm/email/${id}`,
  }),
};
