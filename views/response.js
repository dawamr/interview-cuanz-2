'use strict';

exports.ok = function(success, message, data, res) {
    let response = {
        'success': success,
        'message': message,
        'data': data,
    };
    res.json(response);
    res.end();
};

exports.paging = function(rows, page, perPage, totalPage, totalData, options) {
    let responsePaging = {
        ...options,
        "rows": rows,
        "page": page,
        "per_page": perPage,
        "total_page": totalPage,
        "total_data": totalData
    };

    return responsePaging
};