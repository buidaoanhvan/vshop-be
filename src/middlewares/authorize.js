const { getRoleId } = require("../services/RoleService");

const isAdmin = async (req, res, next) => {
  const { guard_name } = await getRoleId(req.user.role_id);
  if (guard_name != "ADMIN") {
    res.status(403).json({ code: "43", message: "Forbidden" });
    return;
  }
  next();
};

module.exports = { isAdmin };
