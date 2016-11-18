/* globals console require setTimeout Promise */
'use strict';

const httpRequester = require('./utils/http-requester');
const queuesFactory = require('./data-structures/queue');
const constants = require('./config/constants');
const scrappers = require('./scrappers/get-movies');
const modelsFactory = require('./models');

const _ = require('lodash');
const _template = require('lodash.template');

require('./config/mongoose')(constants.connectionString);







let urlsQueue = queuesFactory.getQueue();

constants.genres.forEach(genre => {
    for (let i = 0; i < constants.pagesCount; i += 1) {

        let params = {
            genre: genre,
            pageNumber: i + 1
        }

        let compiled = _.template(constants.url);
        let compiledUrl = compiled(params);

        urlsQueue.push(compiledUrl);
    }
});

//scrappers.getSimpleMoviesFromUrl(urlsQueue.pop(), urlsQueue);


// const asyncPagesCount = 45;

// Array.from({ length: asyncPagesCount })
//     .forEach(() => scrappers.getSimpleMoviesFromUrl(urlsQueue.pop(),urlsQueue));