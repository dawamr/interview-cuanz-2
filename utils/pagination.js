'use strict';

exports.builder = function(perPageResult, page) {
    let showPageResult = page
    
    if (showPageResult < 1) {
        showPageResult = 1;
        page = 1;
    }

    let offsetResult = (page - 1) * perPageResult;
    page = page * perPageResult;

    return { offsetResult, perPageResult, showPageResult };
};
