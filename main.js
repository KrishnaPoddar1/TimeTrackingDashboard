// Connect the Json file to the javascript 
async function populate() {
    const response = await fetch('/data.json');
    const data = await response.json();
    
    //console.log(data);
    populateCard(data);
    nextFunc(data);
  }
  
// Default value on the page for each field or card  
function populateCard(obj) {
    const container = document.getElementsByClassName("container");
    
    obj.forEach(element => {
        const card = document.createElement('section');
        card.classList.add('card');
        
        card.id=element.title;
        card.innerHTML=`
        <section class="img-wrapper">
        </section>
        <section class="text-wrapper">
        <section class="heading">
        <h1 class="title">${element.title}</h1>
        <span>...</span>
        </section>
        <section class="time">
        <h2>${element.timeframes.daily.current}hrs</h2>
        <p><span id="day-text">Yesterday - </span>${element.timeframes.daily.previous}hrs</p>
        </section>
        </section>
        `;
        //console.log(card);

        container[0].appendChild(card);
    });

    //console.log(obj[0].timeframes.daily.current);

}

function nextFunc(data) {
    
//const data=populate();
const day = document.getElementsByClassName("day");

day[0].addEventListener('click',function (e) {
    const dayId = e.target.id;
    const clickedId =dayId.charAt(0).toLowerCase() + dayId.slice(1);
    //const daytime = document.getElementsByClassName('time');
    const daily1 = document.getElementById("Daily");
    const weekly1 = document.getElementById("Weekly");
    const monthly1 = document.getElementById("Monthly");
    data.forEach(function (element){
        const card = document.getElementById(element.title);
        //console.log(card);
        const daytime = card.getElementsByClassName('time');
        //const val = `timeframes.${clickedId}.current`;
        //const value = element[val];
        if(clickedId == "daily"){
            daytime[0].firstElementChild.textContent = element.timeframes.daily.current+"hrs"; 
            daytime[0].lastElementChild.firstElementChild.textContent = "Yesterday - ";
            daytime[0].querySelector('p span ').nextSibling.nodeValue = element.timeframes.daily.previous+"hrs";
            daily1.classList.add('active');
            weekly1.classList.remove('active');
            monthly1.classList.remove('active');
        }else if(clickedId == "weekly"){
            daytime[0].firstElementChild.textContent = element.timeframes.weekly.current+"hrs";
            daytime[0].lastElementChild.firstElementChild.textContent = "Last Week - ";
            daytime[0].querySelector('p span ').nextSibling.nodeValue = element.timeframes.weekly.previous+"hrs";
            daily1.classList.remove('active');
            weekly1.classList.add('active');
            monthly1.classList.remove('active');
        }else if(clickedId == "monthly"){
            daytime[0].firstElementChild.textContent = element.timeframes.monthly.current+"hrs";
            daytime[0].lastElementChild.firstElementChild.textContent = "Last Month - ";
            daytime[0].querySelector('p span ').nextSibling.nodeValue = element.timeframes.monthly.previous+"hrs";
            daily1.classList.remove('active');
            weekly1.classList.remove('active');
            monthly1.classList.add('active');
        }
        //daytime[0].firstElementChild.textContent = `${value}hrs`;
   });
    //console.log(daytime[0].firstElementChild.textContent);//H2 element 
    //console.log(document.getElementById('day-text').textContent);//Span Element with the id="day-text"
    //or
    //console.log(daytime[0].lastElementChild.firstElementChild.textContent);//Span Element with the id="day-text"
    //console.log(daytime[0].querySelector('p span ').nextSibling);//Value after the span
    
});


}

populate();
