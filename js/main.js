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
                                divEl.className = "panel";
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
                        }
                    })
                   
                })
            }
        })
}

FecthRepo();

function filterSelection(){}
