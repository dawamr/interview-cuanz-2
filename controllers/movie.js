const Movie = require('../models').Movie;
const resp = require('../views/response');
const pagination = require('../utils/pagination');
const sequelize = require('sequelize');
const Op = sequelize.Op;


module.exports = {
    
    list(req, res, next) {
        let statusPublished = (val) => (val === "true" || val === "True")
        let orderBy = 'title';
        let sortBy = 'desc';
        let page = 1;
        let perPage = 10;
        let options = {};

        if ((req.query.order_by != undefined) && (req.query.order_by.length > 0)) {
            orderBy = req.query.order_by;
        }
        if ((req.query.sort_by != undefined) && (req.query.sort_by.length > 0)) {
            sortBy = req.query.sort_by;
        }
        if ((req.query.page != undefined) && (req.query.page.length > 0)) {
            page = req.query.page;
        }
        if ((req.query.per_page != undefined) && (req.query.per_page.length > 0)) {
            perPage = req.query.per_page;
        }
        if ((req.query.published != undefined) && (req.query.published.length > 0)) {          
            options.published = sequelize.where(sequelize.col('published'), '=', statusPublished(req.query.published));
        }
        if ((req.query.search != undefined) && (req.query.search.length > 0)) {
            options.title = sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', '%' + req.query.search.toLowerCase() + '%');
        }


        let {
            offsetResult,
            perPageResult,
            showPageResult
        } = pagination.builder(perPage, page);

        return Movie
        .findAndCountAll({
            where: options,
            attributes: { exclude: ['description','deletedAt'] },
            order: [
                [orderBy, sortBy]
            ],
            limit: parseInt(perPageResult),
            offset: parseInt(offsetResult),
        })
        .then(movieResult => {
            let totalPage = Math.ceil(movieResult.count / perPage);
            let data = resp.paging(movieResult.rows, parseInt(showPageResult), parseInt(perPageResult), totalPage, movieResult.count);

            resp.ok(true, "Get list data movie.", data, res);
        })
        .catch((error) => {
            resp.ok(false, "Failed get list data movie.", null, res.status(400));
            console.log(error);
        });
    },

    detail(req, res) {
        return Movie
        .findByPk(req.params.id)
        .then(movieResult => {
            if (!movieResult) {
                resp.ok(false, "movie not found.", null, res.status(404));
            }

            resp.ok(true, "Get data movie.", movieResult, res);
        })
        .catch((error) => {
            resp.ok(false, "Failed get movie.", null, res.status(500));
            console.log(error);
        });
    },

    create(req, res, next) {
        return Movie
        .create({
            title: req.body.title,
            description: req.body.description,
            year: req.body.year,
            published: req.body.published,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        .then(result => {
            return Movie.findOne({
                where: {
                    id: result.dataValues.id
                }
            })
            .then(newData => {
                req.data = newData;
                resp.ok(true, "Success create movie.", req.data, res)
            })
        })
        .catch((error) => {
            resp.ok(false, "Failed create movie.", null, res.status(500));
        });
    },

    update(req, res) {
        return Movie
            .findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(result => {
                
                if (!result) {
                    resp.ok(false, "movie not found.", null, res.status(404));
                }
        
                return result
                    .update({
                        title: (req.body.title != undefined) ? req.body.title : result.title,
                        year: (req.body.year != undefined) ? req.body.year : result.year,
                        description: (req.body.description != undefined) ? req.body.description : result.description,
                        published: (req.body.published != undefined) ? req.body.published : result.published,
                        updatedAt: new Date()
                    })
                    .then(result2 => {
                        return Movie
                            .findByPk(result2.id)
                            .then(result3 => {
                                resp.ok(true, "Success update movie.", result3.dataValues, res);
                            })
                    })
                    .catch((error) => {
                        resp.ok(false, "Failed update movie.", null, res.status(500));
                        console.log(error);
                    });
            })
            .catch((error) => {
                resp.ok(false, "Failed update movie.", null, res.status(500));
                console.log(error);
            });
    },
    
    delete(req, res) {
        return Movie
            .findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(result => {
                
                if (!result) {
                    resp.ok(false, "movie not found.", null, res.status(404));
                }
        
                return result
                    .destroy({
                        where: {
                            id: req.params.id
                        }
                    })
                    .then(result2 => {
                        return Movie
                            .findByPk(result2.id, { paranoid: false })
                            .then(result3 => {
                                resp.ok(true, "Success delete movie.", result3.dataValues, res);
                            })
                    })
                    .catch((error) => {
                        resp.ok(false, "Failed delete movie.", null, res.status(500));
                        console.log(error);
                    });
            })
            .catch((error) => {
                resp.ok(false, "Failed delete movie.", null, res.status(500));
                console.log(error);
            });
    },
}