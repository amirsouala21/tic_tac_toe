const selectBox = document.querySelector('.select-box')
const Xbtn = selectBox.querySelector('.player-x')
const Obtn = selectBox.querySelector('.player-o')

const playBoard = document.querySelector('.play-board')
const xTurnButton = document.querySelector('.xturn')
const oTurnButton = document.querySelector('.oturn')

const allBox = document.querySelectorAll('section div')
const allBoxes = Array.from(allBox)

var winner = false
var matchDraw = false

const resultBox = document.querySelector('.result-box')
const wonText = resultBox.querySelector('.won-text')
const replayBtn = resultBox.querySelector('.result-box button')

// the selection of the elements -------------------------------------------------------------------------

window.onload = ()=>{

    allBoxes.forEach(box =>{ 
        box.setAttribute('onclick' , 'checkBox(this)') 
    }) // click event on every box 

    Xbtn.addEventListener('click', ()=>{ // selectiong the 'x'
        hideElement(selectBox)
        setTimeout(()=>{
            showElement(playBoard)
        },400)   
        xTurnButton.classList.add('active') 
        
    })
    Obtn.addEventListener('click', ()=>{ // selecting the 'O'
        hideElement(selectBox)
        setTimeout(()=>{
            showElement(playBoard)
        },400)    
        oTurnButton.classList.add('active')    
    })

    
}

// refactoring -------------------------------------------------------------------------------------------

var hideElement = (element)=>{
    element.classList.add('hide') 
    element.classList.remove('show')
} // hiding the element

var showElement = (element)=>{
    element.classList.remove('hide')
    element.classList.add('show')
} // showing the element

var checkBox = (element)=>{
    if(winner === false){ //while we ddon't have a winner we do :
        if(xTurnButton.classList.contains('active')){
            element.innerHTML = 'X'
            element.setAttribute('id','x') // every time we click on a box we set its id to X or O
        }else{
            element.innerHTML ='O'
            element.setAttribute('id', 'o')
        }
        element.style.pointerEvents = "none"
        xTurnButton.classList.toggle('active') // toggle the class active to switch from player X to O 
        oTurnButton.classList.toggle('active')

        if(selectWinner() === "x" || selectWinner() === "o"){ // we check if we have a winner
            winner = true 
            
            setTimeout(()=>{
                hideElement(playBoard)
                showElement(resultBox)
            },500)   

            wonText.innerHTML = 'player (<p> ' + selectWinner() + ' </p>) won the game '

        }
    }
}

var getSign = (i)=>{
    return  (document.querySelector('.box' + i)).id
} // get sign ---> recupere la valeur de box .. si box = X ou box = O

var checkSign = (index1,index2,index3,sign)=>{
    return ( (getSign(index1) === sign) && (getSign(index2) === sign) && (getSign(index3) === sign))
} // verify if the box with the 3 index are all equal to X or O 

var selectWinner = ()=>{
    sign ="x"// we check for the X then for the O 
    if(checkSign(1,2,3,sign) || checkSign(4,5,6,sign) || checkSign(6,7,8,sign) || checkSign(1,4,7,sign) || checkSign(2,5,8,sign) || checkSign(3,6,9,sign) || checkSign(3,5,7,sign) || checkSign(1,5,9,sign) ){
        return(sign) // if we have a winner we return the value of sign (rest of function will not be executed)
    }
    sign ="o"
    if(checkSign(1,2,3,sign) || checkSign(4,5,6,sign) || checkSign(6,7,8,sign) || checkSign(1,4,7,sign) || checkSign(2,5,8,sign) || checkSign(3,6,9,sign) || checkSign(3,5,7,sign) || checkSign(1,5,9,sign) ){
        return(sign)
    }
    // if we have a draw we chekch every ID of every box .. if all are different for '' means :
    // we have clicked on all of them without geting a winner .. it's a draw
    if(getSign(1)!='' && getSign(2)!='' && getSign(3)!='' && getSign(4)!='' && getSign(5)!='' && getSign(6)!='' &&getSign(7)!='' &&getSign(8)!='' &&getSign(9)!='' ){
        setTimeout(()=>{
            hideElement(playBoard)
            showElement(resultBox)
        },500)   

        wonText.innerHTML = 'match has been drawn'
    }
}

replayBtn.onclick = ()=>{
    window.location.reload()
} // reloading the game 