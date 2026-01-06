//console.log("hello world")
//console.log("This is javaScript file.")

/*
let name = "john";
let age = 5.9;
let height = 169;
const PI = 3.14;
name = "Buakaw";
console.log("Name:",name);
console.log("Age:",age);
console.log("Height:",height);
*/

// +-*/
/*
let number1 = 10;
let number2 = 3;
let result = number1+number2;
console.log("ผลบวก:",result); 
*/
/*
let number1 = 5;
let number2 = 3;
let condition = number1 <= number2;
console.log("condition:",condition);

if (number1 >= number2) {
    console.log("num1 >= num2");
} else if (number1 == number2) {
    console.log("this is else if");
} else {
    console.log("this is else");
}
*/
/*
let SCORE = prompt("enter your score:");
if (SCORE >=80) {
    console.log("you got grade A");
} else if (SCORE >=70) {
    console.log("you got grade B");
} else if (SCORE >=60) {
    console.log("you got grade C");
} else if (SCORE >=50) {
    console.log("you got grade D");
} else {
    console.log("you got grade F");
}
*/
/*
let number1=5;
let number2=10;

let condition = (number1 > 0) || (number2 >0);
console.log("condition:",condition);

let age = 25;
let gander = "female";
if (age == 18 && gender == "male") {
    console.log("คุณไป รด ได้");
}
    */
/*
let num1 = 20;
if (num1 %2 ==0 ) {
    console.log("even");
} else {
    console.log("odd");
}
    */
/*
let count =0;
while(count<=5) {
    console.log("while",count)
    count = count+1;
}
for (let i = 0;i<=4;i=i+1) {
    console.log("for",i)

}
    */
   /*
let age1 = 2;
let age2 = 3;
let age3 = 4;
let age = [1,2,3];
console.log(age);
console.log(age[2])

age = [40,45,50];
console.log(age);

age.push(55);
console.log(age);

console.log(age.length);

age.pop();
console.log(age);

if (age.includes[45]) {
    console.log("find 45 in array");
}

let numbers = [50,60,80,40,50];
numbers.sort();
console.log(numbers);

let names = ["jhon","jane","doe"]
names.push("scotty");
console.log(names);
console.log(names.length);

for (let i=0; i< names.length; i++){
    console.log(names[i]);
}
*/
/*
let student = [{
    age:20,
    name:"tiger",
    grade:"A"
},{
    age:20,
    name:"rory",
    grade:"A"
}]

for (let i=0;i< student.length;i++) {
console.log("student"+ (i+1)+":");
console.log("name:"+student[i].name);
console.log("grade:"+student[i].age);
console.log("grade:"+student[i])

}

function calcurate_grade(score){
    if (score >=80) {
        return "A";
    } else if (score >=70) {
        return "B";
    } else if (score >=60) {
        return "c";
    } else if (score >=50) {
        return "D";
    } else {
        return "F";
    }
}

let student_score = 85;
let student_grade =  calcurate_grade(student_score);
console.log("student grade is" + student_grade)
*/
/*
let score = [10,20,30,40];
for (let i =0;i<score.length;i++) {
    console.log(`Score at index ${i} is ${score}`);
}
score = score.map((s) => {
    return s * 2
})
score.forEach((s)=> {
    console.log('score',s)
})
*/
/*
let score = [10,20,30,40,50];

for (let index = 0; index <score.length; index++){
    console.log('score',score[index])
    
    }
let newScore = score.filter((s)=>{
    return s >=30
})
console.log("newScore:",newScore)

newScore.forEach((ns)=>{
    console.log('new score:',ns)
})
    */

let students = [
    {
        name: 'aa',
        score: '50',
        grade: 'A',
    },
    {
        name: 'bb',
        score: '50',
        grade: 'B',
    }
]
console.log('Student:',students[0])
let student = students.find((s) =>{
    if (s.name == 'bb') {
        return true
    }
})
 
let dublescore_student = students.map((s)=>{
    s.score = s.score *2
    return s
})

console.log('student:',student)
console.log(dublescore_student)

let hightScore_student = students.filter((s)=>{
    if (s.score >=110) {
        return true
    }
})

console.log('hightscore student:'<hightScore_student)