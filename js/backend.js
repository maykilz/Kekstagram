

let bigPicture = document.querySelector('.big-picture');
window.backend = {
    load: function(onLoad, onError) {
        try {
            let xhr = new XMLHttpRequest();  
            xhr.addEventListener('load', function() {
                xhr == 200?  onLoad(xhr.response): onError()
                
            });
        
            xhr.addEventListener('error', onError()); 
            xhr.open('GET', 'https://24.javascript.pages.academy/kekstagram/data');
            xhr.responseType = 'json'; 
            xhr.send(); 
        } catch (error) {
          //  console.log(error.message); 
        }
    }, 
    save: function(data, onLoad, onError) {}, 
} 
let ContentPhoto ;
let descriptionsList = []; 
let responseServerArray; 
let responseServerCopy; 
let pictures = document.querySelector('.pictures'); 
let pictureList ; 
 
 const loadPhotokeks  = (XHRResponse) => { 
        addTemplateImages(XHRResponse);  
        responseServerArray  = Array.from(XHRResponse);  
        responseServerCopy = responseServerArray.slice();
        const photofilters = document.querySelector('.img-filters');  
        const clickledImage = document.querySelectorAll('.pictures a');
        const  removeClassButton = function() { 
            let buttonsfiltersList = document.querySelectorAll('.img-filters__button'); 
            buttonsfiltersList.forEach(elementButton=> {
                elementButton.classList.remove('img-filters__button--active');
            });
        }
        if (descriptionsList.length>0) {
            photofilters.classList.remove('img-filters--inactive'); 
            let photofiltersbutton = document.querySelector('.img-filters__form'); 
            photofiltersbutton.addEventListener('click', function(evt) { 
                
                removeClassButton();
                switch (evt.target.id)  {
                    case 'filter-default':   
                   evt.target.classList.toggle('img-filters__button--active');  
                    pictureList = document.querySelectorAll('.picture');
                    pictureList.forEach(element => {
                       element.remove();  
                    });
                    addTemplateImages(responseServerArray); 
                    clickledImage = document.querySelectorAll('.pictures a'); 
              
                    break; 
                    case 'filter-discussed':  
                    evt.target.classList.toggle('img-filters__button--active');  
                    pictureList = document.querySelectorAll('.picture');
                    pictureList.forEach(element => {
                       element.remove();  
                    });
                     let arrayFiltered  = responseServerCopy.sort (function(aIntger,bInteger) {
                      return  bInteger['comments'].length - aIntger['comments'].length ; 
                    }); 
                    addTemplateImages(arrayFiltered);            
                    clickledImage = document.querySelectorAll('.pictures a'); 
             
                    break;     
                    case 'filter-random':    
                    evt.target.classList.toggle('img-filters__button--active');  
                        pictureList = document.querySelectorAll('.picture');
                        pictureList.forEach(element => {
                           element.remove();  
                        });
                       let arrayRandom = responseServerCopy.sort(function(){  return Math.random() - 0.5}); 
                       addTemplateImages(arrayRandom); 
                       clickledImage = document.querySelectorAll('.pictures a'); 
                    
                     break;    

                     
                }
                addBoxBigImage(clickledImage); 
            });
        }
        addBoxBigImage(clickledImage);   
 } 
 const  addBoxBigImage = (clickledImagesArray)  =>{ 
        for (let i=0; i< clickledImagesArray.length; i++) {
            clickledImagesArray[i].addEventListener('click', function(evt)  { 
                document.querySelector('.big-picture__img img').src = evt.target.currentSrc;
                bigPicture.classList.remove('hidden');    
                document.querySelector('.social__caption').textContent = descriptionsList[i].description  ;  
                document.querySelector('.likes-count').textContent = clickledImagesArray[i].querySelector('.picture__likes').textContent;  ; 
                document.querySelector('.social__comments').innerHTML=''; 
                for (let commentCount =0; commentCount<descriptionsList[i].commentsList.length; commentCount++) {  
                    document.querySelector('.social__comments').innerHTML += `
                                            <li class="social__comment social__comment--text">
                        <img class="social__picture" src="${descriptionsList[i].commentsList[commentCount].avatar}"
                        alt="Аватар комментатора фотографии"34
                        width="35" height="35">
                        <p class="social__text">${descriptionsList[i].commentsList[commentCount].message}</p>
                        </li>`  ;  
                }
                let commentsViewlist = document.querySelectorAll('.social__comment'); 
                if (commentsViewlist.length>5){
                    for (let indexComment=5; indexComment<commentsViewlist.length; indexComment++) { 
                        commentsViewlist[indexComment].classList.add('hidden'); 
                    }
                }
                document.addEventListener('keydown', function(evt) {
                    if (evt.keyCode === 27) {
                        bigPicture.classList.add('hidden'); 
                    }
                });
                
            });
            
        }
 }
 function addTemplateImages(arrayImages) {
    for  (let indexes=0; indexes<arrayImages.length; indexes++) {   
        const templateContent = document.querySelector('#picture').content.cloneNode(true);   
        templateContent.querySelector('.picture__img').src = arrayImages[indexes]['url']; 
        templateContent.querySelector('.picture__likes').textContent =  arrayImages[indexes]['likes']; 
        templateContent.querySelector('.picture__comments').textContent =  arrayImages[indexes]['comments'].length; 
        const contentBigPhoto = {
            description: arrayImages[indexes].description, 
            commentsList:   arrayImages[indexes].comments, 
        }
        descriptionsList.push(contentBigPhoto ); 
        pictures.appendChild(templateContent);    
    }   
 }
 
 window.backend.load(loadPhotokeks, SavePhotokeks); 
 
 
  document.querySelector('.big-picture__cancel').addEventListener('click', function() {
    bigPicture.classList.add('hidden');   
  })
 
