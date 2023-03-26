import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
require("dotenv").config();// phải có để dùng được process.env.PORT

let app = express();

//config app

app.use(bodyParser.json());//cấu hình các tham số client gửi lên
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);//kết nối với view engine
initWebRoutes(app);//khởi tạo route

connectDB(); //kết nối đến database

let port = process.env.PORT || 8088;//lấy port từ file .env
app.listen(port, () => {
    console.log("backend nodejs running... " + port);
})