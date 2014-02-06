/* 
 Movies module: movies.js
 */
console.log('movies.js')


define([
    'jquery',
    'underscore',
    'backbone',
    'app/films'
], function($, _, Backbone, films) {
    
    //MODEL: Film
    var Film = Backbone.Model.extend({
        defaults: {
            filmNr      : 0,
            titel       : "",
            beschrijving: "",
            genre       : "",
            duur        : "",
            regisseur   : "",
            release     : "",
            foto        : "noimage.jpg",
            cast        : []
        }
    })
    //COLLECTION: FilmCollectie
    var FilmCollectie = Backbone.Collection.extend({
		model: Film
    });

    //VIEW: één film
    var FilmView = Backbone.View.extend({
        tagName: "div",
        className: "film",
        template: $("#filmTemplate").html(),
        render: function() {
            var tmpl = _.template(this.template);
            this.$el.html(tmpl(this.model.toJSON()));
            return this;
        }
    })
    //VIEW: filmovericht
    var FilmoverzichtView = Backbone.View.extend({

        el: $("#films"),
        initialize: function (films) {
                    this.collection = new FilmCollectie(films); // data: object of JSON
                    this.$lijst     = this.get$Lijst() //maak ref naar lijst
                    this.render();
              },
        get$Lijst:function(){
            return this.$el.find('.lijst')
        },
        render: function () {
            _.each(this.collection.models, function (item) {
                this.renderFilm(item);
            }, this);
            console.log("rendering collection: ", this.collection);
        },

        renderFilm: function (item) {
            var filmView = new FilmView({
                model: item
            });
            this.$lijst.append(filmView.render().el);
        }
    });


    return {
        start: function() {
            console.log('Ladies at the Movies, Men in control')
            var films = new FilmoverzichtView(arrFilms);
        }
    };

})