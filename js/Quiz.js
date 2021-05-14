class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();

    //write code to change the background color here
    background("blue");
    

    //write code to show a heading for showing the result of Quiz
    fill("white");
    textSize(30);
    text("Result Of Quiz",340, 50);


    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();

    //write condition to check if contestantInfor is not undefined
    if(allContestants !== undefined){

    //write code to add a note here
    fill("white");
    textSize(20);
    text("NOTE: contestant who answered correct is highlighted in yellow colour ", 130,230);
  
    var yPosition = 230;
    //write code to highlight contestant who answered correctly
      for(var plr in allContestants){
        var correctAns = "2";
        if (correctAns === allContestants[plr].answer){
          fill("yellow");
        }else{
          fill("cyan");
        }

        yPosition = yPosition + 30;
        textSize(30);
        text(allContestants[plr].name + ": " + allContestants[plr].answer,250, yPosition);
      }

    }
  }

}
