const express = require('express');

const configview = (app) => {
    app.use(express.static('./src/public'));

    app.set("view engine", "ejs");
    app.set("views", "./src/page");
};

module.exports = configview;
