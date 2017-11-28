console.log("does it work");
var roundedGrade = 85;
var messagesToUser = ["enter better data my dude", "I said enter better data", "CHILLLL", "why are you so dumb", "just enter some good data for once"];
var badInputs = 0;
var homeworkGrades;
var quizGrades;
var testGrades;
var midtermGrade;

function gradesAreGood() {
    console.log('in gradesAreGood');
    homeworkGrades = getGradeFromList(document.getElementById('homeworkGrades').value) / 100;
    var homeworkWeight = checkWeight(document.getElementById('homeworkWeight').value) / 100;
    quizGrades = getGradeFromList(document.getElementById('quizGrades').value) / 100;
    var quizWeight = checkWeight(document.getElementById('quizWeight').value) / 100;
    testGrades = getGradeFromList(document.getElementById('testGrades').value) / 100;
    var testWeight = checkWeight(document.getElementById('testWeight').value) / 100;
    midtermGrade = getGradeFromList(document.getElementById('midtermGrade').value) / 100;
    var midtermWeight = checkWeight(document.getElementById('midtermWeight').value) / 100;
    var avgGrade = quizGrades * quizWeight + testGrades * testWeight + midtermGrade * midtermWeight + homeworkGrades * homeworkWeight;

    roundedGrade = Math.round(avgGrade * 10000)/100;

    colorGrades([homeworkGrades, quizGrades, testGrades, midtermGrade]);
    colorWeights([homeworkWeight, quizWeight, testWeight, midtermWeight]);
    if((homeworkWeight + quizWeight + testWeight + midtermWeight) !== 1) { //some of the time it doesn't work
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
        colorBackgrounds();
        alertHighGrades();
        badInputs = 0;
    } else {
        document.getElementById('currentGradeOutput').innerHTML = messagesToUser[badInputs % 5];
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
        colorBackgrounds();
        alertHighGrades();
        document.getElementById('finalWeight').className -= 'badPlaceholder';
        badInputs = 0;
    } else if(finalWeight == '') {
        document.getElementById('finalWeight').classList.add('badPlaceholder');
        document.getElementById('finalGradeOutput').innerHTML = messagesToUser[badInputs % 5];
        badInputs++;
    } else {
        document.getElementById('finalGradeOutput').innerHTML = messagesToUser[badInputs % 5];
        badInputs++;
    }
}

function colorBackgrounds() {
    var ids = ['homework', 'quizzes', 'tests', 'midterm'];
    var grades = [homeworkGrades, quizGrades, testGrades, midtermGrade];
    for(var i = 0; i < 4; i++) {
        var grade = grades[i];
        var id = document.getElementById(ids[i]);
        if(grade >= .90) {
            id.style.backgroundColor = 'lightgreen';
        } else if(grade >= .80) {
            id.style.backgroundColor = 'yellow'
        } else if (grade >= .70) {
            id.style.backgroundColor = 'orange'
        } else if (grade >= .60) {
            id.style.backgroundColor = 'orangered';
        } else {
            id.style.backgroundColor = 'darkred';
        }
    }
}

function alertHighGrades() {
    var ids = ['homework', 'quizzes', 'tests', 'midterm'];
    var grades = [homeworkGrades, quizGrades, testGrades, midtermGrade];
    for(var i = 0; i < 4; i++) {
        if(grades[i] > 1) {
            alert('your' + ids[i] + 'grade is very high');
        }
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