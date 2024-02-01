
const QUIZZESURL ="https://my-json-server.typicode.com/tosinalao/Project-3-Build-Front-end-SPA-application/quizzes"
const QUESTIONURL =  "https://my-json-server.typicode.com/tosinalao/Project-3-QuizApplication/questions-and-answers"
const QUESTIONURL2 = "https://my-json-server.typicode.com/tosinalao/Quiz-Application/questions-and-answers"


// appState, keep information about the State of the application.
const appState = {
    current_view : "#input_view",
    quizzes: [],
    currentQuizId : 0,
    question : {},
    student_name : "",
    score: 0,
    questionNo: 0,
    message:'',
    messageOptions: ['Brilliant!', 'Awesome','Great'],
    userAnswers: []



}


function startAgain() {
  appState.current_view =  "#input_view";

  appState.currentQuizId = 0,
  appState.score =  0,
  appState.questionNo = 0


  update_view(appState);
}

document.addEventListener('DOMContentLoaded', () => {
  // Set the state
  appState.current_view =  "#input_view";
  update_view(appState,null);

  //
  // EventDelegation - handle all events of the widget
  //

  document.querySelector("#widget_view").onclick = (e) => {
      handle_widget_event(e)
  }
});



function handle_widget_event(e) {
  if (appState.current_view == "#input_view"){
    if (e.target.dataset.action == "submit") {
      appState.current_view =  "#menu_view";
      appState.student_name = document.querySelector("#studentName").value;
        //fetch quizzes
         fetchData(QUIZZESURL).then(data => {
           appState.quizzes = data;
           update_view({quizzes: appState.quizzes});
        } );



    }
  }

}




function setQuestionView() {
  if (!appState.question.hasOwnProperty("questionTypeId") ) {
    appState.current_view  = "#end_view";

    var result =  appState.score / appState.questionNo  * 100;

    if(result >= 80)
       appState.message  =`Congratulations ${appState.student_name} You Passed the Quiz with a ${result} `
    else
       appState.message  =`Sorry ${appState.student_name} You Failed the Quiz with a ${result} `
    return
  }

  if (appState.question.questionTypeId == 1 )  appState.current_view = "#question_view_multiple_choice_single";
  else if (appState.question.questionTypeId == 2)  appState.current_view = "#question_view_multiple_choice_multiple";
  else if (appState.question.questionTypeId == 3)  appState.current_view = "#question_view_text_input";
  else if (appState.question.questionTypeId == 4)   appState.current_view = "#question_view_true_false";
  else if(appState.question.questionTypeId ==  5)     appState.current_view = "#question_view_fill_in_the_blank";

}

function update_view(model) {

  const html_element = render_widget(model, appState.current_view)
  document.querySelector("#widget_view").innerHTML = html_element;
}
//

const render_widget = (model,view) => {
  // Get the template HTML
  template_source = document.querySelector(view).innerHTML
  // Handlebars compiles the above source into a template
  var template = Handlebars.compile(template_source);

   console.log('model',model)
  if(model !=null)  return template(model)

  console.log(appState);

   return template({});
}



//function helper

function checkName(ele){

  if(ele.value.length >= 4){
     document.querySelector('#nameBtn').disabled = false;
  }else{
    document.querySelector('#nameBtn').disabled = true;
  }

}




async function fetchData(url){

  var response = await fetch(url);
  return await response.json();

}


function setSelectedQuiz(ele){

   if(ele.value !=="0"){

        appState.currentQuizId =ele.value
        gotoNextQuestion();

   }
}

function gotoNextQuestion(){
  appState.questionNo++;
  var baseUrl = appState.currentQuizId == 2 ? QUESTIONURL2 : QUESTIONURL
  var url  =  `${baseUrl}?quizId=${appState.currentQuizId}&id=${appState.questionNo}`

  console.log(`Url: ${url}`);

  fetchData(url).then(data => {

    appState.question = data[0] ?? {};
    setQuestionView();

    update_view({question: appState.question, questionNo: appState.questionNo, message: appState.message})

  } );

}


function nextQuestion(ele){

   //check answer

   var answerId =parseInt( ele.getAttribute('data-answer-id'))
   if(  answerId == appState.question.correctAnswerId){
        appState.score ++;
        showEncouragingView();
        setTimeout( gotoNextQuestion, 1000);

   }else{
     //show hint
     var answer = appState.question.answers.find(x => x.id ==  answerId);
     appState.userAnswers = [{id: answerId , text: answer.text, correct:false }];
     showexplanationView();
   }



}

function showEncouragingView(){
    appState.current_view = "#encouraging_view";
    appState.message =  appState.messageOptions[parseInt(Math.random() * 3)];
    update_view({message: appState.message});
}


function showexplanationView(){
  appState.current_view = "#explanation_view";
  update_view({question: appState.question, userAnswers: appState.userAnswers});
}

function checkInputAnswer(){

   var userInputs = document.getElementsByName("text-answer");

   var userAnswers = [];
   var valid = true;

   console.log(userInputs);

   for(var input of userInputs){

      var answerId =parseInt(input.getAttribute('data-answer-id'));
      var answer = appState.question.answers.find(x => x.id ==  answerId)

       if( input.value.toLowerCase()  != answer.text.toLowerCase()  ){
              valid = false;
              userAnswers.push({id: answerId , text: input.value, correct:false })

        }else{
            userAnswers.push({id: answerId , text: input.value, correct:true })

        }


      }

      console.log(valid)
    appState.userAnswers = userAnswers;




   if(valid){
        appState.score ++;
        showEncouragingView();
        setTimeout( gotoNextQuestion, 1000);

   }else{
     var answer = appState.question.answers.find(x => x.id ==  answerId);
     appState.userAnswers = [{id: answerId , text: answer.text, correct:false }];
     showexplanationView();


   }

}



function handleMultipleOption(){

  var userInputs = document.getElementsByName("text-answer");

  var userAnswers = [];
  var valid = true;

  console.log(appState.question.correctAnswerIds)
  for(var input of userInputs){

     var answerId =parseInt(input.getAttribute('data-answer-id'));

      var answer = appState.question.correctAnswerIds.find( x => x == answerId)

      console.log(answerId, appState.question.correctAnswerIds.hasOwnProperty(answerId));

      if( input.checked  &&  !answer ){
             valid = false;
             userAnswers.push({id: answerId , text: input.value, correct:false })

       }else if( !input.checked  &&  answer ){
        valid = false;
        userAnswers.push({id: answerId , text: input.value, correct:false })

      }
      else{
           userAnswers.push({id: answerId , text: input.value, correct:true })

       }



     }


   appState.userAnswers = userAnswers;




  if(valid){
       appState.score ++;
       showEncouragingView();
       setTimeout( gotoNextQuestion, 1000);

  }else{
    showexplanationView();

  }

}
