const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client();
const googleVerify = async (token ="") => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return {
    name: payload.name,
    email: payload.email,
    picture: payload.picture
  }
};

module.exports = {
  googleVerify,
};
