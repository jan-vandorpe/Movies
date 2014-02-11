/* 
 Movies module: movies.js
 */
console.log('movies.js')

//2de versie: app/films dependency geschrapt
define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
 
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
        },
        //de _id gebruiken van Mongo voor sync
        idAttribute: "_id"
    })
    //COLLECTION: FilmCollectie
    var FilmCollectie = Backbone.Collection.extend({
		model: Film,
                url: "/api/films" // 2de versie: location van data voor connection via de api
    });

    //VIEW: één film
    var FilmView = Backbone.View.extend({
        tagName: "div",
        className: "film clearFix",
        template: $("#filmTemplate").html(),
        //idAttribute:"_id", // gebruik MongoDB id attrib
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
            this.remove();
        }
    })
    //VIEW: filmovericht
    var FilmoverzichtView = Backbone.View.extend({

        el: $("#films"),
        initialize: function (films) {
                    
                    this.$lijst     = this.get$Lijst() //maak ref naar lijst
                    //this.collection = new FilmCollectie(films); // //1ste versie: data via JS variabele
                    this.collection = new FilmCollectie();//2de versie: fetch data via url, emit reset event
                    this.collection.fetch({reset: true}); 
                    
                    //Event Listeners
                    
                    this.listenTo(this.collection, 'add', this.renderFilm); //event listener voor add event Collection
                    this.listenTo(this.collection, 'reset', this.render);
                    this.listenToOnce(this.collection, 'reset', this.addSelect); //éénmalige eventlistener
                    this.listenTo(this,"change:filterType", this.filterByType); //on custom event
                    this.listenTo(this.collection,"sync", this.storeBaseCollection); //éénmaal by fetch
                    //////this.render();
        },
        events: {
             "change #genres": "setFilter",
             "click #voegtoe": "addFilm"
        },
        storeBaseCollection: function(){
           
            this.baseCollection = new Backbone.Collection(this.collection.models);
            console.log('storeBaseCollection: ',this.baseCollection)
        },
         setFilter: function(e) {
            //filtert de collection
            
            this.filterType = e.currentTarget.value; //geen this gebruiken
            //this.oldCollection = this.collection;
            //console.log('setFilter:', this.filterType);
            this.trigger("change:filterType");
        },
        filterByType: function() {
            console.log("filterByType:",this.filterType);
            if (this.filterType === "all") {
                //this.collection.fetch();
                this.collection.reset(this.baseCollection.models)
            } else {
                //this.collection.fetch({silent:true});
                this.collection.reset(this.baseCollection.models,{silent:true})
               
                var filtered = this.collection.where({genre: this.filterType})
                //console.log("filtered:",filtered);
                this.collection.reset(filtered);
                //console.log("base:",this.baseCollection)
                
            }
        },
                get$Lijst:function(){
            return this.$el.find('.lijst')
        },
        render: function () {
            this.$lijst.empty();//eerste legen want anders na filteren
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
             // split veld Cast in acteurs op basis van komma
            arrTemp = []
            _.each(formData.cast.split(','), function(acteur) {
                arrTemp.push({'acteur': acteur});
            });
            formData.cast = arrTemp;
            
            //this.collection.add(new Film(formData)); //eerste versie zonder API; add() triggert een add event  
             this.collection.create(formData);           //tweede versie met API; create() triggert ook een add event 
            console.log('addFilm formData: ', formData);
            
        },
        getGenres: function() {
            return _.uniq(this.collection.pluck("genre"), false, function(genre) {
                return genre.toLowerCase();
            });
        },
        createSelect: function() {
            var select = $("<select id='genres'><option value='all'>All</option></select>");
            //console.log("genres", this.getGenres())
            _.each(this.getGenres(), function(item) {
                var option = $("<option/>", {
                    value: item,
                    text: item
                }).appendTo(select);
            });
            return select;
        },
        addSelect: function() {
            $("#filter").append(this.createSelect()); //select toevoegen 
        },
                
    });


    return {
        start: function() {
            console.log('Ladies at the Movies, Men in control')
            //var films = new FilmoverzichtView(arrFilms);  //1ste versie via films dependency
            var films = new FilmoverzichtView();            //2de versie via API
        }
    };

})