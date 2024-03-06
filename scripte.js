

// die klassen für die keyframes werden hinzugefügt bzw entfernt
// um die animation neu und zeit versetzt zu starten

export function animationStart(typeItems,borders,dots){
    
    borders.forEach((item,index) => {

            item.classList.remove('borderAnimation')
            setTimeout(() => {
        
                item.classList.add('borderAnimation')
        
            },460*index)
        
    })

    typeItems.forEach((item,index) => {

                item.classList.toggle('visibility')
                item.classList.remove('typing')
                setTimeout(() => {
                    item.classList.add('typing')
                    item.classList.toggle('visibility')
        
                },150*index)
        })

    dots.forEach((item,index) => {

            item.classList.remove('dotAnimation')
            
            setTimeout(() => {
                item.classList.add('dotAnimation')
            },400*(index))
    })
}


// die die klassen für die keyframes werden hinzugefügt bzw entfernt
// um die animation neu zu starten, betrifft die erste seite bei einem
// selbst erstellen lebenslauf

export function addFirstPage  (bePages,eduPages,beDiv,eduDiv){
        
    const arr = [bePages[0],eduPages[0]]
    
    arr.forEach((item,index) => {
        
        const typeItems = item.querySelectorAll('p')
        const bordersLeft = item.querySelectorAll('.borderLeft')
        const borderDots = item.querySelectorAll('.borderDot')
        
        animationStart(typeItems,bordersLeft,borderDots)

        index === 0 ? beDiv.append(bePages[0]) : eduDiv.append(eduPages[0])
        
    })
    
    
    
    
    
}

// funktion um durch die seiten blättern zu können


export function changePages  (arrowBtns,eduPages,bePages) {
    
    // index für das Seitenarray

    let index = 0;
    
    arrowBtns.forEach((btn) => {
        
        btn.addEventListener('click', () =>{
            


            // je nachdem welcher button geklickt wird das korrekte seitenarray benutzt,
            // sowie das korrekte elterndiv

            const btnParent = btn.parentNode
            const array = btnParent.className === 'beDiv' ? bePages : eduPages
            
            // durch die seiten circeln
            if(btn.classList.contains('btnRight')){
                index = (index + 1) % array.length
            }else{
                index = (index - 1 + array.length) % array.length
            }

            // alte seite wird entfernt, neue wird mit animation hinzugefügt


            btnParent.lastChild.remove()
            const typeItems = array[index].querySelectorAll('p')
            const bordersLeft = array[index].querySelectorAll('.borderLeft')
            const borderDots = array[index].querySelectorAll('.borderDot')
            
            animationStart(typeItems,bordersLeft,borderDots)
            
            btnParent.append(array[index])
            
        })
    })
}

// funktion überprüft ob es mehr als 1 seite gibt und fügt  buttons
// dem buttonarray sowie der seite hinzu;

export function createArrows (bePages,eduPages,btnRight,btnLeft,arrowBtns,beDiv,eduDiv) {
    
    if(bePages.length > 1){
            
        const cloneLeftBe = btnLeft.cloneNode(true)
        const cloneRightBe = btnRight.cloneNode(true)
        
        cloneLeftBe.classList.remove('hide')
        
        arrowBtns.push(cloneRightBe,cloneLeftBe)
        beDiv.append(cloneRightBe,cloneLeftBe)
    }

    if(eduPages.length > 1){
        
        const cloneLeftEdu = btnLeft.cloneNode(true)
        const cloneRightEdu = btnRight.cloneNode(true)
        
        cloneLeftEdu.classList.remove('hide')
        
        eduDiv.append(cloneRightEdu,cloneLeftEdu)
        arrowBtns.push(cloneRightEdu,cloneLeftEdu)
    }
}


// funktion um eingabe felder im formular zu erstellen
// ein teil der button klasse wird verwendet um festzustellen welches element geklont werden soll
// die element anzahl des eltern div wird verwenden um den inputs und labels die  id bzw
// das namen attribute zu geben und den elterndiv hinzuzufügen
// der remove Button wird aufgedeckt um elmente zu entfernen

export function createInputs(btnName){
    
    const parentDiv = document.querySelector(`.${btnName}Cv`)
    const count = parentDiv.children.length
    const clone  = document.querySelector(`.${btnName}Div`).cloneNode(true)
    
    clone.childNodes.forEach(item => {
        if(item.nodeName !== '#text'){
            item.value = ''
            const labelValue = item.getAttribute('for')
            item.nodeName === 'LABEL' ? item.setAttribute('for',`${labelValue}${count}`)
                                      : item.id += count
        }
    })
    
    parentDiv.append(clone)

    document.querySelector(`#${btnName}ReBtn`).classList.remove('hide')


}

// entfernt elmente und Button  bei nur einem Element

export function removeInput (btnName){
    
    const parentDiv = document.querySelector(`.${btnName}Cv`)

    parentDiv.lastChild.remove()

    if(parentDiv.children.length === 1){
        document.querySelector(`#${btnName}ReBtn`).classList.add('hide')
    }

}




// adjustiert das profilfoto im popip sowie direkt im Lebenslauf

export function adjustProfilePic(url){



    // erstellt popUpDivs und fügt dem Image die url hinzu

    const popUp = document.createElement('div')
    popUp.classList.add('popUpPic')
    const imgDiv =  document.createElement('div')
    imgDiv.classList.add('imgDiv')

    const img = document.createElement('img')
    img.src = url

    const sliderDiv = document.createElement('div')
    
    // erstellt 3 slider für die achsen x y z
    const arr = ['x','y','z']

    for(let i = 0 ; i<3;i++){

        const slider = document.createElement('input')
        const label = document.createElement('label')

        label.setAttribute('for','slider'+i)
        label.textContent = `${arr[i]}-Achse`
        slider.type = 'range'
        slider.id   = 'slider' + i

        if(i === 2){
            slider.min = 1;
            slider.value = 9.5
        }else{
            slider.min = -20;
            slider.value = 0
        }

        slider.max = 20
        slider.steps = 0.1;
        slider.classList.add('picSlider')
        sliderDiv.append(label,slider)
    }
    
    // button wird erstellt und elmente werden auf der seite angezeigt
    const finishBtn = document.createElement('button')

    finishBtn.textContent = 'Fertig'
    finishBtn.id = 'finishBtn'
    
    sliderDiv.append(finishBtn)
    imgDiv.append(img)
    popUp.append(imgDiv,sliderDiv)
    
    const main = document.querySelector('main')
    const pData = document.querySelector('.personalData')
    const cvData = document.querySelector('.cvData')

    // hitnergrund wird geblurrt solang das popUp sichtbar ist
    cvData.classList.toggle('blur')	
    pData.classList.toggle('blur')	

    main.append(popUp)



    // fügt eventListener für die slider/button hinzu und übernimmt das Verhältnis
    // bild zu div um es richtig am lebenslauf darzsutellen; 

    const fotoSliders = document.querySelectorAll('.picSlider,#finishBtn')


    let top, left, width;
    
    // hardgecoded >.<  verhältnis  breite lebenslauf foto Div / popup foto div
    const ratio = (8/12)

    fotoSliders.forEach(slider => {
        
        if(slider.id === 'finishBtn'){
            slider.addEventListener('click', () => {
                document.querySelector('.cvData').classList.toggle('blur')
                document.querySelector('.personalData').classList.toggle('blur')

                
                // fügt die werte dem lebenslauf foto hinzu und entfernt das popup
                const img = document.querySelector('.imgDiv img')
                img.style.top = (top*ratio) + 'rem'
                img.style.width = (width*ratio) + 'rem'
                img.style.left = (left*ratio) +'rem'

                main.lastChild.remove()  
            })
        }else{
            slider.addEventListener('input', (e) => {

                const img = document.querySelector('.popUpPic .imgDiv img')
                const id = e.target.id
                const value = e.target.value
                
                switch (id){
                    
                    case 'slider0'   : img.style.left   = value + 'rem',
                                       left = value;
                                       break;
                    case 'slider1'   : img.style.top    = value + 'rem',
                                       top = value;
                                       break;
                    case 'slider2'   : img.style.width  = value + 'rem',
                                       width = value;
                }
            })
        }
    }) 
}

