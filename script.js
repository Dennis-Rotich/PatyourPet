//Capture HTML elements
document.addEventListener('DOMContentLoaded',()=>{
    const form = document.getElementById('searchInput');
    const country = document.getElementById('countryInput');
    const countryContainer = document.getElementById('countryContainer');
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        countryContainer.innerHTML = ``;
        countryName = country.value;
        fetchDetails(countryName);
        country.value = '';
    })
})

//Render country details onto web page
function renderCountryDetails(data){
    let flag = document.createElement('img');
    flag.id = 'flag';
    flag.src =  data.flags.png;
    flag.alt = data.flags.alt;
    countryContainer.appendChild(flag);
    let name = document.createElement('h3');
    name.textContent = data.name.official;
    name.className = 'countryDetails';
    countryContainer.appendChild(name);
    let list =document.createElement('ul');
    countryContainer.appendChild(list);
    let capital = document.createElement('li');
    capital.textContent = `The Capital of ${data.name.common}:${data.capital[0]}`;
    capital.className = 'countryDetails';
    list.appendChild(capital);
    let week = document.createElement('li');
    week.textContent = `${data.name.common} start their week on ${data.startOfWeek}`;
    week.className = 'countryDetails';
    list.appendChild(week);
    let continent = document.createElement('li');
    continent.textContent = `${data.name.common} is located in ${data.continents[0]}`;
    continent.className='countryDetails';
    list.appendChild(continent);
    let timeZone = document.createElement('li');
    timeZone.textContent = `${data.name.common} is in the timezone ${data.timezones[0]}`;
    timeZone.className="countryDetails";
    list.appendChild(timeZone);
    let population = document.createElement('li');
    population.textContent = `Population: ${data.population} people`;
    population.className ="countryDetails";
    list.appendChild(population);
    let commentSection = document.createElement('div');
    commentSection.className = 'commentSection';
    countryContainer.appendChild(commentSection);
    let commentHeader = document.createElement('h3');
    commentHeader.textContent = `Your views on ${data.name.common}`;
    commentSection.appendChild(commentHeader);
    let commentList = document.createElement('div');
    commentList.id = 'commentBay';
    commentSection.appendChild(commentList);
    let commentForm = document.createElement('form');
    commentSection.appendChild(commentForm);
    let commentBox = document.createElement('input');
    commentBox.type = 'text';
    commentBox.id = 'commentContent';
    commentBox.placeholder = 'Comment on country';
    commentForm.appendChild(commentBox);
    let submitComment = document.createElement('input');
    submitComment.type = 'submit';
    commentForm.appendChild(submitComment);
    commentForm.onsubmit = (e)=>{
        e.preventDefault();
        let comment = document.getElementById('commentContent');
        renderComment(comment.value);
        comment.value = '';
    }
}

//Fetch country details from Public API
function fetchDetails(name){
    fetch('https://restcountries.com/v3.1/all')
    .then(res => res.json())
    .then((data)=>{
        data.map((items)=>{
            let commonName = name;
            let result = items.name.common
            if(result === commonName){
                renderCountryDetails(items);
            }   
        }
        )
    })
    .catch(err => console.error(err))
}

//Render comments
function renderComment(comment){
    let commentList = document.getElementById('commentBay');
    let commentDetail = document.createElement('p');
    commentDetail.textContent = comment;
    commentList.appendChild(commentDetail);
    let deleteComment = document.createElement('button');
    deleteComment.textContent = 'X';
    deleteComment.id = 'btn';
    commentDetail.appendChild(deleteComment);
    deleteComment.onclick = (e)=>{
        e.target.parentNode.remove();
    }
}

//Remove country from web page
function removeCountry(){
    let countryDetail = document.getElementById('countryContainer');
    console.log(countryDetail);
}