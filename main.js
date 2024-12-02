const deck = [
    'h_2', 'h_3', 'h_4', 'h_5', 'h_6', 'h_7', 'h_8', 'h_9', 'h_10', 'h_j', 'h_q', 'h_k', 'h_a', // Hearts
    'd_2', 'd_3', 'd_4', 'd_5', 'd_6', 'd_7', 'd_8', 'd_9', 'd_10', 'd_j', 'd_q', 'd_k', 'd_a', // Diamonds
    's_2', 's_3', 's_4', 's_5', 's_6', 's_7', 's_8', 's_9', 's_10', 's_j', 's_q', 's_k', 's_a', // Spades
    'c_2', 'c_3', 'c_4', 'c_5', 'c_6', 'c_7', 'c_8', 'c_9', 'c_10', 'c_j', 'c_q', 'c_k', 'c_a'  // Clubs
];
// const deck = [
//     'h_a','h_a','h_a','h_a','h_a','h_a','h_a', 'h_a','h_a', 'h_a'
// ];
let first = true;
let scoreMy = document.getElementById("myScore")
let puntiMy = 0
let puntiSplit = 0;
let scoreDiler = document.getElementById("dilerScore")
let puntiDiler = 0;
let start = 2000;
let end = 0;
let m = 0;
let d =0;
let bjM = false
let bjD = false
let tusD = false;
let tusM = false;
let tusSplit = false;
let firtus = true;
let ins = false;
window.addEventListener('DOMContentLoaded',()=>{})
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}
function dealCard(deck) {
    return deck.pop(); 
}
let shuffledDeck = shuffleDeck([...deck]); 

let desk = document.querySelector(".desk")
for(let i=0;i<52;i++){
    let img = document.createElement("img")
    img.src = "img/back.jpg"
    img.classList = "backCard"
    desk.appendChild(img)
}
let j = 1;
document.querySelectorAll(".backCard").forEach(e => {
    e.style.setProperty('--offset', j*1+'px');
    e.style.zIndex = j;
    j++
});
document.querySelectorAll(".fishka").forEach(function(e) {
    e.onclick = function() {
        let deal = document.querySelector(".deal");
        let cache = document.querySelector(".cache");
        let bet = document.getElementById("bet");
        let currentElement = e;
        if(start>=currentElement.id.replace('b', '')){
            let clonedElement = currentElement.cloneNode(true);
            clonedElement.onclick = function() {
                let num = clonedElement.id.replace('b', '');
                num = Number(num);
                start += num;
                end -= num;
                if(end==0){
                    deal.style.display = 'none'
                }
                bet.textContent = "Your_bet:" + end + "$";
                cache.textContent = "Cache:" + start + "$";
                clonedElement.remove(); // Удаление этого элемента при клике
                console.log(1);
            };
            document.querySelector(".bet").appendChild(clonedElement);
            let num = currentElement.id.replace('b', '');
            num = Number(num);
            start -= num;
            end += num;
            
            deal.style.display = 'block'
            bet.textContent = "Your_bet:" + end + "$";
            cache.textContent = "Cache:" + start + "$";
            
        }
    }}
);
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function deal(){
    document.querySelectorAll(".fishka").forEach(function(e) {
        e.disabled = true;
        e.style.borderColor = 'black'
    })
    
    document.querySelector(".deal").style.display = "none"
    puntiMy=0;
    puntiDiler=0;
    for (let i = 0; i < 2; i++) {
        hit()
        await delay(1100)
    }
    if(puntiMy==21){
        bjM=true
        
    }
    for (let i = 0; i < 2; i++) {
         stand()
        await delay(1100); 
    }
    
    document.querySelector(".double").style.display = 'block'
    document.querySelector(".hit").style.display = "block"
    document.querySelector(".stand").style.display = "block"
}
function cardInNum(card,hod){
    card = card.slice(2);
    if (Number(card) <= 10) {
        return Number(card);
    }
    else if(card=='a'){
        if (hod) {
            tusM = true
            tusSplit = true
        } else {
            tusD = true
        }
        return 11;
    }
     else {
        return 10;
    }
}
function hit() {
    return new Promise((resolve) => {
        const movable = document.querySelector(".backCard");
        const container2 = document.querySelector(".hend");
        document.querySelector(".double").style.display = 'none';
        let translateX = [1150, 1030, 1170, 1040, 1150, 1030];
        let translateY = [170, 180, 380, 390, 580, 580];
        let num;
        movable.style.transition = ''; 
        movable.style.transform = '';
        
        setTimeout(() => {
            movable.style.transition = 'transform 0.9s ease-in-out';
            movable.style.transform = 'translateX(' + translateX[m] + 'px) translateY(' + translateY[m] + 'px)';
            m++;
            
            setTimeout(() => {
                movable.style.cssText = "";
                let deal = dealCard(shuffledDeck)
                let card = document.createElement('img');
                
                card.src = "img/simple_" + deal + ".svg";
                num = cardInNum(deal, true);
                scoreMy.style.display = "block";
                
                if (tusM && puntiMy + num > 21) {
                    puntiMy -= 10;
                    tusM = false;
                }
                puntiMy += num;
                scoreMy.textContent = "Your score:" + puntiMy;
                if (puntiMy > 21) {
                    Luser(true);
                }
                container2.appendChild(card);

                
                resolve(num);
            }, 1000);
        }, 1);
    });
}

async function diler(){
   
    document.querySelector(".hit").style.display = "none"
        document.querySelector(".stand").style.display = "none"
        document.querySelector(".double").style.display = 'none'
       let back= document.querySelector(".dilerBack")
       let deal =dealCard(shuffledDeck)
       back.src = "img/simple_"+deal+".svg"
            let num = cardInNum(deal,false)
            
            puntiDiler+=num
            scoreDiler.textContent = "Diler score:"+puntiDiler;
            if(puntiDiler==21){
                bjD=true;
            }
            while(puntiDiler<17){    
               await stand()
            }
            if(puntiDiler>21){
           
                Luser(false);
            }else{Winer()} 
            
}
async function stand(){
    const movable = document.querySelector(".backCard");
    const container1 = document.querySelector(".diler");
    let translateX = [570,430,570,430]
    let translateY = [185,185,385,385]
    movable.style.transition = ''; 
    movable.style.transform = '';
    await new Promise((resolve) => {
        setTimeout(() => {
        movable.style.transition = 'transform 1s ease-in-out';
        movable.style.transform = 'translateX('+translateX[d]+'px) translateY('+translateY[d]+'px)';
        d++
    setTimeout(()=>{
        movable.style.cssText = "";
        resolve()
        },1000);
    },10);
});
        let deal =dealCard(shuffledDeck)
        let card = document.createElement('img');
        scoreDiler.style.display = "block"
        if(first){
            card.src = "img/back.jpg"
            card.className = "dilerBack"
            first = false;
        }
        else{
            card.src = "img/simple_"+deal+".svg"
            let num = cardInNum(deal)
            if(firtus&&num==11){
                document.querySelector(".insure").style.display = 'block'
                firtus=false
            }
            if(num==11&&puntiDiler+num>21){
                puntiDiler+=1;
            }
            else{
                puntiDiler+=num;
            }
            
        
            scoreDiler.textContent = "Diler score:"+puntiDiler;
        }
             
        container1.appendChild(card)
        
}

function Luser(who){
    
    document.querySelector(".final").style.display  = "flex"
    if(who){
        document.getElementById("result").textContent = 'You Luse' 
        localStorage.setItem('winner',-1)    
    }
    else{
        document.getElementById("result").textContent = 'You Won'
        localStorage.setItem('winner',1) 
    }
    return
}
function Winer(){
    
    document.querySelector(".final").style.display  = "flex"
    if(bjM==true&&bjD==true){
        document.getElementById("result").textContent = 'Draw'
        localStorage.setItem('winner',0)
        return
    }
    else if(bjM==true){
        document.getElementById("result").textContent = 'You Won'
        localStorage.setItem('winner',1)
        return
    }
    else if(bjD==true){
        document.getElementById("result").textContent = 'You Luse'
        localStorage.setItem('winner',-1)
        return
    }

    if(puntiMy<puntiDiler){
        document.getElementById("result").textContent = 'You Luse'
        localStorage.setItem('winner',-1)    
    }
    else if(puntiMy==puntiDiler){
        document.getElementById("result").textContent = 'Draw'
        localStorage.setItem('winner',0) 

    }
    else{
        document.getElementById("result").textContent = 'You Won'
        localStorage.setItem('winner',1) 
    }
}

async function double(){
    document.querySelector(".double").style.display = 'none'
    
    if(start>=end*2){
        start-=end;
        end*=2;
    }
    
    document.getElementById("bet").textContent = "Your_bet:" + end + "$";
    document.querySelector(".cache").textContent = "Cache:" + start + "$";
    console.log(puntiMy)
    await hit()
    console.log(puntiMy)
    if(puntiMy<21){
    setTimeout(diler,1000)
    }
}
function insure(){
    ins = true;
    let cache = document.querySelector(".cache");
    start = start-end/2
    cache.textContent = "Cache:" + (start) + "$";
    document.querySelector(".insure").style.display = 'none'
}


function reset(){
    shuffledDeck = shuffleDeck([...deck]);
let cache = document.querySelector(".cache");
        let bet = document.getElementById("bet");
        let fish = document.querySelector(".bet")
        const buttons = fish.querySelectorAll('button');
        buttons.forEach(button => button.remove());
document.querySelectorAll(".fishka").forEach(function(e) {
            e.disabled = false;
            e.style.borderColor = 'black'
        })
        let hend=document.querySelector(".hend")
        const car = hend.querySelectorAll("img")
        car.forEach(img=>img.remove())
        scoreMy.style.display= "none"
        let diler=document.querySelector(".diler")
        const card = diler.querySelectorAll("img")
        card.forEach(img=>img.remove())
        scoreDiler.style.display= "none"
        document.querySelector(".insure").style.display = 'none'
        document.querySelector(".hit").style.display = "none"
        document.querySelector(".stand").style.display = "none"
    
    document.querySelector(".final").style.display  = "none"
    
    puntiMy = 0;
    scoreMy.textContent = "Your score:"+puntiMy;
 puntiDiler = 0;
 scoreDiler.textContent = "Diler score:"+puntiDiler;
  
 
if(localStorage.getItem('winner')==1){
    start = start+end*2
    cache.textContent = "Cache:" + start + "$";
}
else if(localStorage.getItem('winner')==0){
    start = start+end
    cache.textContent = "Cache:" + start + "$";
}
console.log(start,end)
if(bjD==true&&ins==true){
    start = start+end
    cache.textContent = "Cache:" + start + "$";
 }
 end = 0;
 bet.textContent = "Your_bet:" + end + "$";
 m = 0;
 d =0;
 tusD = false;
 tusM = false;
 first = true;
 bjM = false
 bjD = false
}