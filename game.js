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
            scene: [playGame, endGame]
        }
        game = new Phaser.Game(gameConfig);
        window.focus();
    }


var endGame = new Phaser.Class({

        Extends: Phaser.Scene,
    
        initialize:
    
        function endGame ()
        {
            Phaser.Scene.call(this, { key: 'endGame' });
        },
    
        preload: function ()
        {
        },
    
        create: function ()
        {

            this.add.text(200, 80, "You survived: ", { fontFamily: 'Arial', fontSize: 60, color: '#000000' });
            this.add.text(200, 160, getDay(), { fontFamily: 'Arial', fontSize: 60, color: '#000000' });
            this.add.text(200, 240, " days", { fontFamily: 'Arial', fontSize: 60, color: '#000000' });
            this.add.text(200, 320, " F5 to try to perform better in life", { fontFamily: 'Arial', fontSize: 20, color: '#000000' });
        }
    
    });


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

        // Introduction
        this.load.image("introduction", "assets/introduction.png");
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

        //#region Simulation areas and marker
        // Create input for game counter
        this.add.text(670, 415, "Day: ", { fontFamily: 'Arial', fontSize: 28, color: '#000000' });
        turn = this.add.text(735, 415, gameTurn, { fontFamily: 'Arial', fontSize: 28, color: '#000000' });

        this.graphics.lineStyle(1, 0x000000);
        gameDay[0] = this.graphics.strokeRoundedRect(gameDayPositions.firstX, 120, 100, 100, 10);
        gameDay[1] = this.graphics.strokeRoundedRect(gameDayPositions.secondX, 120, 100, 100, 10);
        gameDay[2] = this.graphics.strokeRoundedRect(gameDayPositions.thirdX, 120, 100, 100, 10);
        gameDay[3] = this.graphics.strokeRoundedRect(gameDayPositions.fourthX, 120, 100, 100, 10);
        gameDay[4] = this.graphics.strokeRoundedRect(gameDayPositions.fifthX, 120, 100, 100, 10);
        this.add.text(gameDayPositions.firstX+28, 200, "Morning", { fontFamily: 'Arial', fontSize: 12, color: '#000000' });
        this.add.text(gameDayPositions.secondX+30, 200, "Midday", { fontFamily: 'Arial', fontSize: 12, color: '#000000' });
        this.add.text(gameDayPositions.thirdX+26, 200, "Afternoon", { fontFamily: 'Arial', fontSize: 12, color: '#000000' });
        this.add.text(gameDayPositions.fourthX+28, 200, "Evening", { fontFamily: 'Arial', fontSize: 12, color: '#000000' });
        this.add.text(gameDayPositions.fifthX+34, 200, "Night", { fontFamily: 'Arial', fontSize: 12, color: '#000000' });

        // Have game marker
        gameDayMarker = this.add.image(gameDayPositions.firstX + 50, 105, 'dayMarker');
        //#endregion

        //#region Activity content
        // Set up activities to have included in the activity area plus initials
        activityPositions[0] = gameDayPositions.firstX + 50;
        activityPositions[1] = gameDayPositions.secondX + 50;
        activityPositions[2] = gameDayPositions.thirdX + 50;
        activityPositions[3] = gameDayPositions.fourthX + 50;
        activityPositions[4] = gameDayPositions.fifthX + 50;

        activities[0] = this.add.sprite(activityPositions[0], activityPosY, 'activityPlants');
        activities[1] = this.add.sprite(activityPositions[1], activityPosY, 'activityPlants');
        activities[2] = this.add.sprite(activityPositions[2], activityPosY, 'activityPlants');
        activities[3] = this.add.sprite(activityPositions[3], activityPosY, 'activityPlants');
        activities[4] = this.add.sprite(activityPositions[4], activityPosY, 'activityPlants');

       
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
    //#endregion

        //#region Event content
        // Set up event parts needed
        eventArea = this.add.sprite(650, 280, 'eventBar');
        eventAccept = this.add.sprite(710, 305, 'accept');
        eventReject = this.add.sprite(760, 305, 'reject');
        eventAccept.setInteractive();
        eventReject.setInteractive();

        eventAccept.on('pointerdown', function (pointer) {
            handleEventConsequences(1);
        });

        eventReject.on('pointerdown', function (pointer) {
            handleEventConsequences(0);
        });

        // Create event container
        eventText = this.add.text(590, 245, "", { fontFamily: 'Arial', fontSize: 12, color: '#000000' });
        textForFocus = this.add.text(580, 345, "Handle event!", { fontFamily: 'Arial', fontSize: 32, color: '#ff0f0f' });
        eventContainer = this.add.container(0, 0);
        eventContainer.add([eventArea, eventAccept, eventReject, eventText, textForFocus]);
        eventContainer.visible = false;

        //#endregion

        // Set game mode to run the game (not event mode)

        gameMode = "run";

        // gameIntroduction
        var introduction = this.add.sprite(400, 225, 'introduction');
        introduction.setInteractive();
        introduction.on('pointerdown', function (pointer) {
            introduction.visible = false;
            console.log("clicked");
        });

        // var content = [
        //     "This is a life simulation game! - Basically, all you have to do is to make choices to help out with all the success criteria in"
        // ]
        // gameIntro = this.add.text(300, 245, content, { fontFamily: 'Arial', fontSize: 12, color: '#000000' });

        

    }

    update ()
    {
        if(gameMode == "run"){
            checkAction();
            updateDay();
            doAction();
            updateAllBars();
            bounds();
            if(progressValue <= 0 || healthValue <= 0 || wealthValue <= 0 || plantsValue <= 0 || awesomeValue <= 0){
                console.log("end game");
                this.scene.start('endGame');
            }
        }
    }
};