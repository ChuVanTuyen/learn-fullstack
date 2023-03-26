import db from "../models/index";
import bcrypt from "bcryptjs";

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        let isExist = await checkUserEmail(email);// kiểm tra email có tồn tại trong hệ thống 
        let userData = {}
        if (isExist) {
            let user = await db.User.findOne({
                where: { email: email },
                attributes: ['email', 'password', 'roleId'],// chỉ lấy những thuộc tính có trong mảng này
                raw: true
            });
            if (user) {
                let check = await bcrypt.compareSync(password, user.password);
                if (check) {
                    userData.errCode = 0;
                    userData.errMessage = "ok";
                    delete user.password;
                    userData.user = user;
                } else {
                    userData.errCode = 3;
                    userData.errMessage = "wrong password!";
                }
            } else {
                userData.errCode = 2;
                userData.errMessage = "User's not found!";
            }
        } else {
            userData.errCode = 1;
            userData.errMessage = `Your email isn't exist in our systerm. Please try other email!`;
        }
        resolve(userData);
    });

}

let checkUserEmail = async (userEmail) => {
    return await new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = {
    handleUserLogin: handleUserLogin,
}