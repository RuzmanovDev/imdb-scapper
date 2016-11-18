
const SimpleMovie = require("./simple-movie-model");

module.exports = {
    getSimpleMovie(name, url) {
        return SimpleMovie.getSimpleMovieByNameAndUrl(name, url);
    },
    insertManySimpleMovies(movies) {
        SimpleMovie.insertMany(movies);
    },
    saveDetailedMovie(limit) {
        return SimpleMovie.find()
            .limit(limit)
            .then();
    }
};