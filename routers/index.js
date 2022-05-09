const express = require("express");
const router = express.Router();
const { ok } = require('./../views/response')

const movieRouter = require("./movies");

router.get("/", (req, res) => {
    res.json({ message: "Wellcome Api :)" });
});

router.use("/v1/movies", movieRouter);

router.use(function (err, req, res, next) {
    switch(err.status) { 
        case 400: { 
            console.log(err); 
            ok(false, err.statusText, err.errors, res.status(err.status));
            break; 
        }
        case 404: { 
            console.log(err); 
            ok(false, err.statusText, err.errors, res.status(err.status));
            break; 
        }
        case undefined: { 
            console.log(err); 
            res.status(500).send({
                message: `Internal Server Error.`,
            });             
        } 
    } 
});

module.exports = router;