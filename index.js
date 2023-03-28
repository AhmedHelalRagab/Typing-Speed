
let easyWords=[
    'Ahmed',
    'Helal',
]
let normalWords=[
    'Mostafa',
    'Abdelaal',
]
let hardWords=[
    'AhmedHelal',
    'MostafaAdel',
]
let easyWordsTemp=easyWords.length;
let normalWordsTemp=normalWords.length;
let hardWordsTemp=hardWords.length;
let lvls ={
    "easy":5,
    "normal":3,
    "hard":2
};
// array to save scores in local storage
let savedScores=[];
let defualLevel="normal";
let defualSec=lvls[defualLevel];
// all selectors
let spanLvl=document.querySelector(".message .level");
let spanSec=document.querySelector(".message .seconds");
let startBotton=document.querySelector('.start');
let theWord=document.querySelector('.the-word');
let input=document.querySelector('.input');
let upcomingWords=document.querySelector('.upcoming-words');
let timeLeft=document.querySelector('.control .time')
let score=document.querySelector('.control .score');
let total=document.querySelector('.control .total');
let scoreGot=document.querySelector('.control .got');
let finish=document.querySelector('.finish');
let selectedLevel=document.querySelector('select');
let startAgain=document.querySelector('.start-again');

total.appendChild(document.createTextNode(checkSelectedValue(selectedLevel.value)));
selectedLevel.addEventListener('blur',function(){
    if(selectedLevel==defualLevel){
        // add the level and the seconds to the page
        spanLvl.appendChild(document.createTextNode(defualLevel))
        spanSec.appendChild(document.createTextNode(defualSec));
        timeLeft.appendChild(document.createTextNode(defualSec));

    }else{
        spanLvl.appendChild(document.createTextNode(selectedLevel.value));
        spanSec.appendChild(document.createTextNode(lvls[selectedLevel.value]));
        timeLeft.appendChild(document.createTextNode(lvls[selectedLevel.value]));
    }

})
// total.appendChild(document.createTextNode(allWords.length));
function checkSelectedValue(l){
    if(l=='normal'){
        return normalWordsTemp;
    }
   else if(l=='easy'){
        return easyWordsTemp;
    }
    else{
        return hardWordsTemp;
    }
}
function checkOriginalValue(l){
    if(l=='normal'){
        return normalWords.length;
    }
    else if(l=='easy'){
        return easyWords.length;
    }
    else{
        return hardWords.length;
    }
    
}

// clicking on start botton
startBotton.onclick=function(){
    this.remove();
    input.focus();
    generateWords();
}
input.onpaste=function(){
    return false;
}
function randomWords(level){
    if(level.length>0){
        let randomWord=level[Math.floor(Math.random()*level.length)];
        let index=level.indexOf(randomWord);
        theWord.appendChild(document.createTextNode(randomWord));
        theWord.style.display='block'
        level.splice(index,1);
    
        upcomingWords.innerHTML='';
    
        for(let i=0;i<level.length;i++){
            let Div=document.createElement('div');
            let text=document.createTextNode(level[i]);
            Div.appendChild(text);
            upcomingWords.appendChild(Div);
        }
    }
}
function generateWords(){
    if(selectedLevel.value==defualLevel){
        
        randomWords(normalWords)
    }else{
        if(selectedLevel.value=='easy'){
            randomWords(easyWords)
        }else{
            randomWords(hardWords)
        }
    }

        playFun();
    }
    


function playFun(){
if(scoreGot.innerHTML==0){
    console.log(scoreGot.innerHTML);
    timeLeft.innerHTML=lvls[selectedLevel.value]+3;
    console.log(timeLeft.innerHTML)
}else{
    timeLeft.innerHTML=lvls[selectedLevel.value];
}
   let set= setInterval(() => {
       if(timeLeft.innerHTML==='0'){
            clearInterval(set);
            if(input.value===theWord.innerHTML){
                scoreGot.innerHTML++;
                theWord.innerHTML='';
                input.value='';
                if(checkOriginalValue(selectedLevel.value)>0){
                    generateWords();

                }
                if(scoreGot.innerHTML==checkSelectedValue(selectedLevel.value)){
                    finish.style.display='block';
                    finish.style.color='#5783db';
                    finish.appendChild(document.createTextNode("Congrats you have got it"));
                    addToLocalStorage(scoreGot.innerHTML);
                    startAgain.style.display='block';
                }
            }
            else{
                finish.style.display='block';
                finish.style.color='red';
                finish.appendChild(document.createTextNode("Game Over"));
                startAgain.style.display='block';
            }
        }
        else
            {
                timeLeft.innerHTML--;
            }
    }, 1000);
    
}
function addToLocalStorage(value){
    let day=new Date();
    theScore={
        score:value,
        day:day.getDay(),
    }
    savedScores.push(theScore);
    window.localStorage.setItem('scores',JSON.stringify(savedScores));
}
startAgain.addEventListener('click',function(){
    window.location.reload();
})












