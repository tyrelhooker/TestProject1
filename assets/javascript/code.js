//Red Rover Code Base
$( document ).ready(function() {

//Primary Variable Storage
var localLocation = {};
var marsWeather = 0;
var localWeather = 0;
var marsPhoto = 0;
var marsMonth = 0;

$("#launch").on("click", function(){
    $("#main-content").html(
        `<div class="row">
            <div class="col local-weather-style">
                <div class="card" style="width: 100%">
                    <div class="card-body local-weather-style">
                        <h4 class="card-title"> Local Weather </h4>
                        <hr>
                        <div class="earth-image"></div>
                        <div id="local-weather">
                            
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <div class="col mars-weather-style">
                <div class="card" style="width: 100%">
                    <div class="card-body mars-weather-style" >
                        <h4 class="card-title"> Mars Weather </h4>
                        <hr>
                        <div class="mars-image"></div>
                        <div id= "mars-weather">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="weather-comparison">
            <div class="card" style="width: 100%">
                <div class="card-body">
                    <h5 class="card-title">Weather Comparison</h5>
                    <div class="weather-image"></div>
                    <p class="text-left" id="compare-temp"></p>
                    <p class="text-left" id="compare-weather"></p>
                </div>
            </div>
        </div>`
    );
    FXdelta();
});

$(".jumbotron").on("click", function(){
    var images = {
        image1: {
            address: "1.jpg",
            color: "white",
        },
        image2: {
            address: "2.jpg",
            color: "white"
        },
        image3: {
            address: "3.jpg",
            color: "black"
        },
        
        image4: {
            address: "4.jpg",
            color: "white"
        },
        image5: {
            address: "5.jpg",
            color: "white"
        },
        image6: {
            address: "6.jpg",
            color: "white"
        },
        image7: {
            address: "7.jpg",
            color: "white"
        },

        image8: {
            address: "8.jpg",
            color: "white"
        }, 

        image9: {
            address: "9.jpg",
            color: "white"
        },
                
        image10: {
            address: "10.jpg",
            color: "white"
        },
    };
	
    var rand = Math.floor(Math.random()*10)+1;
    var elementSelect = "image" + rand
    var imageSelect = images[elementSelect].address;
    var colorSelect = images[elementSelect].color;
    $(".jumbotron").css("background-image", "url('assets/images/" + imageSelect +"')");
    $(".display-4").css("color", colorSelect);
    $("#colorChange").css("color", colorSelect);

});

//AJAX call functions
    // Geolocation IP API call function
    function FXweatherGeolocation () {
        // The URL to query the ip-API
        var queryURL = "https://ipapi.co/json/";
        // AJAX call to ip-API
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        // Stores all of the retrieved data inside of an object called "response"
        .then(function(response) {
            // Assigns response object to global variable     
            localLocation = response;
            console.log("ip-api lat" + localLocation.latitude);
            console.log("ip-api lon" + localLocation.longitude);
            FXdisplayLocalWeather();
        });
        
    }

    //Open Weather Call function
    function FXdisplayLocalWeather() {
        // This is our API key and variables for the queryURL
        var APIKey = "7d2ff8f5647ce6dbd5231ca3f107d20b";
        // The URL to query the database
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + localLocation.lat + "&lon=" + localLocation.lon + "&appid=" + APIKey;
        // AJAX call to the OpenWeatherMap API
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        // Stores all of the retrieved data inside of an object called "response"
        .then(function(response) {
            // Assigns response object to global variable
            localWeather = response;
            // Testing responses
        });
    } 

    //Mars call function
    function FXdisplayMarsWeather() {
        // The URL to query the MAAS2
        var queryURL = "https://api.maas2.jiinxt.com/latest"
        // AJAX call to MAAS2 API
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        // Stores all of the retrieved data inside of an object called "response"
        .then(function(response) {
            // Assigns response object to global variable
            marsWeather = response;
            // Testing responses
        });
    }

//Function Declaration
    //Function to initialize all page content
    function FXstart (){
        setTimeout(FXdisplayLaunch, 1500);
        FXweatherGeolocation();
        FXdisplayMarsWeather();
        
    };
    // Writes launch button to page after 1 second
    function FXdisplayLaunch () {
        document.getElementById("launch").style.visibility = "visible";
    }
    //Determine weather location
        //Write weather options to DOM
        function FXweatherPrint (){
        };
    //Write collected info to DOM
    function FXwriteFacts (){
        //write weather info

        $(".earth-image").append("<img src='assets/images/earth-globe.jpg' width=150px>");
        $("#local-weather").html(
        "<p> Wind Speed: " +localWeather.wind.speed + " kph</p>" +
        "<p> Temp: " + Math.floor(localWeather.main.temp -273.15) + " Celcius </p>" +
        "<p> Conditions: " + localWeather.weather[0].main + "</p>"
        );
        //write mars info
        FXcomputeMarsMonth();

        $(".mars-image").append("<img src='assets/images/mars-globe.jpg' width=150px>");
        $("#mars-weather").html(
        "<p> Martian Month: " + marsMonth + " </p>" +
        "<p> Temp: " + ((marsWeather.min_temp + marsWeather.max_temp)/2) + " Celcius </p>" +
        "<p> Conditions: " + marsWeather.atmo_opacity + "</p>"
        );
    };
    function FXcomputeMarsMonth(){
        var marsCalendar = ["Sagittarius","Dhanus","Capricornus", "Makara", "Aquarius","Kumbha", "Pisces", "Mina", "Aries", "Mesha", "Taurus", "Rishabha", "Gemini", "Mithuna", "Cancer", "Karka", "Leo", "Simha", "Virgo", "Kanya", "Libra", "Tula", "Scorpius", "Vrishika"]
        if (marsWeather.season == "Month 1"){
            marsMonth = marsCalendar[0];
        }
        else if (marsWeather.season == "Month 2"){
            marsMonth = marsCalendar[1];
        }
        else if (marsWeather.season == "Month 3"){
            marsMonth = marsCalendar[2];
        }
        else if (marsWeather.season == "Month 4"){
            marsMonth = marsCalendar[3];
        }
        else if (marsWeather.season == "Month 5"){
            marsMonth = marsCalendar[4];
        }
        else if (marsWeather.season == "Month 6"){
            marsMonth = marsCalendar[5];
        }
        else if (marsWeather.season == "Month 7"){
            marsMonth = marsCalendar[6];
        }
        else if (marsWeather.season == "Month 8"){
            marsMonth = marsCalendar[7];
        }
        else if (marsWeather.season == "Month 9"){
            marsMonth = marsCalendar[8];
        }
        else if (marsWeather.season == "Month 10"){
            marsMonth = marsCalendar[9];
        }
        else if (marsWeather.season == "Month 11"){
            marsMonth = marsCalendar[10];
        }
        else if (marsWeather.season == "Month 12"){
            marsMonth = marsCalendar[11];
        }
        else if (marsWeather.season == "Month 13"){
            marsMonth = marsCalendar[12];
        }
        else if (marsWeather.season == "Month 14"){
            marsMonth = marsCalendar[13];
        }
        else if (marsWeather.season == "Month 15"){
            marsMonth = marsCalendar[14];
        }
        else if (marsWeather.season == "Month 16"){
            marsMonth = marsCalendar[15];
        }
        else if (marsWeather.season == "Month 17"){
            marsMonth = marsCalendar[16];
        }
        else if (marsWeather.season == "Month 18"){
            marsMonth = marsCalendar[17];
        }
        else if (marsWeather.season == "Month 19"){
            marsMonth = marsCalendar[18];
        }
        else if (marsWeather.season == "Month 20"){
            marsMonth = marsCalendar[19];
        }
        else if (marsWeather.season == "Month 21"){
            marsMonth = marsCalendar[20];
        }
        else if (marsWeather.season == "Month 22"){
            marsMonth = marsCalendar[21];
        }
        else if (marsWeather.season == "Month 23"){
            marsMonth = marsCalendar[22];
        }
        else if (marsWeather.season == "Month 24"){
            marsMonth = marsCalendar[23];
        }
    };
    //Compute delta
    function FXdelta () {
        //compute deltaTemp
        var deltaTemp = Math.floor((localWeather.main.temp - 273.15) - ((marsWeather.min_temp + marsWeather.max_temp)/2));
        if (deltaTemp <= 15) {
            $("#compare-temp").append("<p> Wow, it's really cold out where you're at, Antarctic winter cold. Even so, it's still colder on Mars, by the same degree of warmth as a warm spring day. </p>");
        }
        else if (deltaTemp > 15 && deltaTemp <= 25) {
            $("#compare-temp").append("<p> It's pretty cold out today. The difference between your temperature and martian temperature however is the difference in average temperature in New York City, and McMurdo Sound in Antacrtica. </p>");
        }
        else if (deltaTemp > 25 && deltaTemp <= 45) {
            $("#compare-temp").append("<p> The difference in temperature between you and Mars is the same as the difference in temperature between the Saharah desert in summer, and the Antarctic winter. </p>");
        }
        else if (deltaTemp > 45 && deltaTemp <= 65) {
            $("#compare-temp").append("<p> The difference in temperature between you and Mars is the same as the difference between a frozen steak, and one cooked to well-done. </p>");
        }
        else if (deltaTemp > 65 && deltaTemp <= 85) {
            $("#compare-temp").append("<ul> The difference in temperature between you and Mars is the same as the differnce between a cup of hot coffee and a ice cube. </ul>");
        }
        else if (deltaTemp > 85) {
            $("#compare-temp").append("<ul> The difference in temperature between you and Mars is the same as the differnce between an ice cube and a pot of boiling water. </ul>");
        }
        //compute deltaWeather
        var marsAtmo = marsWeather.atmo_opacity
        var localAtmo = localWeather.weather[0].main      
        if (localAtmo == "Clouds" && marsAtmo == "Cloudy" ) {
        $("#compare-weather").append("<p> There's cloud cover on mars today, just like home. However I bet your clouds aren't made of iron filings moving at 60 miles an hour. </p>");
        $(".weather-image").append("<img src='assets/images/mars-cloud.jpg' width=300px>");
        }
        else if (localAtmo == "Clouds" && marsAtmo == "Sunny" ) {
        $("#compare-weather").append("<p>It's Sunny on mars today, unlike home. However, its probably still darker on Mars despite the clouds, since the sun is an extra 50,000,000 miles away </p>");
        $(".weather-image").append("<img src='assets/images/mars-night.jpg' width=300px>");
        }
        else if (localAtmo == "Clear") {
        $("#compare-weather").append("<p>Clear Skies at home is a happy reminder of how we have a glorious atmosphere that we can breathe. Unlike on Mars, which has only 60% as much atmosphere in general, and the majority of it is Carbon Dioxide.</p>");
        $(".weather-image").append("<img src='assets/images/dead-martian.jpg' width=300px>");
        }
        else if (localAtmo == "Rain") {
        $("#compare-weather").append("<p>Rain may make you think that the weather must be better anywhere else. Not on Mars, where it never rains, and all the water is frozen into ice crystals.</p>");
        $(".weather-image").append("<img src='assets/images/dry-mars.jpg' width=300px>");
        }
        else if (localAtmo == "Snow") {
        $("#compare-weather").append("<p>Snow can be cold and upsetting, but ultimately it repleneshes the ground water. Meanwhile, on Mars, the only snow is frozen Carbon Dioxide crystals at the poles and thus a minimum of -78.5 degrees celcius.</p>");
        $(".weather-image").append("<img src='assets/images/antartica.jpg' width=300px>");
        }
        else if (localAtmo == "Extreme") {
        $("#compare-weather").append("<p>The weather is pretty garbage right now at home, no lie. But remember that no matter how bad it is, at least you're not dying of radiation poisoning like you would be on Mars since they have no Van Allen belts to protect you from radiation.</p>");
        $(".weather-image").append("<img src='assets/images/sharknado.jpg' width=300px>");
        }
        else if (localAtmo == "Mist") {
        $("#compare-weather").append("<p>A nice light mist in the air is always a welcome reminder of how you have water vapor to breathe in to help you stay hydrated. Unlike Mars, where all the water is frozen in tiny crystals in the dirt.</p>");
        $(".weather-image").append("<img src='assets/images/dry-mars.jpg' width=300px>");
        }
        else if (localAtmo == "Fog") {
        $("#compare-weather").append("<p>Fog may make visibility a pain, but remember that no matter how bad it is, the visibility is better than during a Martian dust storm, and the fog isn't made of razor sharp iron particles either.</p>");
        $(".weather-image").append("<img src='assets/images/mars-cloud.jpg' width=300px>");
        }
        else {
        $("#compare-weather").append("<p>Earth weather can be wild and varried, but at least your blood isn't likely to freeze in 30 seconds if you walk outside.</p>");
        $(".weather-image").append("<img src='assets/images/mars-ice.jpg' width=300px>");
        };
    //initialize FXdeltaWrite
        FXwriteFacts();
    };
    //howler player functions//
    $(function(){
        var sound1=new Howl({
        src: ["assets/audio/Launch.mp3"],
        volume: 0.8
        });
        $("#launch").on("click", function(){
        sound1.play();
        });  
    });
    $(function(){
        var sound2=new Howl({
        src: ["assets/audio/Beam Me Up Scotty.mp3"],
        volume: 0.8
        });
        $("#curiosity").on("click", function(){
        sound2.play();
        });  
    });
    $(function(){
        var sound3=new Howl({
        src: ["assets/audio/tim-kahn__mars.wav"],
        volume: 0.8
        });
        $("#somewhere2").on("click", function(){
        sound3.play();
        });  
    });            
    $(function(){
        var music=new Howl({
            src: ["assets/audio/How's The Weather Song and Cartoon for Kids.mp3"],
            volume: 0.5
        });
        $("#howler-play").on("click", function(){
            music.play();
        });
        $("#howler-pause").on("click", function(){
            music.pause();
        });
        $("#howler-stop").on("click", function(){
            music.stop();
        });
        $("#howler-volup").on("click", function(){
            var vol = music.volume();
            vol += 0.1;
            if (vol>1) {
                vol=1;
            }
            music.volume(vol);
        });
        $("#howler-voldown").on("click", function(){
            var vol=music.volume();
            vol -= 0.1;
            if (vol<0) {
                vol=0;
            }
            music.volume(vol);
	});
});
//Initialize
FXstart();
});
