/***********
Begin the locationsv2 file. Uses matrix & array/obj navigation instead of individual functions. Also utilizes JS closures.
***********/

//location prototype. This creates an extensible class/closure for locations that can be reused an infinite amount of times. 
function playerLocation(_id, _name, _description, _points) {

    this.id = _id; //id of the location, not really important, just for debugging
    this.name = _name; //name (as string) of the location
    this.description = _description; // description text that is sent to the text box for the player to read
    this.points = _points; // the amount of points to give the player

    this.toString = function () {
        var returnVariable = "";

        returnVariable = this.description; //the return variable will just be the description because it's the only thing that needs to be a string
        return returnVariable;


    }
};


//globalLocations[] holds all the location closures/prototypes. 
var globalLocations = new Array();
globalLocations[0] = new playerLocation(1, 'home', "You are on plush carpet in a sparsely decorated room. You don't recognize where you are and feel uneased by how quiet it is. Looking around, you see 4 different ways out of this room. Perhaps someone else is here...", 5);
globalLocations[1] = new playerLocation(2, 'libraryMain', "You enter a room lined with books and a small fireplace sits inside the opposite wall. A fine Persian carpet fills the floor and the air is musky. It seems like no one has been in this room for a while.", 15);
globalLocations[2] = new playerLocation(3, 'northendLibrary', "You walk towards a bookcase opposite the door. Most of these books seem fairly old and have accumulated years of dust. However, one book seems to have been recently added to this library. It is titled 'Escaping' by Randy Butternubs.", 10);
globalLocations[3] = new playerLocation(4, 'artHall', "There is a double door at the end of the hallway. Several abstract paintings line the hallway. One of these paintings is crooked.", 5);
globalLocations[4] = new playerLocation(5, 'windowWall', "You face a small window with cast iron bars welded to the outside. There is a piece of paper taped to the window.", 5);
globalLocations[5] = new playerLocation(6, 'kitchen', "You enter an immaculate kitchen with white walls and a linoleum floor. There is a small cellar door next to the counter. \n\n **HINT: The next step requires textbox input!**", 10);
globalLocations[6] = new playerLocation(7, 'painting', "You turn and look at the crooked painting. It's a family portrait, but none of these people have faces. The exposed wall where the painting is tilted away from seems a lot cleaner than the rest of the wall...", 5);
globalLocations[7] = new playerLocation(8, 'tunnel', "This tunnel seems well excavated. There are even lamps on the walls! The lights turn on and you notice that there's a key in front of you. Take the key now, it seems like you won't be able to come back here.", 5);
globalLocations[8] = new playerLocation(9, 'southArtHallway', "You approach the double door at the end of the hall. It's ornately decorated with gold leaf inlays and the door handles are antique gold. The door's locked, so you need a key.", 5);
globalLocations[9] = new playerLocation(10, 'cellar', "You open the door and descend the stairs to the cellar. The cellar has a dirt floor and rotten wooden posts supporting the ceiling. Suddenly, a growling dog approaches you. He doesn't seem friendly!", 5);
globalLocations[10] = new playerLocation(11, 'holeInWall', " ", 5);
globalLocations[11] = new playerLocation(12, 'unlockedDoor', " ", 5);
globalLocations[12] = new playerLocation(13, 'lockedHallway', "Another hallway stands before you. There's an empty picture hook to your east with a door, again, at the end of the hallway. Maybe these two are related?", 10);
globalLocations[13] = new playerLocation(14, 'emptyPainting', "You face the empty hook. You seem convinced that it should be hanging something.", 5);
globalLocations[14] = new playerLocation(15, 'hungPainting', "", 0);
globalLocations[15] = new playerLocation(16, 'finalDoor', "You approach the door at the end of the hallway and jiggle the doorknob. Thank the lord, this door doesn't require a key! You push through and exit the house. You're free!! \n\n ***YOU WON!!!***\n Press F5 to restart.", 55);


//locationMatrix is a 2D object used for navigation. If the direction the player wants to go from his/her current location, then the value is from globalLocations[]. Otherwise it will be -1 for invalid.
//the matrix is expandable for an unlimited number of locations. Just make sure that the currentlocation value (locationMatrix[currentLocation]) matches the one in globalLocations. 
var locationMatrix = {};
var locationMatrix = {
    home: {
        north: globalLocations[1],
        south: globalLocations[3],
        east: globalLocations[4],
        west: globalLocations[5]
    },
    windowWall: {
        north: -1,
        south: -1,
        east: -1,
        west: globalLocations[0]
    },
    artHall: {
        north: globalLocations[0],
        south: globalLocations[8],
        east: globalLocations[6],
        west: -1
    },
    kitchen: {
        north: -1,
        south: -1,
        east: globalLocations[0],
        west: -1
    },
    libraryMain: {
        north: globalLocations[2],
        south: globalLocations[0],
        east: -1,
        west: -1
    },
    northendLibrary: {
        north: -1,
        south: globalLocations[1],
        east: -1,
        west: -1
    },
    painting: {
        north: -1,
        south: -1,
        east: -1,
        west: globalLocations[3]
    },
    tunnel: {
        north: -1,
        south: -1,
        east: -1,
        west: globalLocations[6]
    },
    southArtHallway: {
        north: globalLocations[3],
        south: -1,
        east: -1,
        west: -1
    },
    holeInWall: {
        north: -1,
        south: -1,
        east: globalLocations[7],
        west: -1
    },
    unlockedDoor: {
        north:globalLocations[8],
        south:globalLocations[12],
        east:-1,
        west:-1,
    },
    lockedHallway: {
        north: globalLocations[11],
        south: -1,
        east: globalLocations[13],
        west: -1,
    },
    emptyPainting: {
        north:globalLocations[12],
        south:-1,
        east:-1,
        west:-1
    },
    hungPainting: {
        north: -1,
        south: globalLocations[15],
        east: -1,
        west: -1
    },
    finalDoor: {
        north: -1,
        south:-1,
        east:-1,
        west:-1
    }
};


//this function was made with the help of some outside consultation on SomethingAwful forums... I understood that I needed to have 2 nested loops for my object, but I was having trouble wrapping my head around the concept. 
//it looks pretty bad, but it works. 
    function checkNavButtons(checkLocation) {

        jQuery(function () {

            for (var my_property in locationMatrix) { //for every [currentlocation] property in locationMatrix
                if (locationMatrix.hasOwnProperty(my_property) && my_property === checkLocation) { //make sure it just checks locationMatrix for properties, see if has location that = checkLocation parameter        
                    var loc = locationMatrix[my_property]; //set to checkLocation parameter      
                    for (var dir in loc) { //for every direction in the checkLocation (i.e. north, south, east, west)    
                        if (loc.hasOwnProperty(dir)) {
                            if (loc[dir] != -1) { //if the value of [currentLocation][direction] does not = -1
                                enableDirection(dir); //enable that direction button
                            } else if (loc[dir] === -1) {
                                disableDirection(dir); //else disable the directions that return -1
                            }
                        }
                    }
                }
            }
        });

    }


    //NOTE: THE PLAYER CANNOT ENTER THIS VIA DIRECTIONAL COMMANDS. THEREFORE THE MATRIX NAVIGATION DOES NOT APPLY.
    //enter cellar if and ONLY IF they are in the kitchen. If they are not coming from the kitchen, throw invalid command error
    function enterCellar() {
        var setMsg = "You open the door and descend the stairs to the cellar. The cellar has a dirt floor and rotten wooden posts supporting the ceiling. Suddenly, a growling dog approaches you. He doesn't seem friendly!";
        if (hasVisited("cellar") === false && currentLocation === "kitchen") {
            enableAllDirections();
            updateScore(10);
            addVisited("cellar");
            updateDisplay(setMsg);
            updateLocation("cellar");

            //deals with enable/disabling direction buttons
            disableDirection("north");
            disableDirection("south");
            disableDirection("west");
            disableDirection("east");

        } else if (currentLocation === "kitchen" && hasVisited("cellar") === true) {
            currentLocation = "cellar";
            enableAllDirections();
            updateDisplay(setMsg);
            updateLocation("cellar");

            //deals with enable/disabling direction buttons
            disableDirection("north");
            disableDirection("south");
            disableDirection("west");
            disableDirection("east");
        } else if (currentLocation !== "kitchen") {
            setMsg = "Invalid command. Please try another command.";
            updateDisplay(setMsg);
        }

    }

    function exitCellar() {
        if (currentLocation === "cellar") {
            updateDisplay(globalLocations[5]);
            currentLocation = globalLocations[5].name; //this successfully changes the current location to what "name" is set as in the playerLocation prototype.
            checkNavButtons(currentLocation);
        } else {
            setMsg = "You can't do that yet! Please try another command.";
            updateDisplay(setMsg);
        }
    }