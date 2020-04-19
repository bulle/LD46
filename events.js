var eventConsequenceAccept = [];
var eventConsequenceReject = [];
var eventArea;
var eventAccept;
var eventReject;
var eventText;
var eventContainer;
var textForFocus;
var lastEvent = 0;
var eventThreshold = 10;
var eventLikelyhood = 5;

var eventsActive = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

// make response passer!

//  progress  health  wealth  plants  awesome
// Write the function out in a dedicated 
function throwEvent(){
    eventContainer.visible = true;
    gameMode ="event"
    selection = Math.floor(Math.random() * 10);
    switch(selection) {
        case 0:
            // Grandma visiting
            if(eventsActive[0] == 1){
                eventConsequenceAccept = [0, 10, 2, 3, -20];
                eventConsequenceReject = [10, -20, 1, 0, 10];
                var content = [
                    "Grandma is visiting",
                    "Let her in?"];
                eventText.text = content;
            }
            eventsActive[0] = 1;
        break;

        case 1:
            // An opportunity
            if(eventsActive[1] == 1){
                eventConsequenceAccept = [-20, -20, 40, -20, -30];
                eventConsequenceReject = [0, 0, -10, 0, 10];
                var content = [
                    "Your best friend wants you to",
                    "sell drugs. Ok?"];
                eventText.text = content;
            }
            eventsActive[1] = 0;
        break;

        case 2:
            // A date
            if(eventsActive[2] == 1){
            //  progress  health  wealth  plants  awesome
                eventConsequenceAccept = [-4, 5, -10, 0, 10];
                eventConsequenceReject = [0, -5, 0, 0, -10];
                var content = [
                    "A girl swipped right on tinder.",
                    "Make her the star of the night?"];
                eventText.text = content;
            }
            eventsActive[2] = 1;
        break;

        case 3:
            // An exam
            if(eventsActive[3] == 1){
                //  progress  health  wealth  plants  awesome 
                eventConsequenceAccept = [-10, -10, -10, -2, 20];
                eventConsequenceReject = [10, 0, 0, 2, -10];
                var content = [
                    "You have an exam tomorrow BUT",
                    "your body wants to go to town - go?"];
                eventText.text = content;
            }
            eventsActive[3] = 1;
        break;
        case 4:
            // Skiholiday
            if(eventsActive[4] == 1){
                //  progress  health  wealth  plants  awesome
                eventConsequenceAccept = [-5, -5, -20, -10, 30];
                eventConsequenceReject = [5, 0, 0, 2, -10];
                var content = [
                    "Your freinds want to go skiing.",
                    "Join them for an epic ride?"];
                eventText.text = content;
            }
            eventsActive[4] = 0;
        break;
        case 5:
            // A trip to the forrest
            if(eventsActive[5] == 1){
                //  progress  health  wealth  plants  awesome
                eventConsequenceAccept = [-2, 2, 0, 10, 0];
                eventConsequenceReject = [2, -2, 0, 0, -5];
                var content = [
                    "A lot of nice flowers are blooming.",
                    "Nice day for picking a bucket - yes?"];
                eventText.text = content;
            }
            eventsActive[5] = 0;
        break;
        case 6:
            // Grandma
            if(eventsActive[6] == 1){
                eventConsequenceAccept = [0, 10, 2, 3, -20];
                eventConsequenceReject = [10, -20, 1, 0, 10];
                var content = [
                    "Grandma is visiting",
                    "Let her in?"];
                eventText.text = content;
            }
            eventsActive[6] = 0;
        break;
        case 7:
            // Grandma
            if(eventsActive[7] == 1){
                eventConsequenceAccept = [0, 10, 2, 3, -20];
                eventConsequenceReject = [10, -20, 1, 0, 10];
                var content = [
                    "Grandma is visiting",
                    "Let her in?"];
                eventText.text = content;
            }
            eventsActive[7] = 0;
        break;
        case 8:
            // Pandemic
            if(eventsActive[8] == 1){
                //  progress  health  wealth  plants  awesome
                eventConsequenceAccept = [0, -110, -10, -20, -20];
                eventConsequenceReject = [10, -5, 5, 5, 0];
                var content = [
                    "A pandemic as at the rise - but", 
                    "vacation!",
                    "Go with family on vacation - yes?"];
                eventText.text = content;
            }
            eventsActive[8] = 0;
        break;
        case 9:
            // A girlfriend
            if(eventsActive[9] == 1){
                //  progress  health  wealth  plants  awesome
                eventConsequenceAccept = [10, 20, -50, 10, 0];
                eventConsequenceReject = [2, -2, 0, -5, -10];
                var content = [
                    "She is okay, she is okay.",
                    "Make her exclusive?"];
                eventText.text = content;
            }
            eventsActive[9] = 0;
        break;
    }
}

function handleRandomEvents(){
    if ((gameTurn - lastEvent) > eventThreshold){
        if(Math.floor(Math.random() * eventLikelyhood) == 0){
            lastEvent = gameTurn;
            throwEvent();
        }
    }
}

function handleEventConsequences(accepted){

    if(accepted == 1){
        progressValue = progressValue+eventConsequenceAccept[0];
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
}