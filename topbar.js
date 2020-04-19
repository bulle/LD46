var topBar = {
    startX: 84,
    startY: 62, //47,
    spacing: 158,
    textY: 25 //15
}

var bars = [["progressBar","progessContainer"], ["healthBar","healthContainer"], ["wealthBar","wealthContainer"], ["awesomeBar","awesomeContainer"],["plantBar","plantContainer"]];
var masks = [];

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
        objM.x = objP.x-objP.width/2-objP.width/2 + updatedWidth;
    }
}