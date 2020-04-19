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
var eventArea;
var eventAccept;
var eventReject;
var eventText;
var eventContainer;
var textForFocus;
var lastEvent = 0;
var eventThreshold = 10;
var eventLikelyhood = 5;

var bars = [["progressBar","progessContainer"], ["healthBar","healthContainer"], ["wealthBar","wealthContainer"], ["awesomeBar","awesomeContainer"],["plantBar","plantContainer"]];
var masks = [];

var gameTime = {
    play: 800,
    fast: 100
}

var gameMode;
var gameState;
var gameDay = [];
var gameDayMarker;

var gameDayPositions = {
    firstX: 210,
    secondX: 330,
    thirdX: 450,
    fourthX: 570,
    fifthX: 690
}

var topBar = {
    startX: 84,
    startY: 62, //47,
    spacing: 158,
    textY: 25 //15
}

var sideBar = {
    sizeX: 144,
    sizeY: 35,
    spacing: 40,
    yOffset: 110,
    xOffset: 122,
    zones: ["study", "work", "exercise", "date", "friends", "plants", "stocks"],
    zonesActivity: ["activityStudy", "activityWork", "activityExercise", "activityDate", "activityFriends", "activityPlants", "activityStocks"]
}

var progressValue = 50;
var healthValue = 80;
var wealthValue = 40;
var plantsValue = 50;
var awesomeValue = 100;


window.onload = function() {
        var gameConfig = {
            type: Phaser.AUTO,
            backgroundColor:0xffffff,
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
                // 16:9 for cell
                width: 800,
                height: 450
            },
            scene: playGame,
        }
        game = new Phaser.Game(gameConfig);
        window.focus();
    }

// Stuffed variables
var i;
var imagebars = [];

class playGame extends Phaser.Scene{
    constructor(){
        super("PlayGame");
    }

    preload ()
    {
        // Stuff for bars
        this.load.image("container", "assets/container.png");
        for (i=0; i<5;i++){
            imagebars[i] = i;
            this.load.image(imagebars[i].toString(), "assets/bar.png");
        }

        // Topbar graphics
        this.load.image("progress", "assets/progress.png");
        this.load.image("granny", "assets/granny.png");
        this.load.image("wealth", "assets/wealth.png");
        this.load.image("ecosystem", "assets/ecosystem.png");
        this.load.image("awesome", "assets/awesome.png");
        this.load.image("topbar", "assets/topbar.png");


        // Sidebar graphics
        this.load.image("sidebar", "assets/sideBar.png");
        this.load.image("study", "assets/book.png");
        this.load.image("work", "assets/work.png");
        this.load.image("exercise", "assets/exercise.png");
        this.load.image("date", "assets/date.png");
        this.load.image("friends", "assets/friends.png");
        this.load.image("plants", "assets/plants.png");
        this.load.image("stocks", "assets/stocks.png");

        // Time control graphics
        this.load.image("pause","assets/pause.png");
        this.load.image("play","assets/play.png");
        this.load.image("playHit","assets/play.png");
        this.load.image("fast","assets/fast.png");
        this.load.image("dayMarker","assets/dayMarker.png");

        // Marker icons
        this.load.image("morning", "assets/morning.png");
        this.load.image("midday", "assets/midday.png");
        this.load.image("afternoon", "assets/afternoon.png");
        this.load.image("evening", "assets/evening.png");
        this.load.image("night", "assets/night.png");

        // Activities
        this.load.image("activityStudy", "assets/book.png");
        this.load.image("activityWork", "assets/work.png");
        this.load.image("activityExercise", "assets/exercise.png");
        this.load.image("activityDate", "assets/date.png");
        this.load.image("activityFriends", "assets/friends.png");
        this.load.image("activityPlants", "assets/plants.png");
        this.load.image("activityStocks", "assets/stocks.png");

        // Events
        this.load.image("eventBar", "assets/eventbar.png");
        this.load.image("accept", "assets/accept.png");
        this.load.image("reject", "assets/reject.png");
    }

    create ()
    {
       
        //#region Layout and Topbar
        // Layout of the display
        this.graphics = this.add.graphics();
        this.graphics.lineStyle(1, 0x000000);
        this.graphics.strokeRect(0, 0, 800, 90);
        var topbar = this.add.image(400, 45,'topbar');
        var sidebar = this.add.image(100, 355,'sidebar');
 
        // Setup of the top bar
        // First top bar figures
        var progress = this.add.image(topBar.startX,topBar.textY, 'progress');
        var granny = this.add.image(topBar.startX + topBar.spacing,topBar.textY, 'granny');
        var wealth = this.add.image(topBar.startX + topBar.spacing*2,topBar.textY, 'wealth');
        var ecosystem = this.add.image(topBar.startX + topBar.spacing*3,topBar.textY, 'ecosystem');
        var awesome = this.add.image(topBar.startX + topBar.spacing*4,topBar.textY, 'awesome');

        var container = this.add.container(0, 0);

        // Generate bars for the different parameters
        // var bars = [["progressBar","progessContainer"], ["healthBar","healthContainer"], ["wealthBar","wealthContainer"], ["awesomeBar","awesomeContainer"],["plantBar","plantContainer"]];
        // var masks = [];
        for(i=0; i<5; i++){
            var nameBar = bars[i][0];
            var nameContainer = bars[i][1];
            bars[i][0] = this.add.sprite(topBar.startX + i*topBar.spacing,topBar.startY, imagebars[i]);
            bars[i][1] = this.add.sprite(topBar.startX + i*topBar.spacing,topBar.startY, 'container');
            container.add(bars[i]);
            container.bringToTop(bars[i][0]);
            masks[i] = this.add.sprite(bars[i][0].x, bars[i][0].y, imagebars[i]);
            masks[i].visible = false;
            bars[i][0].mask = new Phaser.Display.Masks.BitmapMask(this, masks[i]); 
        }
        
        //#endregion

        //#region Zones
        // Drop zones
        for (i = 0; i < sideBar.zones.length; i++) {
            zones[i] = this.add.zone(sideBar.xOffset, sideBar.yOffset+sideBar.sizeY/2 + sideBar.spacing*i, sideBar.sizeX, sideBar.sizeY).setRectangleDropZone(sideBar.sizeX, sideBar.sizeY);
            zones[i].key = sideBar.zonesActivity[i];
            var graphics = this.add.graphics();
            graphics.lineStyle(2, 0xffffff);
            graphics.strokeRect(zones[i].x - zones[i].input.hitArea.width / 2, zones[i].y - zones[i].input.hitArea.height / 2, zones[i].input.hitArea.width, zones[i].input.hitArea.height);
            zoneImages[i] = this.add.image(25, sideBar.yOffset+sideBar.sizeY/2 + i*sideBar.spacing,sideBar.zones[i]);
        }

        // Works with zones when dragging

        for (i=0; i < times.length; i++)
        {
            var name = times[i];
            times[i] = this.add.image(65+i*28,zones[5].y - zones[5].input.hitArea.height / 2 + 18, name).setInteractive();
            this.input.setDraggable(times[i]);
            times[i].key = name;
        }
        var sideBarTopText = this.add.text(70, 90, 'Time priorities', { fontFamily: 'Arial', fontSize: 16, color: '#00ff00' });
        //#endregion


        //#region Time control

        var pause = this.add.sprite(60, 420, 'pause');
        var play = this.add.sprite(100, 420, 'play');
        var fast = this.add.sprite(140, 420, 'fast');
        pause.setInteractive();
        play.setInteractive();
        fast.setInteractive();
        pause.setTint(0xff00f0);
        gameState = "pause";

        pause.on('pointerdown', function (pointer) {
            pause.clearTint();
            play.clearTint();
            fast.clearTint();
            this.setTint(0xff00f0);
            console.log(pause.isTinted);
            console.log(play.isTinted);
            gameState = "pause";    
        });

        play.on('pointerdown', function (pointer) {
            pause.clearTint();
            play.clearTint();
            fast.clearTint();
            this.setTint(0xff00f0);
            gameState = "play";
            gameCounter = Date.now();
        });

        fast.on('pointerdown', function (pointer) {
            pause.clearTint();
            play.clearTint();
            fast.clearTint();
            this.setTint(0xff00f0);
            gameState = "fast";
            gameCounter = Date.now();
            console.log(scoreMatrix);
        });
        //#endregion

        //#region Drag controls
        this.input.on('dragstart', function (pointer, gameObject) {

            this.children.bringToTop(gameObject);
    
        }, this);
    
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
    
        });
    
        this.input.on('drop', function (pointer, gameObject, dropZone) {
            switch(gameObject.key) {

                case "morning":
                    gameObject.x = sideBar.xOffset-sideBar.sizeX/2+gameObject.width/2+3;
                    gameObject.y = dropZone.y;
                    zonesAttached[0] = dropZone.key;
                  break;

                case "midday":
                    gameObject.x = sideBar.xOffset-sideBar.sizeX/2+gameObject.width*1.5+6;
                    gameObject.y = dropZone.y;
                    zonesAttached[1] = dropZone.key;
                  break;

                case "afternoon":
                    gameObject.x = sideBar.xOffset-sideBar.sizeX/2+gameObject.width*2.5+9;
                    gameObject.y = dropZone.y;
                    zonesAttached[2] = dropZone.key;
                break;

                case "evening":
                    gameObject.x = sideBar.xOffset-sideBar.sizeX/2+gameObject.width*3.5+12;
                    gameObject.y = dropZone.y;
                    zonesAttached[3] = dropZone.key;
                    break;

                case "night":
                    gameObject.x = sideBar.xOffset-sideBar.sizeX/2+gameObject.width*4.5+15;
                    gameObject.y = dropZone.y;
                    zonesAttached[4] = dropZone.key;
                    break;
        
                default:
                    gameObject.x = gameObject.input.dragStartX;
                    gameObject.y = gameObject.input.dragStartY;
                  break;
              }
        });

        this.input.on('dragend', function (pointer, gameObject, dropped) {
            if (!dropped)
            {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        });
        //#endregion

        // Create input for game counter
        this.add.text(670, 415, "Day: ", { fontFamily: 'Arial', fontSize: 28, color: '#000000' });
        turn = this.add.text(735, 415, gameTurn, { fontFamily: 'Arial', fontSize: 28, color: '#000000' });

        this.graphics.lineStyle(1, 0x000000);
        gameDay[0] = this.graphics.strokeRoundedRect(gameDayPositions.firstX, 120, 100, 200, 10);
        gameDay[1] = this.graphics.strokeRoundedRect(gameDayPositions.secondX, 120, 100, 200, 10);
        gameDay[2] = this.graphics.strokeRoundedRect(gameDayPositions.thirdX, 120, 100, 200, 10);
        gameDay[3] = this.graphics.strokeRoundedRect(gameDayPositions.fourthX, 120, 100, 200, 10);
        gameDay[4] = this.graphics.strokeRoundedRect(gameDayPositions.fifthX, 120, 100, 200, 10);

        gameDayMarker = this.add.image(gameDayPositions.firstX + 50, 105, 'dayMarker');

        activityPositions[0] = gameDayPositions.firstX + 50;
        activityPositions[1] = gameDayPositions.secondX + 50;
        activityPositions[2] = gameDayPositions.thirdX + 50;
        activityPositions[3] = gameDayPositions.fourthX + 50;
        activityPositions[4] = gameDayPositions.fifthX + 50;


        
        activities[0] = this.add.sprite(activityPositions[0], 145, 'activityPlants');
        activities[1] = this.add.sprite(activityPositions[1], 145, 'activityPlants');
        activities[2] = this.add.sprite(activityPositions[2], 145, 'activityPlants');
        activities[3] = this.add.sprite(activityPositions[3], 145, 'activityPlants');
        activities[4] = this.add.sprite(activityPositions[4], 145, 'activityPlants');
       
        for(i=0; i<5; i++){
            activities[i].visible = false;
        }
        
        activityAnimations[0] = this.add.sprite(0, 0, 'activityStudy');
        activityAnimations[1] = this.add.sprite(0, 0, 'activityWork');
        activityAnimations[2] = this.add.sprite(0, 0, 'activityExercise');
        activityAnimations[3] = this.add.sprite(0, 0, 'activityDate');
        activityAnimations[4] = this.add.sprite(0, 0, 'activityFriends');
        activityAnimations[5] = this.add.sprite(0, 0, 'activityPlants');
        activityAnimations[6] = this.add.sprite(0, 0, 'activityStocks');

        for(i=0; i<activityAnimations.length; i++){
            activityAnimations[i].visible = false;
        }

        eventArea = this.add.sprite(400, 380, 'eventBar');
        eventAccept = this.add.sprite(480, 405, 'accept');
        eventReject = this.add.sprite(520, 405, 'reject');
        eventAccept.setInteractive();
        eventReject.setInteractive();

        eventAccept.on('pointerdown', function (pointer) {
            console.log("Accept");
            handleEventConsequences(1);
        });

        eventReject.on('pointerdown', function (pointer) {
            console.log("Reject");
            handleEventConsequences(0);
        });

        var content = [
            "Just loaded"];

        eventText = this.add.text(340, 345, content, { fontFamily: 'Arial', fontSize: 12, color: '#000000' });
        textForFocus = this.add.text(580, 345, "Handle event!", { fontFamily: 'Arial', fontSize: 32, color: '#ff0f0f' });
        eventContainer = this.add.container(0, 0);
        eventContainer.add([eventArea, eventAccept, eventReject, eventText, textForFocus]);
        eventContainer.visible = false;
        gameMode = "run";
    }

    update ()
    {
        if(gameMode == "run"){
            checkAction();
            updateDay();
            doAction();
            updateAllBars();
        }
    }
};


// Matrix with the dependencies for choosing [progress, health, wealth, plants, awesome][study, work, exercise, date, friends, plants, stocks]
                //  progress  health  wealth  plants  awesome
var scoreMatrix = [ [1,       -0.2,    0.05,   -0.3,   -0.4], // study
                    [0.3,     -0.3,     1,     -0.3,   -0.4], // work
                    [-0.2,     1.2,   -0.2,    -0.3,    0.4], // exercise
                    [-0.2,      0,     -1,     -0.3,    0.8], // date
                    [-0.2,    -0.1,   -0.2,   -0.3,     0.5], // friends
                    [-0.2,     0.1,   -0.2,    1.5,    -0.4], // plants
                    [0.3,     -0.3,    0.6,  -0.2,       0]]; // stocks

var scaleSpeed = 3;

function gameAlgorithm(inputActivity){
    progressValue = progressValue + scaleSpeed* scoreMatrix[inputActivity][0];
    healthValue = healthValue + scaleSpeed* scoreMatrix[inputActivity][1];
    wealthValue = wealthValue + scaleSpeed* scoreMatrix[inputActivity][2];
    plantsValue = plantsValue + scaleSpeed* scoreMatrix[inputActivity][3];
    awesomeValue = awesomeValue + scaleSpeed* scoreMatrix[inputActivity][4];
}

function handleRandomEvents(){
    if ((gameTurn - lastEvent) > eventThreshold){
        if(Math.floor(Math.random() * eventLikelyhood) == 0){
            lastEvent = gameTurn;
            console.log("New event!");
            throwEvent();
        }
    }
}

function handleEventConsequences(accepted){
    // for(i=0; i<5; i++)
    // {
    //     console.log(eventConsequenceAccept[i]);
    // }
    if(accepted == 1){
        progressValue = progressValue+eventConsequenceAccept[0];
        console.log(progressValue);
        healthValue = healthValue+eventConsequenceAccept[1];
        wealthValue = wealthValue+eventConsequenceAccept[2];
        plantsValue = plantsValue+eventConsequenceAccept[3];
        awesomeValue = awesomeValue+eventConsequenceAccept[4];
    }
    else{
        progressValue = progressValue+eventConsequenceReject[0];
        healthValue = healthValue+eventConsequenceReject[1];
        wealthValue = wealthValue+eventConsequenceReject[2];
        plantsValue = plantsValue+eventConsequenceReject[3];
        awesomeValue = awesomeValue+eventConsequenceReject[4];
    }
    gameMode = "run";
    eventContainer.visible = false;
    console.log("handled");
}

var eventConsequenceAccept = [];
var eventConsequenceReject = [];
//  progress  health  wealth  plants  awesome
function throwEvent(){
    eventContainer.visible = true;
    gameMode ="event"
    console.log("Event thrown");
    selection = Math.floor(Math.random() * 3);
    switch(selection) {
        case 0:
            // Grandma visiting
            eventConsequenceAccept = [0, 10, 2, 3, -20];
            eventConsequenceReject = [10, -20, 1, 0, 10];
            var content = [
                "Grandma is visiting",
                "Let her in?"];
            eventText.text = content;
        break;

        case 1:
            // An opportunity
            eventConsequenceAccept = [-20, -20, 40, -20, -30];
            eventConsequenceReject = [0, 0, -10, 0, 10];
            var content = [
                "Your best friend wants you to",
                "sell drugs. Ok?"];
            eventText.text = content;
        break;

        case 2:
            // A date
            eventConsequenceAccept = [-4, 5, -10, 0, 10];
            eventConsequenceReject = [0, -5, 0, 0, -10];
            var content = [
                "A girl swipped right on tinder.",
                "Make her the star of the night?"];
            eventText.text = content;
        break;

        default:
            break;
    }
}

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
    activities[activityNumber].y = 145;
    activities[activityNumber].visible = true;
}

function doAction(){
    // console.log(lastGameTurn);
    // console.log(gameTurn);
    if (lastGameTurn != gameTurn){
        console.log("Enter loop");
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
    turn.text = Math.floor(gameTurn/5);
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




function updateAllBars()
{
    updateBar(progressValue, masks[0], bars[0][0]);
    updateBar(healthValue, masks[1], bars[1][0]);
    updateBar(wealthValue, masks[2], bars[2][0]);
    updateBar(plantsValue, masks[3], bars[3][0]);
    updateBar(awesomeValue, masks[4], bars[4][0]); 
}

function simulateBars()
{
    progressValue = progressValue+Math.random();
    plantsValue = plantsValue-Math.random()*2;
    awesomeValue = awesomeValue-Math.random()*4;
}

// Updating the mask on top of the bar
function updateBar(number, objM, objP){
    if(number >= 0 && number <= 100){
        let updatedWidth = objP.width / 100 * number;
        objM.x = leftSide(objP)-objP.width/2 + updatedWidth;
    }
}

function leftSide(obj){
    return (obj.x - obj.width/2);
}

function topSide(obj){
    return (obj.y - obj.height/2);
}

function sleep(milliseconds) {
    var date = Date.now();
    var currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  };