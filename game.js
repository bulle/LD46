var game;

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
    zones: ["study", "work", "exercise", "date", "friends", "plants", "stocks"]
}

var parameters = {
    progress: 50,
    health: 50,
    wealth: 50,
    awesome: 50,
    plant: 50
}

window.onload = function() {
        var gameConfig = {
            type: Phaser.AUTO,
            backgroundColor:0xff0000,
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

        // Marker icons
        this.load.image("morning", "assets/morning.png");
        this.load.image("midday", "assets/midday.png");
        this.load.image("afternoon", "assets/afternoon.png");
        this.load.image("evening", "assets/evening.png");
        this.load.image("night", "assets/night.png");
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
        var bars = [["progressBar","progessContainer"], ["healthBar","healthContainer"], ["wealthBar","wealthContainer"], ["awesomeBar","awesomeContainer"],["plantBar","plantContainer"]];
        var masks = [];
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

        // Drop zones
        var zones = [];
        var zoneImages = [];
        for (i = 0; i < sideBar.zones.length; i++) {
            zones[i] = this.add.zone(sideBar.xOffset, sideBar.yOffset+sideBar.sizeY/2 + sideBar.spacing*i, sideBar.sizeX, sideBar.sizeY).setRectangleDropZone(sideBar.sizeX, sideBar.sizeY);
            var graphics = this.add.graphics();
            graphics.lineStyle(2, 0xffffff);
            graphics.strokeRect(zones[i].x - zones[i].input.hitArea.width / 2, zones[i].y - zones[i].input.hitArea.height / 2, zones[i].input.hitArea.width, zones[i].input.hitArea.height);
            zoneImages[i] = this.add.image(25, sideBar.yOffset+sideBar.sizeY/2 + i*sideBar.spacing,sideBar.zones[i]);
        }

        // Works with zones when dragging
        var times = ["morning", "midday", "afternoon", "evening", "night"];
        for (i=0; i < times.length; i++)
        {
            var name = times[i];
            times[i] = this.add.image(65+i*28,zones[5].y - zones[5].input.hitArea.height / 2 + 18, name).setInteractive();
            this.input.setDraggable(times[i]);
            times[i].key = name;
        }
        var sideBarTopText = this.add.text(70, 90, 'Time priorities', { fontFamily: 'Arial', fontSize: 16, color: '#00ff00' });

        // Time control buttons
        var pause = this.add.sprite(60, 420, 'pause');
        var play = this.add.sprite(100, 420, 'play');
        var fast = this.add.sprite(140, 420, 'fast');
        pause.setInteractive();
        play.setInteractive();
        fast.setInteractive();

        pause.on('pointerdown', function (pointer) {
            pause.clearTint();
            play.clearTint();
            fast.clearTint();
            this.setTint(0xff00f0);
            console.log("test");
    
        });

        play.on('pointerdown', function (pointer) {
            pause.clearTint();
            play.clearTint();
            fast.clearTint();
            this.setTint(0xff00f0);
            console.log("test");
    
        });

        fast.on('pointerdown', function (pointer) {
            pause.clearTint();
            play.clearTint();
            fast.clearTint();
            this.setTint(0xff00f0);
            console.log("test");
    
        });



/*         this.input.on('gameobjectover', function (pointer, gameObject) {

            gameObject.setTint(0x7878ff);
    
        });
    
        this.input.on('gameobjectout', function (pointer, gameObject) {
    
            gameObject.clearTint();
    
        });
 */
        this.input.on('dragstart', function (pointer, gameObject) {

            this.children.bringToTop(gameObject);
    
        }, this);
    
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
    
        });
    
        this.input.on('dragenter', function (pointer, gameObject, dropZone) {
            console.log("drag center");
        });
    
        this.input.on('dragleave', function (pointer, gameObject, dropZone) {
            console.log("dragleave");    
        });
    
        this.input.on('drop', function (pointer, gameObject, dropZone) {
            switch(gameObject.key) {

                case "morning":
                    gameObject.x = sideBar.xOffset-sideBar.sizeX/2+gameObject.width/2+3;
                    gameObject.y = dropZone.y;
                  break;

                case "midday":
                    gameObject.x = sideBar.xOffset-sideBar.sizeX/2+gameObject.width*1.5+6;
                    gameObject.y = dropZone.y;
                    sideBar.sizeX
                  break;

                case "afternoon":
                    gameObject.x = sideBar.xOffset-sideBar.sizeX/2+gameObject.width*2.5+9;
                    gameObject.y = dropZone.y;
                break;

                case "evening":
                    gameObject.x = sideBar.xOffset-sideBar.sizeX/2+gameObject.width*3.5+12;
                    gameObject.y = dropZone.y;
                    break;

                case "night":
                    gameObject.x = sideBar.xOffset-sideBar.sizeX/2+gameObject.width*4.5+15;
                    gameObject.y = dropZone.y;
                    break;
        
                default:
                    gameObject.x = gameObject.input.dragStartX;
                    gameObject.y = gameObject.input.dragStartY;
                  break;
              }

            // gameObject.input.enabled = false;
        });
        this.input.on('dragend', function (pointer, gameObject, dropped) {
            if (!dropped)
            {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        });

        this.input.on('pointerdown', function (pointer) {

            console.log('down');
            updateBar(50, masks[0], bars[0][0]);
            updateBar(20, masks[1], bars[1][0]);
            updateBar(10, masks[2], bars[2][0]);
            updateBar(100, masks[3], bars[3][0]);
            updateBar(70, masks[4], bars[4][0]);
        }, this);
    }

    update ()
    {

 
    }
};



// Updating the mask on top of the bar
function updateBar(number, objM, objP){
    console.log(objM.x);
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
