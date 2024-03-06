import {addFirstPage, 
        changePages,createArrows,
        createInputs,
        removeInput,
        adjustProfilePic,
} from "./scripte.js"

(function(){
    
    const beDiv = document.querySelector('.beDiv')
    const eduDiv = document.querySelector('.eduMainDiv')
    
    const btnRight = document.querySelector('.btnRight')
    const btnLeft = document.querySelector('.btnLeft');
    
    
    const uploadInput = document.querySelector('#file')
    
    
    const submitBtnForm = document.querySelector('#submit')
    const returnBtnForm = document.querySelector('#return')
    const addBtnForm = document.querySelectorAll('.addBtn')
    const removeBtnsForm =document.querySelectorAll('.removeBtn')
    const rangeSliderForm = document.querySelector('.bar')
    
    
    // buttons im formular um Stellen hinzu zufügen oder zu entfernen
    // button name wird verwendet um die richtigen nodes zu klonen;

    addBtnForm.forEach(btn => {
        
        btn.addEventListener('click', (e) => {
            e.preventDefault()
            const btnName = e.target.id.slice(0,-3)
            createInputs(btnName)
        })
    })
    
    removeBtnsForm.forEach(btn => {
        btn.addEventListener('click', (e) =>{
            e.preventDefault()
            const btnName = e.target.id.slice(0,-5)
            removeInput(btnName)
            
        } )
        
    })

    returnBtnForm.addEventListener('click', (e) => {
        e.preventDefault()
        e.target.parentNode.parentNode.classList.toggle('hide')
        document.querySelector('dialog').showModal()
        
    })
    

    let url;
    let upload = false
    // Profilfoto-upload 
    uploadInput.addEventListener('change', (e) => {
  

        upload = true

        // foto wird im localStorage gespeichert

        const reader = new FileReader()
        
        reader.readAsDataURL(uploadInput.files[0])
        
        reader.addEventListener('load', () => {
            url = reader.result
            document.querySelector('#profilePic').src = url
        })
    })
    
    
    submitBtnForm.addEventListener('click', (e) => {
        
        e.preventDefault()



        const staticInputs = document.querySelectorAll('.skillDiv input,.langDiv select, .langDiv input, .static input')
        const staticElem = document.querySelectorAll('.personalData .nameMainDiv p, .personalData .contact a, .personalData .contact p')
        const staticValues= [];
        
        const beSchoolInputs = document.querySelectorAll('.schoolDiv input,.workDiv input')
        const beSchoolInputsvalues = []
        const cloneDiv = document.querySelector('.stageDiv').cloneNode(true)
        
        const languages = document.querySelector('.langDivStatic')
        const skills = document.querySelector('.skillsDiv')
        
        // falls ein upload stattgefunden hat wird ein popUp erstellt
        // um das foto zu adjustieren und dem lebenslauf hinzugefügt

        if(upload){
            adjustProfilePic(url)



        }
        
        // lebenslauf leeren

        skills.textContent ='';
        languages.textContent = ''
        eduDiv.textContent =''
        beDiv.textContent = ''
        


        // die Werte des Formulars werden als objekt im array gesammelt, 
        // aufgeteilt nach statischen elementen (name,etc) und dynamischen(arbeitsstellen)
        // und ja skills und sprachen wären auch dynamisch fuck;

        beSchoolInputs.forEach(item => {
            beSchoolInputsvalues.push({'name':item.name,'value':item.value,'class':item.className})
        })
        
        staticInputs.forEach((item) => {
            staticValues.push({'name':item.name,'value':item.value,'class':item.className})  
        })
        
        
        
        // je nach klassenname werden elemente erstellt, bzw geklont, die werte des formulars
        // eingefügt und auf der seite dargestellt

        for(let i  = 0; i < staticValues.length;i++){
            
            const className = staticValues[i].class
            
            
            if(className === ''){
                
                staticElem[i].textContent = staticValues[i].value;  
                
            }else if(className === 'language' && staticValues[i].value !== ''){
                
                const para = document.createElement('p');
                para.textContent = `${staticValues[i].value} - ${staticValues[i+1].value}`
                
                languages.append(para)
                
            }else if(className === 'skillsInput' && staticValues[i].value !== ''){
                
                const div   = document.createElement('div')
                const para  = document.createElement('p')
                para.textContent = staticValues[i].value
            
                const clone = rangeSliderForm.cloneNode(true)
                

                clone.childNodes[0].style.width= `${staticValues[i+1].value}%`
                div.append(para,clone)
                skills.append(div)
                
            }
        }
        

        // elmente werden geklont und mit formlar werten gefüllt, einem seitenDiv 
        // hinzugefügt. das SeitenDiv wird dem enstrechenden array hinzugefügt
        // index um festzustellen wann es die letzte seite der arbeitstellen bzw.
        // die letzte seite ansich ist

        const index  = beSchoolInputsvalues.findIndex(obj => obj.class === 'school')

        let page = document.createElement('div')
        const bePages = [];
        const eduPages = [];

        for(let i = 0; i < beSchoolInputsvalues.length; i += 4){
            
            
            const input = beSchoolInputsvalues
            const pageArray = input[i].class === 'school' ? eduPages : bePages
            const clone = cloneDiv.cloneNode(true)
            let date = ''
            


            //datum formatierung 

            if(input[i+2.].value !== '' && input[i+3].value !== ''){
                date = input[i+2].value.slice(-5,-3) + '/' + input[i+2].value.slice(0,4) 
                + ' - ' + input[i+3].value.slice(-5,-3) + '/' + input[i+3].value.slice(0,4)
            }else if(input[i+2.].value !== '' && input[i+3].value === ''){
                date = input[i+2].value.slice(-5,-3) + '/' + input[i+2].value.slice(0,4) 
                + ' - ' + 'Heute'
            }

            clone.childNodes[5].textContent = date;
            clone.childNodes[7].textContent = input[i+1].value
            clone.childNodes[9].textContent = input[i].value
            
            page.append(clone)
            
            // wenn seite 4 einträge hat wird eine neue seite erstellt und dem enstprechenden array hinzugefügt
            

            if(page.children.length === 4){
                
                page.classList.add('page')
                page.lastChild.childNodes[3].remove()
                page.style.display ='flex'
                pageArray.push(page)
                page = document.createElement('div')
                
            }else if(i + 4 === index || i + 4 === input.length){

                page.classList.add('page')
                page.lastChild.childNodes[3].remove()
                pageArray.push(page)
                page = document.createElement('div')
            }
            
        }



        const arrowBtns = [];
        //buttons um zwischen den eiznelen seiten zu wechseln werden geklont und einem arrayhinzugefügt
        createArrows(bePages,eduPages,btnRight,btnLeft,arrowBtns,beDiv,eduDiv)
        // function um die seiten zu wechseln
        changePages(arrowBtns,eduPages,bePages)
        // die erste seite wird hinzugefügt und mit der animation versehen
        addFirstPage(bePages,eduPages,beDiv,eduDiv)
        
        //forumlar wird ausgeblendet und lebenlauf ein
        document.querySelector('.createCv').classList.toggle('hide')
        document.querySelector('main').classList.toggle('hide')
        
        
    })
    
    
    
})()













