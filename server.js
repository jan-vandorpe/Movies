/* 
 * REST server.js voor Movies_BB
 * met Express en MongoDB
 */

//Module dependencies
var application_root = __dirname,
        express     = require('express'),
        path        = require('path'),
        mongoose    = require('mongoose');

//server
var app = express();

app.configure(function() {
    //Express middleware met app.use()
    app.use(express.bodyParser());      //parse request body
    app.use(express.methodOverride());  //chck voor http method overrides
    app.use(app.router);                //route lookup
    app.use(express.static(path.join(application_root, 'site'))); //waar moet static content getoond worden
    app.use(express.errorHandler({dumpExceptions: true, showStack: true}));//toon alle fouten
})

//start server op poort 4711
var port = 4711;
app.listen(port, function() {
    console.log('Express server luistert op poort %d in %s mode', port, app.settings.env);
})

//connect to mongodb
mongoose.connect('mongodb://localhost/filmotheek'); 
// niet vergeten data in de db te zetten met filmotheek.js
// MongoDB MOET EERST opgestart zijn anders crashed dit script
// 
//Cast Schema
var Cast = new mongoose.Schema({
    acteur: String
})
//Film Schema
var Film = new mongoose.Schema({
    filmNr: Number,
    titel: String,
    beschrijving: String,
    genre: String,
    duur: String,
    regisseur: String,
    release: Date,
    foto: String,
    cast: [Cast]
})

//Mongoose Model
var FilmModel = mongoose.model('Film', Film);
//
//
//
//ROUTES======================================================
//
//de API moet overeen komen met de standaard Backbone Sync handler
//deze mapped CRUD naar REST op deze manier:
//create → POST   /collection
//read → GET   /collection[/id]
//update → PUT   /collection/id
//delete → DELETE   /collection/id

//GET /api : test
app.get('/api', function(request, response) {
    response.send('Filmotheek is actief');
})

//GET /api/films :    alle films tonen
app.get('/api/films', function(request, response) {
    return FilmModel.find(function(err, films) {
        if (!err) {
            response.send(films);//alle fims
        }
        else {
            return console.log(err);
        }
    })
})

//POST /api/films :    film toevoegen
app.post('/api/films', function(request, response) {
    //document uit Model
    var film = new FilmModel({
        filmId: request.body.filmId,
        titel: request.body.titel,
        beschrijving: request.body.beschrijving,
        genre: request.body.genre,
        duur: request.body.duur,
        regisseur: request.body.regisseur,
        release: request.body.release,
        foto: request.body.foto,
        cast: request.body.cast
    });
    //method save = Mongoose method
    film.save(function(err) {
        if (!err) {
            return console.log('created');
        }
        else {
            return console.log(err);
        }
    })
    return response.send(film); //return het gesavede filmobject dat nu een _id zal gekregen hebben /of een foutbericht
});

//GET Film by id
//GET /api/films :   get een enkele film by id
app.get('/api/films/:id', function(request, response) {
    return FilmModel.findById(request.params.id, function(err, film) {
        if (!err) {
            response.send(film);//één film
        }
        else {
            return console.log(err);
        }
    })
})

//update een film
//PUT api/films/id
app.put('/api/films/:id', function(request, response) {

    console.log('updating film' + request.body.titel);
    return FilmModel.findById(request.params.id, function(err, film) {
                film.filmNr         = request.body.filmNr,
                film.titel          = request.body.titel,
                film.beschrijving   = request.body.beschrijving,
                film.genre          = request.body.genre,
                film.duur           = request.body.duur,
                film.regisseur      = request.body.regisseur,
                film.release        = request.body.release,
                film.foto           = request.body.foto;
                film.cast           = request.body.cast
                
                return film.save(function(err) {
                    if (!err) {
                        return console.log('film geupdated');
                    }
                    else {
                        return console.log(err);
                    }
                    return response.send(film);
                });
    })
})

//delete een film
//DELETE /api/films/id
app.delete('/api/films/:id', function(request, response) {
    console.log('verwijderen film met id ' + request.params.id);
    return FilmModel.findById(request.params.id, function(err, film) {
        return film.remove(function(err) {
            if (!err) {
                return console.log('film gewist');
                return response.send('');
            }
            else {
                return console.log(err);
            }

        })
    })
})

