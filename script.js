console.log("hi");

function dummyData() {

}

function currentGrade() {
    var homeworkAvg = getGradeFromList(document.getElementById('homeworkGrades').value);
    var quizAvg = getGradeFromList(document.getElementById('quizGrades').value);
    var testAvg = getGradeFromList(document.getElementById('testGrades').value);
    var midterm = "idk";

    document.getElementById('output').innerHTML = homeworkAvg;
}

function final() {

}

function getGradeFromList(list) {
    var numArray = list.split(",");
    var i = 0;
    var total = 0;
    for(i; i < numArray.length; i++) {
        total += parseInt(numArray[i]);
    }
    return total/i;
}
