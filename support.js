var sideBar = {
    sizeX: 144,
    sizeY: 35,
    spacing: 40,
    yOffset: 110,
    xOffset: 122,
    zones: ["study", "work", "exercise", "date", "friends", "plants", "stocks"],
    zonesActivity: ["activityStudy", "activityWork", "activityExercise", "activityDate", "activityFriends", "activityPlants", "activityStocks"]
}

var gameDayPositions = {
    firstX: 210,
    secondX: 330,
    thirdX: 450,
    fourthX: 570,
    fifthX: 690
}

var gameMode;
var gameState;
var gameDay = [];
var gameDayMarker;

var gameTime = {
    play: 800,
    fast: 200
}

var game;


var zonesAttached = [];
var zones = [];
var zoneImages = [];
var times = ["morning", "midday", "afternoon", "evening", "night"];
var gameCounter = 0;
var gameTurn = 0;
var lastGameTurn = -1;
var turn;
var activities = [];
var activityAnimations = [];
var activityPositions = [];
var activityPosY = 155;

// Stuffed variables
var i;
var imagebars = [];

function getActivity(){

}

function clearVisibilityActivities(){
    for(i=0;i<activities.length;i++){
        activities[i].visible = false;
    }
}

function getActivityNumber(zonesAtt){
        switch(zonesAtt) {
            case "activityStudy":
                return 0;
                break;
            case "activityWork":
                return 1;
                break;
            case "activityExercise":
                return 2;
                break;
            case "activityDate":
                return 3;
                break;
            case "activityFriends":
                return 4;
                break;
            case "activityPlants":
                return 5;
                break;
            case "activityStocks":
                return 6;
                break;
            default:
                return 5;
                break;
    }
}

function setImage(activityNumber){
    var orgx = activities[activityNumber].x;
    var orgy = activities[activityNumber].y;
    activities[activityNumber] = activityAnimations[getActivityNumber(zonesAttached[activityNumber])];
    activities[activityNumber].x = activityPositions[activityNumber];
    activities[activityNumber].y = activityPosY;
    activities[activityNumber].visible = true;
}

function doAction(){
    if (lastGameTurn != gameTurn){
        lastGameTurn = gameTurn;
        var dayAction = gameTurn%5;
        handleRandomEvents();
        switch(dayAction) {
            case 0:
                moveDayMarker(gameDayPositions.firstX+50);
                clearVisibilityActivities();
                setImage(0);
                activities[0].visible = true;
                gameAlgorithm(getActivityNumber(zonesAttached[0]));
            break;

            case 1:
                moveDayMarker(gameDayPositions.secondX+50);
                clearVisibilityActivities();
                setImage(1);
                activities[1].visible = true;
                gameAlgorithm(getActivityNumber(zonesAttached[1]));
            break;

            case 2:
                moveDayMarker(gameDayPositions.thirdX+50);
                clearVisibilityActivities();
                setImage(2);
                activities[2].visible = true;
                gameAlgorithm(getActivityNumber(zonesAttached[2]));
            break;

            case 3:
                moveDayMarker(gameDayPositions.fourthX+50);
                clearVisibilityActivities();
                setImage(3);
                activities[3].visible = true;
                gameAlgorithm(getActivityNumber(zonesAttached[3]));
            break;

            case 4:
                moveDayMarker(gameDayPositions.fifthX+50);
                clearVisibilityActivities();
                setImage(4);
                activities[4].visible = true;
                gameAlgorithm(getActivityNumber(zonesAttached[4]));
            break;
        }
    }
}

function updateDay(){
    turn.text = getDay();
}

function getDay(){
    return Math.floor(gameTurn/5);
}

function moveDayMarker(newPos){
        gameDayMarker.x = newPos;

};

function checkAction(){
    switch(gameState) {
        case "pause":
          break;

        case "play":
            if((Date.now()-gameCounter)>=gameTime.play){
                gameCounter = Date.now();
                gameTurn++;
            }
          break;

        case "fast":
            if((Date.now()-gameCounter)>=gameTime.fast){
                gameCounter = Date.now();
                gameTurn++;
            }
        break;
      }
};