const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

class LoginService {
    static loginService = async ({ email, password, fullname, phone }) => {
        const posts = await prisma.post.findMany({ where: { email } });
        if (isUser === null) {
            return false;
        } else {
            let comparePass = await bcrypt.compare(req.body.password, user.password);
            if (comparePass === false) {
              return false;
            } else {

              return true;
            }
        };
    };
}
module.exports = {
    LoginService,
    AuthService,
};