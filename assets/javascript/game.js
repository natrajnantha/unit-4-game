var img_index = 1;
var swAllCharacters = [];

// The below global array defines the list of characters that are playing in the game. This array makes the game more dynamic. 
// The player name and the corresponding image file to be defined in this array and the new character is automatically rendered into the game.
// When a new character need to be included, just make an entry into this array. In the future when we learn more about database, this can be
// modified to read the entries from the database and there by if a new character need to be defined it would be a database entry and no need to touch the code. 
var playingCharacters = [
    ['Darth', 'assets/images/Darth.png'],
    ['Obi-van Knobi', 'assets/images/knobi.jpeg'],
    ['Chubaka', 'assets/images/cheb.jpg'],
    ['Luke', 'assets/images/luke.jpg'],
    ['Darth Vader','assets/images/darthvader.jpg']];
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

            // The below object defines the player properties and method. This is defined as an array of objects for each character from the main global array.
            // The firsttime boolean variable is used to suppress the health point and attach power being modifed when the constructor fires during first time definition. 
            swAllCharacters[img_index] = {
                name: playingCharacters[img_index][0],
                gameImageID : imageid,
                attackPower : attackPowerRnd,
                healthPoint : healthPointRnd,
                currentHealth : function(attackIncrementer,opponetAttackpwr) {
                   if (firstTime) {
                        firstTime = false;
                   } else {

                   this.healthPoint = this.healthPoint - opponetAttackpwr;
                   this.attackPower = this.attackPower + attackIncrementer;
                   firstTime = false;
                   }
                   return this.healthPoint;
                }};

            //Below code defines the image container that holds the image in the playercontainer. 
            //Assign the player name and display at the top of the image.
            //Assign the image file to the img file to the img element. Assigns the health point that displayed at the bottom of the image.
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


            // Dynamically define the on click event for the image added to the playercontainer area. When a player is clicked, the below code will keep the choosen player in the
            // playercontainer area and move the rest to the remaining player container area which considered as the enemies available for defence. 
            $("#" + imageid).on("click", function () {
                clickedPlayerImage = $(this).attr("id");

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
                            //This code executes when the defender is being choosen from the enemies area. The code moves the image thats clicked from the 'remaining container' area
                            //to the defender container area.
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
    };

    //Call the function to setup the characters. 
    setupSWChararcters();

});

//This function reinitializes to the new game for next enemy
function reinitAttack() {
    DefenderWon = false;
    PlayerWon = false;
    $("#gamestatusmsg1").empty();
    $("#gamestatusmsg2").empty();
};

//The play button click starts a new game. The play button will automatically appear on the navigation area under 2 conditions -
//  * when the main player looses the game to a enemy
//  * When there are no more enemies available to defend
$("#playBtn").on("click", function(){

    $("#playBtn").addClass("btn btn-dark d-none");
    location.reload();

});


//The attack button applies the attack power to the enemy and the main character. If the health point goes to zero or below, then the corresponding player looses.
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