/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

const listOfSections=document.querySelectorAll('main section');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function isInView(element){
    const borders=element.getBoundingClientRect();
    /* An elemrnt will be in view when:
        1- his bottom border is under window top border
        2- his top border is above window bottom border
        3- his height is greater than the half of window height
    */
    return borders.bottom>=0 && borders.top<=window.innerHeight && 
            Math.min(window.innerHeight,borders.bottom)-Math.max(0,borders.top)>window.innerHeight/2;
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNav(){
    const frag=document.createDocumentFragment();
    listOfSections.forEach(section=>{
    const newLi=document.createElement('li');
    // Insert anchor element inside the new li element with id (section.id + '-nav'). Ex: section1-nav
    newLi.innerHTML=`<a id="${section.getAttribute('id')}-nav" class="menu__link">${section.getAttribute('data-nav')}</a>`;
    frag.appendChild(newLi);
    });
    document.querySelector('#navbar__list').appendChild(frag);
}

// Add class 'active' to section when near top of viewport
function activeSection(){
    listOfSections.forEach(section=>{
        // Get the corresponding nav item for each section
        const navItem=document.querySelector(`#${section.getAttribute('id')}-nav`);
        if(isInView(section)){
            section.classList.add('your-active-class');
            navItem.classList.add('active-section-item');
        }
        else{
            section.classList.remove('your-active-class');
            navItem.classList.remove('active-section-item');
        }

    });
}

// Scroll to anchor ID using scrollTO event
function scrollToView(element){
    // If the clicked element is anchor
    if(element.target.nodeName=="A")
    {
        const navItem=element.target;
        // Get the corresponding section for the clicked nav item
        const sectionId=navItem.getAttribute('id').split('-')[0];
        document.getElementById(sectionId).scrollIntoView({behavior: "smooth"});
    }
}

// Make To-Top button visible at the bottom of the page
function toTopButton(){
    btn=document.getElementById('to-top');
    // If the current window close to the bottom of the page
    if(pageYOffset>=0.825*document.body.getBoundingClientRect().height)
        btn.style.visibility='visible';
    else
        btn.style.visibility='hidden';
}

// Make To-Top button scroll
function toTopOnClick(){
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
}

// Hide fixed navigation bar while not scrolling
function hideNav(){
    const y=window.scrollY;
    const navBar=document.querySelector('.page__header');
    // Wait a second to check if the scrolling postion still the same
    setTimeout(()=>{
        if(y===window.scrollY && y!==0)
            // Make the top of is nav bar is '- his height'. Ex: -60px
            navBar.style.top=`-${navBar.getBoundingClientRect().height}px`;
    },1000);
    navBar.style.top='0';
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNav();

// Scroll to section on link click
const navBar=document.querySelector('#navbar__list');
navBar.addEventListener('click',scrollToView);

// Set sections as active
window.addEventListener('scroll',activeSection);

// To-Top button visibility
window.addEventListener('scroll',toTopButton);

// To-Top button scroll
const button=document.getElementById('to-top');
button.onclick=toTopOnClick;

// Hide fixed navigation bar while not scrolling
window.addEventListener('scroll',hideNav);