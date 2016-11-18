/* globals require module */
"use strict";

const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

let DetailedMovieSchema = new Schema({
    coverImageUrl: {
        type: String,
        required: true
    },
    trailerUrl: {
        type: String
    },
    movieName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    categories: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    actors: {
        type: [{
            originalName: {
                type: String
            },
            roleName: {
                type: String
            },
            imdbId: {
                type: String
            },
            profileImage: {
                type: String
            }
        }]
    }
});

//  /title/tt0067992/?ref_=adv_li_tt
function extractImdbIdFromUrl(url) {
    let index = url.indexOf("/?ref");
    return url.substring("/title/".length, index);
}

let DetailedMovie;
DetailedMovieSchema.statics.getDetailedMovieByNameAndUrl =
    function(name, url) {
        let imdbId = extractImdbIdFromUrl(url);
        return new DetailedMovie({ name, imdbId });
    };

DetailedMovieSchema.virtual.imdbUrl = function() {
    return `http://imdb.com/title/${this.imdbId}/?ref_=adv_li_tt`;
};

mongoose.model("DetailedMovie", DetailedMovieSchema);
DetailedMovie = mongoose.model("DetailedMovie");
module.exports = DetailedMovie;


// /* globals require module */
// "use strict";

// const mongoose = require("mongoose"),
//     Schema = mongoose.Schema;

// let DetailedMovieSchema = new Schema({
//     coverImageUrl: {
//         type: String,
//         required: true
//     },
//     trailerUrl: {
//         type: String
//     },
//     name: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     categories: {
//         type: String,
//         required: true
//     },
//     releaseDate: {
//         type: Date,
//         required: true
//     },
//     actors: {
//         type: [{
//             originalName: {
//                 type: String
//             },
//             roleName: {
//                 type: String
//             },
//             imdbId: {
//                 type: String
//             },
//             profileImage: {
//                 type: String
//             }
//         }]
//     }

// });

// //  http://www.imdb.com/title/tt0067992/?ref_=adv_li_tt

// function getMovieUrlById(id){
//     return "http://www.imdb.com/title/" + id + '/';
// }


// let SimpleMovie;
// SimpleMovieSchema.statics.getSimpleMovieByNameAndUrl =
//     function (name, url) {
//         let imdbId = extractImdbIdFromUrl(url);
//         return new SimpleMovie({ name, imdbId });
//     };

// SimpleMovieSchema.virtual.imdbUrl = function () {
//     return `http://imdb.com/title/${this.imdbId}/?ref_=adv_li_tt`;
// };

// mongoose.model("SimpleMovie", SimpleMovieSchema);
// SimpleMovie = mongoose.model("SimpleMovie");
// module.exports = SimpleMovie;

// // http://www.imdb.com/title/tt1211837/?ref_=adv_li_tt
// // http://www.imdb.com/title/tt1679335/?ref_=adv_li_tt