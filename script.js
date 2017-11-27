console.log("does it work");
var roundedGrade = 85;
var messagesToUser = ["enter better data my dude", "I said enter better data", "CHILLLL", "why are you so dumb", "just enter some good data for once"];
var badInputs = 0;

function gradesAreGood() {
    console.log('in gradesAreGood');
    var homeworkGrades = getGradeFromList(document.getElementById('homeworkGrades').value) / 100;
    var homeworkWeight = checkWeight(document.getElementById('homeworkWeight').value) / 100;
    var quizGrades = getGradeFromList(document.getElementById('quizGrades').value) / 100;
    var quizWeight = checkWeight(document.getElementById('quizWeight').value) / 100;
    var testGrades = getGradeFromList(document.getElementById('testGrades').value) / 100;
    var testWeight = checkWeight(document.getElementById('testWeight').value) / 100;
    var midtermGrade = getGradeFromList(document.getElementById('midtermGrade').value) / 100;
    var midtermWeight = checkWeight(document.getElementById('midtermWeight').value) / 100;
    var avgGrade = quizGrades * quizWeight + testGrades * testWeight + midtermGrade * midtermWeight + homeworkGrades * homeworkWeight;

    roundedGrade = Math.round(avgGrade * 10000)/100;

    colorGrades([homeworkGrades, quizGrades, testGrades, midtermGrade]);
    colorWeights([homeworkWeight, quizWeight, testWeight, midtermWeight]);
    if((midtermWeight + homeworkWeight + testWeight + quizWeight) !== 1) { //some of the time it doesn't work
        console.log('bad weights');
        document.getElementById('weightHeader').style.color = 'red';
        //bad weights input
        return false;
    } else if(!(homeworkGrades && quizGrades && testGrades && midtermGrade) || !(homeworkWeight && quizWeight && testWeight && midtermWeight)) {
        console.log('bad grades or weight');
        return false;
    } else {
        document.getElementById('weightHeader').style.color = 'black';
        return true;
    }
}

function currentGrade() {
    if(gradesAreGood()) {
        console.log('good stuff');
        document.getElementById('currentGradeOutput').innerHTML = roundedGrade + "%";
        badInputs = 0;
    } else {
        document.getElementById('currentGradeOutput').innerHTML = messagesToUser[badInputs];
        badInputs++;
    }
}

function final() {
    var gradeWanted = document.getElementById('gradeWanted').value / 100;
    var finalWeight = document.getElementById('finalWeight').value / 100;
    var gradesWeight = 1 - finalWeight;

    if(gradesAreGood() && parseFloat(gradeWanted) && parseFloat(finalWeight)) {
        console.log('calculating final...');
        var gradeNeeded = (gradeWanted - (gradesWeight * (roundedGrade / 100))) / finalWeight;
        var gradeNeededRounded = Math.round(gradeNeeded * 10000) / 100;
        document.getElementById('finalGradeOutput').innerHTML = "You need to get a " + gradeNeededRounded + "% on your final";
        badInputs = 0;
    } else {
        document.getElementById('finalGradeOutput').innerHTML = messagesToUser[badInputs];
        badInputs++;
    }
}

//returns the average grade from a list. If the input is bad it returns false (or NaN)
function getGradeFromList(list) {
    var numArray = list.split(",");
    var i = 0;
    var total = 0;
    for(i; i < numArray.length; i++) {
        total += parseFloat(numArray[i]);
        if(isNaN(numArray[i])) {
            return false;
        }
    }
    return total/i;
}

function colorGrades(array) {
    var str = ['homeworkGrades', 'quizGrades', 'testGrades', 'midtermGrade'];
    for(var i = 0; i < array.length; i++) {
        if(!array[i]) {
            document.getElementById(str[i]).style.color = "red";
        } else {
            document.getElementById(str[i]).style.color = 'black';
        }
    }

    var gradeWanted = document.getElementById('gradeWanted').value / 100;
    var finalWeight = document.getElementById('finalWeight').value / 100;
    if(isNaN(gradeWanted)) {
        document.getElementById('gradeWanted').style.color = 'red'
    } else {
        document.getElementById('gradeWanted').style.color = 'black'
    }
    if(isNaN(finalWeight)) {
        document.getElementById('finalWeight').style.color = 'red'
    } else {
        document.getElementById('finalWeight').style.color = 'black'
    }
}

function colorWeights(array) {
    var str = ['homeworkWeight', 'quizWeight', 'testWeight', 'midtermWeight'];
    for(var i = 0; i < array.length; i++) {
        if(!array[i]) {
            document.getElementById(str[i]).style.color = 'red'
        } else {
            document.getElementById(str[i]).style.color = 'black'
        }
    }
}

function checkWeight(num) {
    if(isNaN(num)) {
        return false;
    } else {
        return num;
    }
}