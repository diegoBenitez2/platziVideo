(async function load(){
  async function getData(url){

    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

})()
const BASE_API='url.com';
const actionList = getData(`${BASE_API}/movies`);
const dramaList = getData(`${BASE_API}/movies`);
const animationList = getData(`${BASE_API}/movies`);


function itemTtemplateMovies(movie){
  return(
     `<div class="primaryPlaylistItem">
          <div class="primaryPlaylistItem-image">
              <img src="${movie.medium_cover_image}">
          </div>
            <h4 class="primaryPlaylistItem-title">
                   ${movie.title}
            </h4>     
      </div>`

  )

}
function featuringTemplate(pelis){
  return(
    ` <div class="featuring">
        <div class="featuring-image" src="#" alt="">
          <img src="${pelis.medium_cover_image}"  width ="100" height="110">
      </div>
      <div class="featuring_content">
        <p class="featuring-title">pelicula encontrada</p>
        <p class="featuring-album">${pelis.title}</p>
      </div>`
  )
}
$actionContainer = document.querySelector('#action');
$dramaContainer = document.querySelector('#drama');
$animationContainer = document.querySelector('#animation');
$overlay = document.querySelector('#overlay');
$modal = document.getElementById('modal');
$form = document.querySelector('#form');
$home = document.querySelector('.home');
$closeModal = document.getElementById('close-buuton');
$containerFeaturing= document.getElementById('featuring');


$form.addEventListener('submit',()=>{
  $form.preventDefaultd();
  $home.classList.add('search-active')
  const $loader = document.createElement('img');
  setAttributes($loader,{src: 'src/images/loader.gif',
  height: 50,
  width: 50,
})
$containerFeaturing.append($loader);
const data = FormData($form);
const {
  data: {
    movies:pelis
  }
}=  await getData(`${BASE_API}/menu?limit=1&query_term=${data.get('name')}`);
const HtmlString = featuringTemplate(pelis[0]);
$containerFeaturing.innerHTML= HtmlString;

})

function setAttributes($element, attributes){
  for(const atribute in attributes)
  $element.setAttributes(atribute,attributes[atribute]);
}

function showModal(){
  $overlay.classList.add('active');
  $modal.style.animation = " modalIn 0.2s ease";
}

function hideModal(){
 $overlay.classList.remove('active');
  $modal.style.animation = " modalOut 0.2s ease";
} 

function addEventClick($element){
  $element.addEventListener('click',()=>{
    showModal();
  });
}
$closeModal.addEventListener('click',()=>{
  hideModal();
})
function HtmlTemplate(HtmlString){
  const html = document.implementation.createHTMLDocument();
  html.body.innerHTML = HtmlString;
  return html.body.children[0];
}

function renderHtml(list, $container){
  $container.body.children[0].remove();
  list.forEach(movie => {
  const HtmlString = itemTtemplateMovies(movie);
  const movieElement= HtmlTemplate(HtmlString);

  $container.append(movieElement);
  addEventMovie(movieElement);
})
}

renderHtml(actionList.data.movies, $actionContainer);
renderHtml(dramaList.data.movies, $dramaContainer);
renderHtml(animationList.data.movies, $animationContainer);





