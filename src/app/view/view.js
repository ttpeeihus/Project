import express from 'express'

const configview=(app)=>{
    app.set("view engine","ejs");
    app.set("views","./src/page")
}

export default configview;