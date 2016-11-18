const httpRequester = require('../utils/http-requester');
const htmlParser = require('../utils/html-parser');
const modelsFactory = require('../models');
const timeUtils = require('../utils/timed-functions');

function getDetailedMovieFromUrl(url, urlsQueue) {
    httpRequester.get(url)
        .then((result) => {
            const selectors = {
                coverImageUrl: '.poster img',
                trailerUrl: '.slate a',
                movieName: '.title-wrapper > h1',
                description: 'summary_text',
                categories: '.subtext a span',
                releaseDate: '.subtext a[title]'
                //actors to do
            }
        })
        .then(movies=>{
            
        })
}


function getSimpleMoviesFromUrl(url, urlsQueue) {
    //console.log(`Working with ${url}`);
    httpRequester.get(url)
        .then((result) => {
            const selector = '.col-title span[title] a';
            const html = result.body;
            return htmlParser.parseSimpleMovie(selector, html);
        })
        .then(movies => {
            let dbMovies = movies.map(movie => {
                return modelsFactory.getSimpleMovie(movie.title, movie.url);
            });

            modelsFactory.insertManySimpleMovies(dbMovies);

            return timeUtils.wait(3000);
        })
        .then(() => {
            if (urlsQueue.isEmpty()) {
                return;
            }

            getSimpleMoviesFromUrl(urlsQueue.pop(), urlsQueue);
        })
        .catch((err) => {
            console.dir(err, { colors: true });
        });
}

module.exports = {
    getSimpleMoviesFromUrl,
    getDetailedMovieFromUrl
}
