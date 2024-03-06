
import {animationStart} from './scripte.js';

(function(){
    

    const dialog = document.querySelector('dialog');
    const main =  document.querySelector('main')
    const dialogBtn = document.querySelector('.dialogBtn')
    const toggleItems = document.querySelectorAll('.toggle')
    const body = document.querySelector('body');
    const userCv = document.querySelector('.createCv')
    const partOne = document.querySelector('.partOne');
    const userCvCheck = document.querySelector('#userCvCheck')
    
    // Verstecke haupseite und Lebenslauf beim Start
    main.classList.toggle('hide')
    userCv.classList.toggle('hide')
    // Eventlistener für den Dialog-Button
    
    dialogBtn.addEventListener('click', () => {
        
        
        //Elemente für die Animation
        const typeItems = document.querySelectorAll('.partOne .jobsDiv p, .eduDiv p')
        const borders = document.querySelectorAll('.partOne .borderLeft, .eduDiv .borderLeft')
        const dots = document.querySelectorAll('.partOne .borderDot, .eduDiv .borderDot')
        
        // abfragen ob eigener Lebenslauf erstellt werden soll
        // wenn ja wird formular eingeblendet, ansonsten mein leebnslauf
        if(userCvCheck.checked){
            userCv.classList.toggle('hide')
            dialog.close()
        }else{
            dialog.close()
            animationStart(typeItems,borders,dots)
            main.classList.toggle('hide');
            document.querySelector('#profilePic').src = './img/Daniel2.jpg'    
        }
    })
    
    // ändert anrede im dialog, wenn ein eigener lebenslauf  erstellt
    userCvCheck.addEventListener('click', () =>{
        
        let str = document.querySelector('dialog span:first-of-type')
        userCvCheck.checked ? str.textContent = 'dein' : str.textContent = 'mein'
    })

    //buttons akitvieren das pop up fenster für die zeugnisse
    // slideshow wird errstellt

    const certbtns   = document.querySelectorAll('.cert')
    
    certbtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            // Array mit den Pfaden zu den Bildern
            const ImgArray = ['./img/Zeugnis Abendschule1-1.png','./img/Zeugnis Abendschule2-1.png','./img/Zeugnis Abendschule3-1.png','./img/Zeugnis Abendschule4-1.png','./img/Zeugnis Hauptschule-1.png']
            
            // Erstelle ein Popup für die Zeugnisse
            const slideShow = document.createElement('div')
            const image = document.createElement('img');
            image.src = ImgArray[0]
            const closeBtn = document.createElement('button')
            closeBtn.textContent= 'X'
            closeBtn.classList.add('slideShowCloseBtn');
            
            // schließt popup
            closeBtn.addEventListener('click', () => {
                slideShow.remove();
                main.classList.remove('blur')
            })
            
            // slider um zwischen den zeugnissen zu switchen
            const slider = document.createElement('input')
            slider.type = 'range';
            slider.min = 0;
            slider.max = 3;
            slider.value = 0;
            slider.addEventListener('input', () => {
                image.src= ImgArray[slider.value]
            })
            
            // Füge die Elemente zum Popup hinzu
            slideShow.append(closeBtn,image,slider)
            slideShow.classList.add('slideShow')
            slideShow.append(slider)
            body.appendChild(slideShow)
            main.classList.add('blur')
        })
    })
    
    // button um zwischen den seiten zu blätten
    const Arrowbtns = document.querySelectorAll('.btn')
    Arrowbtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Umschalten der versteckten Elemente
            toggleItems.forEach(item => {
                item.classList.toggle('hide')
            })
            
            // elmenten wird eine animation hinzugefügt bzw entfernt je nachdem 
            // ob sie sichtbar sind
            let typeItems;
            let borders;
            let dots;
            if(partOne.classList.contains('hide')){
                typeItems = document.querySelectorAll('.partTwo .jobsDiv p')
                borders = document.querySelectorAll('.partTwo .borderLeft')
                dots = document.querySelectorAll('.partTwo .borderDot')
            }else{
                typeItems = document.querySelectorAll('.partOne .jobsDiv p')
                borders = document.querySelectorAll('.partOne .borderLeft')
                dots = document.querySelectorAll('.partOne .borderDot')
            }
            
            // Ausführen der Animation
            animationStart(typeItems,borders,dots)
        })
    })

    // Zeige den Dialog an
    return dialog.showModal()

})();
