const PATH = 'assets/img/portfolio';
const OWNER = 'WitzRed';
const REPO = 'witzred.github.io';

portfolio = document.querySelector('.wrapper');

function getRepoSchema(OWNER, REPO, PATH){
    return fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}`);
}


/* This is test for adding elments to the grid*/

// subdir.forEach(element => {
//     let divEl = document.createElement('div');
//     divEl.id = element;
//     portfolio.appendChild(divEl);
// });

// This is the expected array subdir = ['3dm', 'ml', 'rb', 'td'];
async function FecthRepo(){

    getRepoSchema(OWNER, REPO, PATH)
        .then(response => response.json())
        .then(data => {

            if(data){
                console.log(data);
                var subfolderProcessed = 0;
                data.forEach((subdir,index, array) =>{
                    
                    getRepoSchema(OWNER, REPO, subdir.path)
                    .then(response => response.json())
                    .then(files =>{

                        subfolderProcessed ++;

                        if(files){

                            files.forEach(file =>{
                                let divEl = document.createElement('div');
                                divEl.id = file.name.split('.')[0];
                                divEl.className = "panel" + " " + subdir.name;
                                divEl.style.backgroundImage = "url("+file.download_url+")";
                                divEl.style.backgroundSize= "cover";
                                divEl.style.backgroundRepeat= "no-repeat";
                                portfolio.appendChild(divEl);
                            })
                        }

                        if(subfolderProcessed == array.length){
                            let footEl = document.createElement('footer');
                            footEl.className = "footer";
                            portfolio.appendChild(footEl);
                            //add filter Selection function;
                            filterSelection('all'); 
                        }
                    })
                   
                })
            }
        })
}

FecthRepo();
// filterSelection('all');
function filterSelection(c){

    let element, i;
    element = document.getElementsByClassName("panel");

    if(c == "all"){
        c = "";
    }

    //Add "show" class (display:block) to filtered elements, and remove "show" class from elements that are not selsected
   
    for(i = 0; i < element.length; i++){
        removeClass(element[i], "show");
        if (element[i].className.indexOf(c) > -1){
            addClass(element[i], "show");
        }
    }
}

//Show filtered Elements
function addClass(element, name){
    let i, currentClasses, classesToInsert;
    currentClasses = element.className.split(" ");
    classesToInsert = name.split(" ");
    for(i = 0; i< classesToInsert.length; i++){
        if(currentClasses.indexOf(classesToInsert[i]) == -1){
            element.className += " " + classesToInsert[i];
        }
    }

}

//Hide lements that are not selected
function removeClass(element, name){
    let i, currentClasses, classesToRemove;
    currentClasses = element.className.split(" ");
    classesToRemove = name.split(" ");
    for(i=0; i < classesToRemove.length; i++){
        while (currentClasses.indexOf(classesToRemove[i]) > -1){
            currentClasses.splice(currentClasses.indexOf(classesToRemove[i]), 1);
        }
    }
    element.className = currentClasses.join(" ");
}

//Add active class to the current control button (highlight it)
let btnContaniner = document.getElementById("portfolioFilter");
let btns = btnContaniner.getElementsByClassName("btn");
for(let i = 0; i < btns.length; i++){
    btns[i].addEventListener("click", function(){
        let currentBtn = document.getElementsByClassName("active");
        currentBtn[0].className = currentBtn[0].className.replace("active", "");
        this.className += " active";
    });
}
