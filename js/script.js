 
 
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  let socialComments   = document.querySelector('.social__comments'); 
  socialComments.innerHTML = '';  
  
document.querySelector('.social__comment-count').classList.add('visually-hidden'); 

let changeImageForm = document.querySelector('.img-upload__overlay');

let uploadFile = document.querySelector('#upload-file') ;
function showPopup() {
    bigPicture.classList.remove('hidden');
}
function showFormChangeImage() {
    changeImageForm.classList.remove('hidden'); 
} 
uploadFile.addEventListener('change', function() {
    showFormChangeImage(); 
    document.addEventListener('keydown', function(evt) {
        if (evt.keyCode === 27) {
            changeImageForm.classList.add('hidden'); 
        }
    })
})

document.querySelector('#upload-cancel').addEventListener('click', function() {
    changeImageForm.classList.add('hidden'); 
})
 
function addEffectPhoto(effectName) {
     document.querySelector('.img-upload__preview img').style.filter = effectName;
}
document.querySelector('.effects__list').addEventListener('change', function(evt) { 
 
    switch (evt.target.value) {
        case 'none':
            addEffectPhoto('none'); 
        break; 
        case 'chrome': 
        addEffectPhoto('grayscale(1)'); 
        break;  
        case 'phobos':
        addEffectPhoto('blur(3)'); 
        break; 
        case 'heat': 
        addEffectPhoto('brightness(3)');  
        break;  
        case 'sepia' : 
         addEffectPhoto('sepia(1)'); 
        break;
        case 'marvin': 
         addEffectPhoto('invert(100%)'); 
        break;   
    }
})

let photoSmaller = document.querySelector('.scale__control--smaller'); 

let photoBigger = document.querySelector('.scale__control--bigger'); 
let inputValueImage = document.querySelector('.scale__control--value'); 
 
let valueImage = parseInt(inputValueImage.value); 
photoSmaller.addEventListener('click', function() { 
    photoBigger.disabled = false;  
    valueImage = parseInt(inputValueImage.value); 
   if (valueImage>=25) { 
    valueImage= valueImage -25; 
   }   
   inputValueImage.value =    valueImage +'%'; 
   document.querySelector('.img-upload__preview img').style.transform = `scale(0.${valueImage})`; 
   switch (valueImage) {
    case 100: 
    document.querySelector('.img-upload__preview img').style.transform = 'scale(1)'; 
    break;  
    case 25:  
    photoSmaller.disabled = true;  
    break; 
   } 
});

photoBigger.addEventListener('click', function() { 
    photoSmaller.disabled = false; 
     valueImage = parseInt(inputValueImage.value); 
    if (valueImage<100) { 
     valueImage= valueImage +25; 
    }  
    inputValueImage.value =    valueImage +'%'; 
    document.querySelector('.img-upload__preview img').style.transform = `scale(0.${valueImage})`; 
    switch (valueImage) {
        case 100: 
        document.querySelector('.img-upload__preview img').style.transform = 'scale(1)'; 
        photoBigger.disabled = true ; 
        break;  
       } 
 }); 
 

let submitButton = document.querySelector('#upload-submit');
let inputHashTag = document.querySelector('.text__hashtags');
submitButton.disabled = true;  
inputHashTag.oninput = function() {
    if (inputHashTag.validity.tooShort == false) {
        submitButton.disabled = false;  
    } 
    else {
        submitButton.disabled = true;  
    }
    if (inputHashTag.value.length==0) {
        submitButton.disabled = true;  
    }
} 


submitButton.addEventListener('click', function(evt) {  
    let HashTagArray = inputHashTag.value.split('#'); 
})  
document.querySelector(".img-upload__input").addEventListener("change", function () {
  if (this.files[0]) {
    var fr = new FileReader(); 
    fr.addEventListener("load", function () { 
        document.querySelector(".img-upload__preview img").src = fr.result; 
        let previewimages =    document.querySelectorAll('.effects__preview');
        previewimages.forEach(elementPreview => {
            elementPreview.style.background = 'url(' + fr.result + ')'; 
            elementPreview.style.backgroundSize = 'cover'; 
        }) 
    }, false); 
    fr.readAsDataURL(this.files[0]);
  }
});


 