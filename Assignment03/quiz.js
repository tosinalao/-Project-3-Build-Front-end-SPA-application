
const QUIZZESURL ="https://my-json-server.typicode.com/tosinalao/Project-3-Build-Front-end-SPA-application/quizzes"
const QUESTIONURL =  "https://my-json-server.typicode.com/tosinalao/Project-3-Build-Front-end-SPA-application/questions-and-answers"



// appState, keep information about the State of the application.
const appState = {
    current_view : "#input_view",
    quizzes: [],
    currentQuizId : 0,
    question : {},
    student_name : "",
    score: 0,
    questionNo: 1,


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




  // if (appState.current_view == "#menu_view"){
  //   if (e.target.id == "quiz_1") {
  //     appState.current_view =  "#quiz1_view";
  //        appState.current_model = {
  //          action : "start_app"
  //        }
  //       // Now that the state is updated, update the view.
  //       update_view(appState);

  //   } else if (e.target.id == "quiz_2") {
  //     appState.current_view =  "#quiz2_view";
  //        appState.current_model = {
  //          action : "start_app"
  //        }
  //       // Now that the state is updated, update the view.
  //       update_view(appState);
  //   }
  // }




  // if (appState.current_view == "#quiz1_view"){
  //   if (e.target.dataset.action == "start_app") {

  //       // Update State (current model + state variables)
  //       appState.current_question = 0
  //       appState.current_model = questions[appState.current_question];
  //       // process the appState, based on question type update appState.current_view
  //       setQuestionView(appState);

  //       // Now that the state is updated, update the view.
  //       update_view(appState);
  //   }
  // }

  // if (appState.current_view == "#quiz2_view"){
  //   if (e.target.dataset.action == "start_app") {

  //       // Update State (current model + state variables)
  //       appState.current_question = 0
  //       appState.current_model = questions[appState.current_question];
  //       // process the appState, based on question type update appState.current_view
  //       setQuestionView(appState);

  //       // Now that the state is updated, update the view.
  //       update_view(appState);
  //   }
  // }

  // Handle the answer event for true or false.
//  if (appState.current_view == "#question_view_true_false") {

//     if (e.target.dataset.action == "answer") {
//        // implement logic.
//       isCorrect = check_user_response(e.target.dataset.answer, appState.current_model);

//        // Update the state.
//        appState.current_question =   appState.current_question + 1;
//        appState.current_model = questions[appState.current_question];
//        setQuestionView(appState);

//        // Update the view.
//        update_view(appState);

//      }
//    }

   // Handle the answer event for multiple choice.
  //  if (appState.current_view == "#question_view_multiple_choice") {

  //    if (e.target.dataset.action == "choice") {
  //       // Controller - implement logic.
  //       isCorrect = check_user_response(e.target.dataset.answer, appState.current_model);

  //       // Update the state.
  //       appState.current_question =   appState.current_question + 1;
  //       appState.current_model = questions[appState.current_question];
  //       setQuestionView(appState);

  //       // Update the view.
  //       update_view(appState);

  //     }
  //   }

    // Handle the answer event for image choice.
  //   if (appState.current_view == "#question_view_image_choice") {

  //     if (e.target.dataset.action == "image") {
  //        // Controller - implement logic.
  //        isCorrect = check_user_response(e.target.dataset.answer, appState.current_model);

  //        // Update the state.
  //        appState.current_question =   appState.current_question + 1;
  //        appState.current_model = questions[appState.current_question];
  //        setQuestionView(appState);

  //        // Update the view.
  //        update_view(appState);

  //      }
  //    }

  //  // Handle answer event for  text questions.
  //  if (appState.current_view == "#question_view_text_input") {
  //      if (e.target.dataset.action == "submit") {

  //          user_response = document.querySelector(`#${appState.current_model.answerFieldId}`).value;
  //          isCorrect = check_user_response(e.target.dataset.answer, appState.current_model);
  //          updateQuestion(appState)

  //          setQuestionView(appState);
  //          update_view(appState);
  //      }
  //   }

    // Handle answer event for fill in the blank questions.
    // if (appState.current_view == "#question_view_blank_input") {
    //     if (e.target.dataset.action == "blank_input") {

    //         user_response = document.querySelector(`#${appState.current_model.answerFieldId}`).value;
    //         isCorrect = check_user_response(e.target.dataset.answer, appState.current_model);
    //         updateQuestion(appState)

    //         setQuestionView(appState);
    //         update_view(appState);
    //     }
    //  }


    // Handle answer event for end view.
 //if (appState.current_view == "#end_view") {
  //       if (e.target.dataset.action == "start_again") {
    //       appState.current_view =  "#input_view";
      //     appState.current_model = {
        //     action : "submit"
          // }
           //update_view(appState);

         //}
       //}

//  } // end of handle_widget_event


// function check_user_response(user_answer, model) {
//   if (user_answer == model.correctAnswer) {
//     return true;
//   }
//   return false;
// }

// function updateQuestion(appState) {
//     if (appState.current_question < questions.length-1) {
//       appState.current_question =   appState.current_question + 1;
//       appState.current_model = questions[appState.current_question];
//     }
//     else {
//       appState.current_question = -2;
//       appState.current_model = {};
//     }
// }

function setQuestionView() {
  if (!appState.question.hasOwnProperty("questionTypeId") ) {
    appState.current_view  = "#end_view";
    return
  }

  if (appState.question.questionTypeId == 1 )  appState.current_view = "#question_view_multiple_choice_single";
  else if (appState.question.questionTypeId == 2)  appState.current_view = "#question_view_multiple_choice_multiple";
  else if (appState.question.questionTypeId == 3)  appState.current_view = "#question_view_text_input";
  else if (appState.question.questionTypeId == 4)   appState.current_view = "#question_view_true_false";
  else if(appState.question.questionTypeId ==  5)     appState.current_view = "#question_view_image_choice";

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

  var response=await fetch(url);
  return await response.json();

}


function setSelectedQuiz(ele){

   if(ele.value !=="0"){

        appState.currentQuizId =ele.value
        gotoNextQuestion();

   }
}

function gotoNextQuestion(){

  var url  =  `${QUESTIONURL}?quizId=${appState.currentQuizId}&id=${appState.questionNo}`


  fetchData(url).then(data => {

    appState.question = data[0] ?? {};
    setQuestionView();

    update_view({question: appState.question, questionNo: appState.questionNo})

  } );

}

function nextQuestion(ele){

   //check answer
   appState.questionNo++;
   if( parseInt( ele.getAttribute('data-answer-id'))  == appState.question.correctAnswerId){
        appState.score ++;
        gotoNextQuestion();
   }else{

    //show hint

   }

   //


}

function checkInputAnswer(){

   var userInput = document.querySelector("[name=text-answer]").value;
   if( userInput.toLowerCase()  === appState.question.answers[0].text.toLowerCase()  ){
      appState.score ++;
      gotoNextQuestion();
   }else{
     const explanation = document.getElementById('explanation')
     document.querySelector('#explanation');
     explanation.classList.remove('hide')
     gotoNextQuestion();

    //show hint

   }

}
