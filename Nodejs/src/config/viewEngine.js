import express from "express";

let configViewEngine = (app) => {
    app.use(express.static("./src/public"));
    app.set("view engine", "ejs");// giúp gõ được logic trong file html if, else,...
    app.set("views", "./src/views");//set đường link lấy view engine
}

module.exports = configViewEngine;