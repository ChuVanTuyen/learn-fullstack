/*
Thay vì định nghĩa tất cả logic xử lý request của bạn ở file routes.php, 
thì bạn có thể muốn quản lý việc này bằng cách sử dụng các lớp Controller. 
Các Controller có thể nhóm các request HTTP có logic liên quan vào cùng một lớp. 
Các Controller được chứa tại thư mục Controllers.
*/
import db from "../models/index";
import CRUDservice from "../services/CRUDservices";

let getHomePage = async (req, res) => {
    //return res.send("hello world from controller");//bắn 1 dòng chữ
    try {
        let data = await db.User.findAll(); // lệnh tìm kiếm tất cả các data có trong bảng user mysql bằng sequelize
        return res.render('homePage.ejs', {
            data: JSON.stringify(data)
        });//render 1 file html ejs
    } catch (e) {
        console.log(e);
    }
}

let getCRUD = (req, res) => {
    return res.render("crud.ejs");
}

let postCRUD = async (req, res) => {
    //console.log(req.body);// lấy dữ liệu từ người dùng gửi đến bằng form method="POST"
    let message = await CRUDservice.createNewUser(req.body);
    console.log(message);
    return res.send("post crud server");
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDservice.getAllUser();
    return res.render("displayCRUD.ejs", {
        dataTable: data
    });
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;// req.query.id lấy dữ liệu từ link
    if (userId) {
        let userData = await CRUDservice.getUserInfoById(userId);
        if (Object.keys(userData).length !== 0) {
            return res.render("editCRUD.ejs", {
                user: userData
            });
        }
        else {
            return res.send("User not found!");
        }
    } else {
        return res.send("User not found!");
    }
}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDservice.updateUserData(data);
    return res.render("displayCRUD.ejs", {
        dataTable: allUsers
    });
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDservice.deleteCRUDById(id);
        return res.send('Delele user succeed!');
    } else {
        return res.send('User not found!');
    }
}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}