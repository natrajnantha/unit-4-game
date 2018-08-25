var img_index = 1;
var swAllCharacters = [];
var playingCharacters = [
    ['Obi-van Knobi', 'knobi.jpeg'],
    ['Darth', 'Darth.png'],
    ['Chubaka', 'cheb.jpg'],
    ['Luke', 'luke.jpg'],
    ['Darth Vader','darthvader.jpg']];
var clickedPlayerImage;
var imageid = "";
var attackPowerRnd = 0;
var healthPointRnd = 0;
var gameOver = false;
var yourCharChoosen = false;
var defenderChoosen = false;
var playerindex = 0;
var defenderindex = 0;
var numberofAttacks = 0;
var playerHealthPoint = 0;
var defenderHealthPoint = 0;
var firstTime = true;
var playerOriginalAttackpwr = 0;
var winString = "";
var DefenderWon = false;
var PlayerWon = false;
var numberofEnemies = 0;


$(document).ready(function () {

    function setupSWChararcters() {

        for (img_index = 0; img_index < playingCharacters.length; img_index++) {

            imageid = "myImage" + img_index;
            attackPowerRnd = Math.floor(Math.random() * 10) + 1;
            healthPointRnd = Math.floor(Math.random() * 101) + 100;

            console.log("Image ID : " + imageid + "Char : " + playingCharacters[img_index, 0] + "File : " + playingCharacters[img_index, 1]);
            console.log(" Derived values - Random attack power : " + attackPowerRnd + "Random health point : " + healthPointRnd);
            swAllCharacters[img_index] = {
                name: playingCharacters[img_index][0],
                gameImageID : imageid,
                attackPower : attackPowerRnd,
                healthPoint : healthPointRnd,
                currentHealth : function(attackIncrementer,opponetAttackpwr) {
                   console.log("current health calc : " + attackIncrementer);
                   console.log("Player " + this.name + " Current health power : " + this.healthPoint + " First time call " + firstTime);
                   if (firstTime) {
                        firstTime = false;
                   } else {

                   this.healthPoint = this.healthPoint - opponetAttackpwr;
                   this.attackPower = this.attackPower + attackIncrementer;
                   firstTime = false;
                   }
                   console.log("Player " + this.name + " health power after attack : " + this.healthPoint);
                   return this.healthPoint;
                }};

            var img = $('<img />').attr({
                'id': imageid,
                'alt': imageid,
                'title': 'SW Char',
            });

            var $wrapper = $("<div/>", { id: "imagecontainer" + img_index }), $inner = img;
            $wrapper.append($inner).appendTo(".playercontainer");
            $playerNamestr = $('<h6/>').attr({ 'id': imageid + "Name" });
            $playerNamestr.appendTo("#imagecontainer" + img_index);

            $hptext = $('<h6/>').attr({ 'id': imageid + "hp" });
            $hptext.appendTo("#imagecontainer" + img_index);

            $("#imagecontainer" + img_index).addClass('imagecontainer');
            console.log("Image object : " + img);

            $("#" + imageid).addClass("imgStyle");
            $("#" + imageid).attr("src", playingCharacters[img_index][1]);

            $("#" + imageid + "Name").addClass("text");
            $("#" + imageid + "Name").text(playingCharacters[img_index][0]);

            $("#" + imageid + "hp").addClass("imgHPStyle");
            $("#" + imageid + "hp").text(healthPointRnd);


            $("#" + imageid).on("click", function () {
                clickedPlayerImage = $(this).attr("id");
                console.log("Choosen Player : " + clickedPlayerImage);

                for (let i = 0; i < swAllCharacters.length; i++) {

                    if (!yourCharChoosen) {
                        if (swAllCharacters[i].gameImageID === clickedPlayerImage) {
                            console.log("Player choosen name is : " + swAllCharacters[i].name);
                            playerOriginalAttackpwr = swAllCharacters[i].attackPower;
                            playerindex = i;
                            numberofEnemies = playingCharacters.length - 1;

                        } else {


                            // Move the rest of the characters to the Enemies available area
                             $("<div/>", { id: "remimagecontainer" + i}).append($("#" + swAllCharacters[i].gameImageID)).appendTo(".remcharcontainer");
                             $("#" + swAllCharacters[i].gameImageID + "hp").remove();
                             $("#" + swAllCharacters[i].gameImageID + "Name").remove();
                             $playerNamestr = $('<h6/>').attr({ 'id': swAllCharacters[i].gameImageID + "Name" });
                             $playerNamestr.appendTo("#remimagecontainer" + i);
                             $playerNamestr.addClass("remareaText");

                             $("#remimagecontainer" + i).addClass("remimagecontainer");
                             console.log("Index I : " + i);
                             $playerNamestr.text(swAllCharacters[i].name);

                             $("#" + swAllCharacters[i].gameImageID).addClass("remimgStyle");

                             $hptext = $('<h6/>').attr({ 'id': swAllCharacters[i].gameImageID + "hp" });
                             $hptext.appendTo("#remimagecontainer" + i);
                             $hptext.addClass("imgHPStyle");
                             $hptext.text(swAllCharacters[i].healthPoint);
                            console.log("Moving player : " + swAllCharacters[i].gameImageID);
                        }
                    } else if (!defenderChoosen) {
                        if (swAllCharacters[i].gameImageID === clickedPlayerImage) {
                            console.log("Defender choosen name is : " + swAllCharacters[i].name);

                            defenderindex = i;
                            numberofEnemies--;
                            $("<div/>", { id: "defenderimagecontainer" + i }).append($("#" + swAllCharacters[i].gameImageID)).appendTo(".defendercharcontainer");
                            $("#" + swAllCharacters[i].gameImageID + "hp").remove();
                            $("#" + swAllCharacters[i].gameImageID + "Name").remove();
                            $playerNamestr = $('<h6/>').attr({ 'id': swAllCharacters[i].gameImageID + "Name" });
                            $playerNamestr.appendTo("#defenderimagecontainer" + i);
                            $playerNamestr.addClass("defareaText");
                            $playerNamestr.text(swAllCharacters[i].name);

                            $("#" + swAllCharacters[i].gameImageID).addClass("defimgStyle");
                            $("#defenderimagecontainer" + i).addClass("defimagecontainer");

                            $hptext = $('<h6/>').attr({ 'id': swAllCharacters[i].gameImageID + "hp" });
                            $hptext.appendTo("#defenderimagecontainer" + i);
                            $hptext.addClass("defimgHPStyle");
                            $hptext.text(swAllCharacters[i].healthPoint);
                            console.log("Moving player : " + swAllCharacters[i].gameImageID);
                            defenderChoosen = true;
                            reinitAttack();
                        }
                    }

                }
                yourCharChoosen = true;
            });

        };

        console.log(swAllCharacters);

        console.log(img);
        console.log("Current health point : " + swAllCharacters[0].currentHealth(10));
    };

    setupSWChararcters();

});

function reinitAttack() {
    DefenderWon = false;
    PlayerWon = false;
    $("#gamestatusmsg1").empty();
    $("#gamestatusmsg2").empty();


};

$("#playBtn").on("click", function(){

    $("#playBtn").addClass("btn btn-dark d-none");
    location.reload();

});

$("#attackBtn").on("click", function() {

    if (DefenderWon || PlayerWon) {
        alert("Please choose another player or restart the game");
    } else if (defenderChoosen) {

    numberofAttacks++;
    playerHealthPoint = swAllCharacters[playerindex].currentHealth(playerOriginalAttackpwr,(swAllCharacters[defenderindex].attackPower));
    defenderHealthPoint = swAllCharacters[defenderindex].currentHealth(5,swAllCharacters[playerindex].attackPower);
    console.log("Number of attacks : " + numberofAttacks);
    console.log("Player name is : " + swAllCharacters[playerindex].name + " Player attack pwr is : " + swAllCharacters[playerindex].attackPower + " current health is " + playerHealthPoint);
    console.log("Defender name is : " + swAllCharacters[defenderindex].name + " Defender attack pwr is : " + swAllCharacters[defenderindex].attackPower + " current health is " + defenderHealthPoint);

    var $yourStatusStr = $('<p>You attacked ' + swAllCharacters[defenderindex].name + ' for ' + swAllCharacters[playerindex].attackPower + ' damages </p>');
    $('#gamestatusmsg1').html($yourStatusStr);

    var $yourStatusStr = $('<p>' + swAllCharacters[defenderindex].name + ' attacked you back for ' + swAllCharacters[defenderindex].attackPower + ' damages </p>');
    $('#gamestatusmsg2').html($yourStatusStr);


    $("#" + swAllCharacters[defenderindex].gameImageID + "hp").empty();
    $("#" + swAllCharacters[defenderindex].gameImageID + "hp").append(swAllCharacters[defenderindex].healthPoint);
    $("#" + swAllCharacters[playerindex].gameImageID + "hp").empty();
    $("#" + swAllCharacters[playerindex].gameImageID + "hp").append(swAllCharacters[playerindex].healthPoint);


    if ((playerHealthPoint <= 0) && (defenderHealthPoint <=0)) {
        if (playerHealthPoint < defenderHealthPoint) {
            winString = "Defender Won"
            DefenderWon = true;
        } else {
            winString = "You Won !!!"
            PlayerWon = true;
        }
    } else if (playerHealthPoint <= 0) {
        winString = "Defender Won"
        DefenderWon = true;
    } else if (defenderHealthPoint <=0) {
        winString = "You Won !!!"
        PlayerWon = true;
    }

    if (DefenderWon) {
        $("#gamestatusmsg2").append(winString);
        $("#playBtn").addClass("btn btn-dark d-block");
        console.log("Player index during fade out " + playerindex);
        $("#imagecontainer" + playerindex).fadeOut(2000);
    } 

    if (PlayerWon) {
        $("#gamestatusmsg2").append(winString);
        $("#defenderimagecontainer" + defenderindex).fadeOut(2000, function(){
            this.remove();
        });

        defenderChoosen = false;
        if (numberofEnemies===0) {
            $("#playBtn").addClass("btn btn-dark d-block");
        }
    }

} else {
    alert("Choose an enemy to play");
}



});