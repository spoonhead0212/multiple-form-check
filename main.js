'strict mode'
const NextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.back');
const sections = document.querySelectorAll('.details')
const currentSteps = document.querySelectorAll('.current-step');
const monthlyPlan = document.querySelector('.arc-month')
const monthlyPrice = document.querySelector('.arc-price')
const finishBox = document.querySelector('.arc-2')
const roundUp = document.querySelector('.round')
const btnContainer = document.querySelector('.btn-container')
const choosen = document.querySelector('.choosen')

const checks = document.querySelectorAll('.check-addon')
let spaceNumber = 0;
let nameCheck
let mailCheck
let numberCheck
let pickedPlan;
let selectedAddon;
let planName;
let moreAddons;
let hasRun = false;
let total = []

NextBtn.addEventListener('click', ()=> {
    const userName = document.querySelector('.user-name').value
    const userNameTrim = userName.trim()
    const userNameCase = userNameTrim.toLowerCase();
    const UserNameFirstCase = userName.length > 0 ? userNameCase[0].toUpperCase() + userNameCase.slice(1) : '';
    const nameError = document.querySelector('.name-error')
     // --------------
    const userMail = document.querySelector('.user-email').value.trim()
    const mailError = document.querySelector('.mail-error') 
    //     ---------------
    const userTelly = document.querySelector('.user-tel').value.trim()
    const corretUserTelly = userTelly
    const numberError = document.querySelector('.number-error')

    if (UserNameFirstCase == '') {
        errorIn(nameError)
    } else {
        errorsOut(nameError)
        nameCheck = true
    }

    if (!userMail.endsWith('@gmail.com')) {
        errorIn(mailError)
    } else if (userMail == '') {
        errorIn(mailCheck)
    } else {
        errorsOut(mailError)
        mailCheck = true
    }

    if (userTelly == '') {
        errorIn(numberError)
    } else if (/[^\d]/.test(userTelly)){
        errorIn(numberError)
    } else {
        errorsOut(numberError)
        numberCheck = true
    }
    // ------profile
    
    const plans = document.querySelectorAll('.opt-child');
    plans.forEach((plan, i) => {
        plan.addEventListener('click', (event) => {
            plans.forEach((otherPlan) => {
                otherPlan.classList.remove('active-plan');
            });
            plan.classList.add('active-plan');
            selectedPlan = Number(event.currentTarget.dataset.key);
            planName = event.currentTarget.dataset.name;
            pickedPlan = true
        });
        // total = []
        if (plan.classList.contains('active-plan')) {
            monthlyPlan.textContent = `${planName}(Monthly)`
            monthlyPrice.textContent = `${selectedPlan}/mo`
            if(!hasRun) {
                total.push(selectedPlan)
                hasRun = true
            }
        }
    });
    // ------------plans

    const toggle = document.querySelector('.togg-check');
    const durations = document.querySelectorAll('.duration');
    toggle.addEventListener('change', ()=> {
        durations.forEach(duration => {
            duration.classList.remove('duration-active')
        })
        if (toggle.checked) {
            durations[1].classList.add('duration-active')
        } else {
            durations[0].classList.add('duration-active')
        }
    })
// // ---------------toggle check
    
    function handleNextBtn() {
        switch (spaceNumber) {
            case 0:
            if (nameCheck && mailCheck && numberCheck) {
                spaceNumber++
                updateActiveSection()
                updateActiveStep();
            }
            break;
            case 1:
            if (spaceNumber === 1 && pickedPlan) {
                spaceNumber++
                updateActiveSection()
                updateActiveStep();
            }
            break;
            case 2:
            if (spaceNumber === 2 && selectedAddon) {
                spaceNumber++
                updateActiveSection()
                updateActiveStep();
            }   
            break;
            case 3:
            if (spaceNumber === 3) {
                spaceNumber++
                updateActiveSection()
            }
            default:
            break;
        }
    }
    handleNextBtn()
})

prevBtn.addEventListener('click', ()=> {
    if (spaceNumber > 0) {
        currentSteps[spaceNumber].classList.remove('active-step')
        spaceNumber--
    }
    updateActiveSection()
})

function updateActiveStep() {
    currentSteps[spaceNumber].classList.add('active-step');
}

function updateActiveSection() {
    sections.forEach((section, index) => {
        if (index == spaceNumber) {
            section.classList.add('active')
        } else {
            section.classList.remove('active')
        }
    })
    if (spaceNumber === 3) {
        NextBtn.textContent = 'Confirm'
    } else if (spaceNumber === 4) {
        NextBtn.style.display = 'none'
        prevBtn.style.display = 'none'
    } else {
        NextBtn.textContent = 'Next step'
        NextBtn.style.display = 'block'
        prevBtn.style.display = 'block'
    }
}

function errorIn(subject) {
    subject.classList.add('show-error')
    const parentElement = subject.parentElement;
    const inputElement = parentElement.nextElementSibling;
    inputElement.style.outline = 'hsl(354, 84%, 57%) 1px solid'
    inputElement.style.border = 'none'
}
function errorsOut(subject) {
    subject.classList.remove('show-error')
    const parentElement = subject.parentElement;
    const inputElement = parentElement.nextElementSibling;
    inputElement.style.outline = ''
    inputElement.style.border = ''
}


const createElm = function(parentDiv, dataNaming, dataPrice) {
    const divvy = document.createElement('div')
    const p1 = document.createElement('p')
    const p2 = document.createElement('p')
    parentDiv.appendChild(divvy)
    divvy.appendChild(p1).textContent = dataNaming
    divvy.appendChild(p2).textContent = `+$${dataPrice}/mo`
    divvy.classList.add('arc-online')
}

const addOns = document.querySelectorAll('.addon');
addOns.forEach((addon, i) => {
    addon.addEventListener('click', (ev) => {
        ev.stopPropagation();

        checks[i].checked = !checks[i].checked;

        addon.classList.toggle('active-plan');

        if (addon.classList.contains('active-plan')) {
            const dataPrice = Number(ev.currentTarget.dataset.price);
            total.push(dataPrice);

            const dataNaming = ev.currentTarget.dataset.name;
            createElm(choosen, dataNaming, dataPrice);
            
            calcTotal(total);
            selectedAddon = true;
        } else {
            const dataPrice = Number(ev.currentTarget.dataset.price);
            const index = total.indexOf(dataPrice);
            if (index !== -1) {
                total.splice(index, 1);
            }
            calcTotal(total);
            const children = choosen.querySelectorAll('.arc-online')
            removeElm(children[i])
        }
    });
});

const removeElm = function(div) {
    div.remove()
}

const calcTotal = function(x) {
    const calculatedTotal = x.reduce((a, b) => a + b, 0)
    roundUp.textContent = `$${calculatedTotal}/Mo`
}




