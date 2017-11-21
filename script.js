console.log("does it work");

function dummyData() {

}

function currentGrade() {
    console.log('in currentGrade')
    var homeworkAvg = getGradeFromList(document.getElementById('homeworkGrades').value);
    var homeworkWeight = parseFloat(document.getElementById('homeworkWeight').value);
    var quizAvg = getGradeFromList(document.getElementById('quizGrades').value);
    var quizWeight = parseFloat(document.getElementById('quizWeight').value);
    var testAvg = getGradeFromList(document.getElementById('testGrades').value);
    var testWeight = parseFloat(document.getElementById('testWeight').value);
    var midtermAvg = getGradeFromList(document.getElementById('midtermGrade').value);
    var midtermWeight = parseFloat(document.getElementById('midtermWeight').value);
    var avgGrade = quizAvg * quizWeight + testAvg * testWeight + midtermAvg * midtermWeight + homeworkAvg * homeworkWeight;

    if((midtermWeight + homeworkWeight + testWeight + quizWeight) != 1) {
        console.log('bad weights');
        //bad weights input
    } else if(!(homeworkAvg && quizAvg && testAvg && midtermAvg)) {
        //bad grades input
        console.log('bad grades')
    } else {
        console.log('good stuff');
        document.getElementById('output').innerHTML = avgGrade;
    }

}

function final() {
    var gradeWanted = document.getElementById('gradeWanted').value;
    var finalWeight = document.getElementById('finalWeight').value;
}

//returns the average grade from a list. If the input is bad it returns false (or NaN)
function getGradeFromList(list) {
    console.log('in getGradeFromList')
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

