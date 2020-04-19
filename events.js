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

//  progress  health  wealth  plants  awesome
// Write the function out in a dedicated 
function throwEvent(){
    eventContainer.visible = true;
    gameMode ="event"
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

        case 3:
            // A date
            eventConsequenceAccept = [-4, 5, -10, 0, 10];
            eventConsequenceReject = [0, -5, 0, 0, -10];
            var content = [
                "A girl swipped right on tinder.",
                "Make her the star of the night?"];
            eventText.text = content;
        break;
        case 4:
            // A date
            eventConsequenceAccept = [-4, 5, -10, 0, 10];
            eventConsequenceReject = [0, -5, 0, 0, -10];
            var content = [
                "A girl swipped right on tinder.",
                "Make her the star of the night?"];
            eventText.text = content;
        break;
        case 5:
            // A date
            eventConsequenceAccept = [-4, 5, -10, 0, 10];
            eventConsequenceReject = [0, -5, 0, 0, -10];
            var content = [
                "A girl swipped right on tinder.",
                "Make her the star of the night?"];
            eventText.text = content;
        break;
        case 6:
            // A date
            eventConsequenceAccept = [-4, 5, -10, 0, 10];
            eventConsequenceReject = [0, -5, 0, 0, -10];
            var content = [
                "A girl swipped right on tinder.",
                "Make her the star of the night?"];
            eventText.text = content;
        break;
        case 7:
            // A date
            eventConsequenceAccept = [-4, 5, -10, 0, 10];
            eventConsequenceReject = [0, -5, 0, 0, -10];
            var content = [
                "A girl swipped right on tinder.",
                "Make her the star of the night?"];
            eventText.text = content;
        break;
        case 8:
            // A date
            eventConsequenceAccept = [-4, 5, -10, 0, 10];
            eventConsequenceReject = [0, -5, 0, 0, -10];
            var content = [
                "A girl swipped right on tinder.",
                "Make her the star of the night?"];
            eventText.text = content;
        break;
        case 9:
            // A date
            eventConsequenceAccept = [-4, 5, -10, 0, 10];
            eventConsequenceReject = [0, -5, 0, 0, -10];
            var content = [
                "A girl swipped right on tinder.",
                "Make her the star of the night?"];
            eventText.text = content;
        break;
        case 10:
            // A date
            eventConsequenceAccept = [-4, 5, -10, 0, 10];
            eventConsequenceReject = [0, -5, 0, 0, -10];
            var content = [
                "A girl swipped right on tinder.",
                "Make her the star of the night?"];
            eventText.text = content;
        break;
        case 1:
            // A date
            eventConsequenceAccept = [-4, 5, -10, 0, 10];
            eventConsequenceReject = [0, -5, 0, 0, -10];
            var content = [
                "A girl swipped right on tinder.",
                "Make her the star of the night?"];
            eventText.text = content;
        break;
        case 12:
            // A date
            eventConsequenceAccept = [-4, 5, -10, 0, 10];
            eventConsequenceReject = [0, -5, 0, 0, -10];
            var content = [
                "A girl swipped right on tinder.",
                "Make her the star of the night?"];
            eventText.text = content;
        break;
        case 13:
            // A date
            eventConsequenceAccept = [-4, 5, -10, 0, 10];
            eventConsequenceReject = [0, -5, 0, 0, -10];
            var content = [
                "A girl swipped right on tinder.",
                "Make her the star of the night?"];
            eventText.text = content;
        break;
        case 14:
            // A date
            eventConsequenceAccept = [-4, 5, -10, 0, 10];
            eventConsequenceReject = [0, -5, 0, 0, -10];
            var content = [
                "A girl swipped right on tinder.",
                "Make her the star of the night?"];
            eventText.text = content;
        break;
        case 15:
            // A date
            eventConsequenceAccept = [-4, 5, -10, 0, 10];
            eventConsequenceReject = [0, -5, 0, 0, -10];
            var content = [
                "A girl swipped right on tinder.",
                "Make her the star of the night?"];
            eventText.text = content;
        break;
        case 16:
            // A date
            eventConsequenceAccept = [-4, 5, -10, 0, 10];
            eventConsequenceReject = [0, -5, 0, 0, -10];
            var content = [
                "A girl swipped right on tinder.",
                "Make her the star of the night?"];
            eventText.text = content;
        break;
        case 17:
            // A date
            eventConsequenceAccept = [-4, 5, -10, 0, 10];
            eventConsequenceReject = [0, -5, 0, 0, -10];
            var content = [
                "A girl swipped right on tinder.",
                "Make her the star of the night?"];
            eventText.text = content;
        break;
        case 18:
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