/* 
 * data voor db 'films' en de collection 'filmotheek'
 * dit script uitvoeren in Mongo Shell als 'mongo filmotheek.js'
 */

var conn    = new Mongo('localhost:27017');
var db      = conn.getDB('filmotheek');

db.films.insert({filmNr: 1, titel: "Elysium", beschrijving: "We bevinden ons in het jaar 2159 en de mensheid is verdeeld in twee sociale klassen. De allerrijksten leiden een heerlijk zorgeloos leven op het ongerepte ruimtestation Elysium, terwijl de armen moeten zien te overleven op de overbevolkte en verwoeste Aarde.", genre: "Science Fiction", duur: "1u 20min", regisseur: "Neil Blomkamp", release: new Date("2013-09-14T01:00+01:00"), foto: "Elysium_FO.jpg"});
db.films.insert({filmNr: 2, titel: "Les visiteurs", beschrijving: "A medieval nobleman and his squire are accidentally transported to contemporary times by a senile sorcerer. He enlists the aid of his descendent to try to find a way to return home", genre: "Comedy", duur: "1u 47min", regisseur: "Jean-Marie Poiré", release: new Date("1993-02-27T01:00+01:00"), foto: "lesvisiteurs.jpg"});
db.films.insert({filmNr: 3, titel: "Pulp Fiction", beschrijving: "The lives of two mob hit men, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.", genre: "Crime", duur: "2u 34min", regisseur: "Quentin Tarantino", release: new Date("1994-12-9T01:00+01:00"), foto: "pulpfiction.jpg"});
db.films.insert({filmNr: 4, titel: "Le fabuleux destin d'Amelie Poulain", beschrijving: "Amelie, an innocent and naive girl in Paris, with her own sense of justice, decides to help those around her and along the way, discovers love.", genre: "Romance", duur: "2u 2min", regisseur: "Jean-Pierre Jeunet", release:new Date("2001-05-25T01:00+01:00"), foto: "ameliepoulain.jpg"});
db.films.insert({filmNr: 5, titel: "Alien", beschrijving: "The commercial vessel Nostromo receives a distress call from an unexplored planet. After searching for survivors, the crew heads home only to realize that a deadly bioform has joined them.", genre: "Science Fiction", duur: "1u 57min", regisseur: "Ridley Scott", release:new Date("1979-09-13T01:00+01:00"), foto: "alien.jpg"});
db.films.insert({filmNr: 6, titel: "The Lord of the Rings: The Fellowship of the Ring", beschrijving: "A meek hobbit of The Shire and eight companions set out on a journey to Mount Doom to destroy the One Ring and the dark lord Sauron.", genre: "Adventure", duur: "2u 58min", regisseur: "Peter Jackson", release:new Date("2001-12-19T01:00+01:00"), foto: "lordoftherings.jpg"});
db.films.insert({filmNr: 7, titel: "The Big Lebowski", beschrijving: "\"Dude\" Lebowski, mistaken for a millionaire Lebowski, seeks restitution for his ruined rug and enlists his bowling buddies to help get it.", genre: "Comedy", duur: "1u 57min", regisseur: "Joel Coen, Ethan Coen", release: new Date("1998-04-15T01:00+01:00"), foto: "thebiglebowski.jpg"});
db.films.insert({filmNr: 8, titel: "Once upon a Time in the West", beschrijving: "Epic story of a mysterious stranger with a harmonica who joins forces with a notorious desperado to protect a beautiful widow from a ruthless assassin working for the railroad.", genre: "Western", duur: "2u 15min", regisseur: "Sergio Leone", release: new Date("1968-12-21T01:00+01:00"), foto: "onceuponatimeinthewest.jpg"});
db.films.insert({ filmNr: 9, titel: "De Smurfen 2", beschrijving: "In 'De Smurfen 2', creëert de boze tovenaar Gargamel een paar ondeugende Smurfachtige wezens genaamd de Stouterds. Daarmee hoopt hij de almachtige, magische Smurfessentie te kunnen benutten. Maar wanneer hij ontdekt dat alleen een echte Smurf hem kan geven wat hij wil - en alleen Smurfin een geheime spreuk weet die de Stouterds kan omtoveren tot echte Smurfen - ontvoert Gargamel de Smurfin en brengt haar naar Parijs.", genre:"Kinderen", duur:"1u 45min", regisseur:"Raja Gosnell", release:"31/7/2013", foto:"DeSmurfen_BENLFO.jpg" }),
db.films.find();



