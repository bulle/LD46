var progressValue = 50;
var healthValue = 80;
var wealthValue = 40;
var plantsValue = 50;
var awesomeValue = 100;

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
        adjustDifficulty()
    }

var difficultAdjustValue = 0;
var difficultAdjustSpacing = 50;

function adjustDifficulty(){
    if(gameTurn%difficultAdjustSpacing == 0){
        difficultAdjustValue = difficultAdjustValue+0.1;
        console.log(difficultAdjustValue);
    }
    progressValue = progressValue - Math.random() * difficultAdjustValue;
    healthValue = healthValue - Math.random() * difficultAdjustValue;
    wealthValue = wealthValue - Math.random() * difficultAdjustValue;
    plantsValue = plantsValue - Math.random() * difficultAdjustValue;
    awesomeValue = awesomeValue - Math.random() * difficultAdjustValue;
}

function bounds()
{
    if(progressValue>100)
    {
        progressValue=100;
    }
    else if(progressValue<0)
    {
        progressValue=0
    }
    if(healthValue>100)
    {
        healthValue=100;
    }
    else if(healthValue<0)
    {
        healthValue=0
    }
    if(wealthValue>100)
    {
        wealthValue=100;
    }
    else if(wealthValue<0)
    {
        wealthValue=0
    }
    if(plantsValue>100)
    {
        plantsValue=100;
    }
    else if(plantsValue<0)
    {
        plantsValue=0
    }
    if(awesomeValue>100)
    {
        awesomeValue=100;
    }
    else if(awesomeValue<0)
    {
        awesomeValue=0
    }
}

function checkEnd(){
    if(progressValue <= 0 || healthValue <= 0 || wealthValue <= 0 || plantsValue <= 0 || awesomeValue <= 0){
        console.log("end game");
        
    }
}