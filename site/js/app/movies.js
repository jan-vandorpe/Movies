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
        className: "film clearFix",
        template: $("#filmTemplate").html(),
        render: function() {
            var tmpl = _.template(this.template);
            this.$el.html(tmpl(this.model.toJSON()));
            return this;
        },
        events: {
            'click .delete': 'deleteFilm'
        },
        deleteFilm: function(e) {
            console.log('deleteFilm');
            //delete model
            this.model.destroy();
            //delete view
            this.remove()
        }
    })
    //VIEW: filmovericht
    var FilmoverzichtView = Backbone.View.extend({

        el: $("#films"),
        initialize: function (films) {
                    this.collection = new FilmCollectie(films); // data: object of JSON
                    this.$lijst     = this.get$Lijst() //maak ref naar lijst
                    //Event Listeners
                    //this.listenTo(this.collection, 'all', function(){this.debug()})
                    this.listenTo(this.collection, 'add', this.renderFilm); //event listener voor add event Collection
           
                    this.render();
        },
        events: {
            "click #voegtoe": "addFilm"
        },
        debug: function(e, tekst){
            console.log(e, tekst);
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
        },
        addFilm: function(e){
            e.preventDefault();
            console.log("addfilm")
            var formData    = {};
            $velden         = $('#frmFilm').find('input, textarea'); //gebruik JQ find() want children() enkel één niveau
            $velden.each(function(i, el){
                if($(el).val()!= ''){
                    formData[el.name] = $(el).val();
                }              
            })
            //corrigeer filename die volledig pad bevat, we moeten enkel de filename hebben
            if(formData.foto){
                fotoFullPath    = formData.foto;
                formData.foto   = /([^\\]+)$/.exec(fotoFullPath)[1];
            }
            //formData.release =  new Date(formData.release).getTime(); //niet nodig in Chrome dankzij kalenderwidget, wel in andere browsers?
            console.log('addFilm formData: ', formData);
            this.collection.add(new Film(formData)); //eerste versie zonder API
            
     }

    });


    return {
        start: function() {
            console.log('Ladies at the Movies, Men in control')
            var films = new FilmoverzichtView(arrFilms);
        }
    };

})