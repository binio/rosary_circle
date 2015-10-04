var addUsers = function(){
    UsersCollection = new Mongo.Collection("users");
var users = ["brandeisbluesky",
"bialoglowa",
"derayes",
"corolla",
"maria-magdalena",
"jasminowa",
"skala",
"mindmonkey",
"ja",
"bergamotka",
"maly-ksiaze",
"metanoja",
"sahcim",
"agrafon",
"zuska",
"marianna",
"rozyczka",
"kolor",
"castorian",
"katolickamama",
"agniecha"];

    for(i = 0; i < users.length; i++){
        UsersCollection.insert({
            username:users[i],
            services:{password:{"bcrypt":"$2a$10$bw50qMO6p/9oi6YYO11do.lvJUuZliSL1jaqJ47Creg75ZNb/B2sC"}}
        });
    }
};
