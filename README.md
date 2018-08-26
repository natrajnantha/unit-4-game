# unit-4-game
Starwars RPG game

This game dynamically defines the Starwars characters that play a role of defender or main character. 

The game panel is divided into 3 sections. 

1. Player area 
2. Enemies area 
3. Defender area. 

The game first displays all the list of available characters as a image list in the player area. The user will first choose the main character. The main character will stay in the player area and the rest of the characters will be automatically moved to the Enemies area. The user has to now choose the defender from the list of available enemies. The defender choosen will be moved to the defender area. Now the game between the main character and the defender begins. Each starwars character has a health point and attack point that are randomly assigned at the begining of the game. The health point is random between 100 - 200. The attack point is random between 1 and 10. When the attack starts, the defendent attack point doesnt change, whearease the player attack point keeps doubling. This was done per the specs given for the game. But to make the game fair, the currentHealth() argument for the defendent call in the program can be set to a mean value of 5 - The same has been provided as a comment in the game.js file. 

The characters in the game and number of characters can be dynamically changed by chaning the entries/adding new entries to the playingCharacters[] array in the game.js file. To add a new character, add new character name and the image file name entry into this array (example ['Darth', 'assets/images/Darth.png'],) and the program will automatically render the page with the new character. In future enhancments after we cover databases, this could be modified to dynamically create the array from database fetch. 
