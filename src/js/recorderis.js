(async function load(){
  async function getData(url){

    const response = await fetch(url);
    const data = await response.json();
    if(data.data.movie_count>0){
      return data
    }
    else{
      throw error = new Error('no se necontro datos en la busqueda');
    }
  }

})()



function itemTtemplateMovies(movie,category){
  return(
     `<div class="primaryPlaylistItem" data-id="${movie.id}" category = ${category}>
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
const $modalImage = $modal.querySelector('img');
  const $modalTitle = $modal.querySelector('h1');
  const $modalDescription = $modal.querySelector('p');


$form.addEventListener('submit',()=>{
  $form.preventDefaultd();
  $home.classList.add('search-active')
  const $loader = document.createElement('img');
  setAttributes($loader,{src: 'src/images/loader.gif',
  height: 50,
  width: 50,
})
$containerFeaturing.append($loader);
try{
const data = FormData($form);
const {
  data: {
    movies:pelis
  }
}=  await getData(`${BASE_API}/menu?limit=1&query_term=${data.get('name')}`);
const HtmlString = featuringTemplate(pelis[0]);
$containerFeaturing.innerHTML= HtmlString;


}
catch(error){
alert(error);
$loader.remove();
$home.classList.remove('search-active');

}

})

function setAttributes($element, attributes){
  for(const atribute in attributes)
  $element.setAttributes(atribute,attributes[atribute]);
}
function findById(id,list){
  return list.find(movie=>movie.id==parseInt(id, 10)
)
}
function findMovie(id, category){
  
  switch (category) {
    case 'action':{
      return findById(actionList,id);
    }
    case 'drama':{
      return findById(dramaList,id);   
      
       }
    case 'animation':{
      return findById(animationList,id);   
      
       }
    default:{
      alert('no se encontro coincidencias');
    }
  }

  
}
function showModal($element){
  $overlay.classList.add('active');
  $modal.style.animation = " modalIn 0.2s ease";
  const id = $element.dataset.data.id;
  const category = $element.dataset.category;
  const data = findMovie(id, category);
  $modalTitle.textContent = data.title; 
  $modalDescription.textContent = data.description_full;
  $modalImage.setAttributes('src',data.medium_cover_image);

}

function hideModal(){
 $overlay.classList.remove('active');
  $modal.style.animation = " modalOut 0.2s ease";
} 

function addEventClick($element){
  $element.addEventListener('click',()=>{
    showModal($element);
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

function renderHtml(list, $container,category){
  $container.body.children[0].remove();
  list.forEach(movie => {
  const HtmlString = itemTtemplateMovies(movie,category);
  const movieElement= HtmlTemplate(HtmlString);
  $container.append(movieElement);
  const image = movieElement.querySelector('img');
  image.addEventListener('load',event =>{
   event.srcElement.classList.add('fadeIn');
  })
  addEventMovie(movieElement);
})
}
async function cacheExist(category){
  const listName = `${category}list`
  const cacheList = window.localStorage.getItem(listName);
  if(cacheList){
    return JSON.parse(cacheList);
  }
    const {data:{movies: data}} = await getData(`${BASE_API}/movies= ${category}`);
    window.localStorage.setItem(JSON.stringify(data));
    return data;
}
const BASE_API='url.com';
const  actionList   = cacheExist('action');
renderHtml(actionList, $actionContainer,'action');
const dramaList = cacheExist('drama');
renderHtml(dramaList, $dramaContainer,'drama');
const  animationList = cacheExist('animation');
renderHtml(animationList, $animationContainer,'animation');





