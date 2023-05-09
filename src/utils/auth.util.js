const JWT = require("jsonwebtoken");

const createTokens = async (payload, publicKey) => {
  const accessToken = await JWT.sign(payload, publicKey, {
    expiresIn: "3 days",
  });

  const refreshToken = await JWT.sign(payload, publicKey, {
    expiresIn: "30 days",
  });

  return { accessToken, refreshToken };
};

const accessTokenVerify = async (accessToken, publicKey) => {
  return await JWT.verify(accessToken, publicKey);
};

const refreshTokenVerify = async (refreshToken, publicKey) => {
  return await JWT.verify(refreshToken, publicKey);
};

module.exports = {
  createTokens,
  accessTokenVerify,
  refreshTokenVerify,
};
