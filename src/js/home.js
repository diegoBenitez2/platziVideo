console.log('hola mundo!');
 const noCambia = "@diegashoo";
 let cambia = "diego";

 function cambiarNombre(nuevoNombre){
   cambia = nuevoNombre
 }
 //Simulo el tiempo de respuesta y la respuesta positiva del request
const getUserAll = new Promise(function(todoBien,todoMal){
  // setTimeout(function(){
  //   //llamar API
  // todoBien('excelente');
  // },3000)
  
setTimeout(function(){
  todoBien('se acabo el tiempo');
},3000)
})

const getUser = new Promise(function(todoBien,todoMal){
  setTimeout(function(){
    //llamar API
  todoBien('excelente');
  },5000)
})
// getUser
// .then(function(msm){
//   console.log(msm);
// })
// .catch(function(msm){
//   console.log(msm)
// })

// getUserAll
// .then(function(msm){
//   console.log(msm);

// })
// .catch(function(msm){
//   console.log(msm);
// })
// getUser
// //metodo cuando todo va bien con la promesa
// .then(function(){
//   console.log("que bueno que salio bien")
// })
// //metodo cuando todo va mal con la promesa
// .catch(function(message){
//   console.log(message);
// })
// Promise.race: ejecuta el then de la promesa que se ejecute mas rapido
// Promise.all: ejecuta las dos promesas despues de quese acabe el tiempo de las dos
Promise.race([
  getUser,
  getUserAll ,

])
.then(function(message){
  console.log(message);
})
.catch(function(message){
  console.log(message);
})
//TRAYECTO DATOS CON JQUERY
//$.ajax(url,objeto)//
$.ajax('https://randomuser.me/api/',{
  //parametros
  method:'GET',
  //Cuando devuelve datos(todo ok)
  success:function(data){
    console.log(data);
    },
    //si algo sale mal
    error:function(error){
      console.log(error);
    }
  })
  //TRAYECTO DATOS ON VANILA JS//
  // fetch('url',configuration)--> devuelve un then o catch(promesa)
fetch('https://randomuser.me/api/')
.then(function(response){
  // console.log(response)
  //return creamos una promesa con los datos en JSON
   return  response.json() 
})
.then(function(user){
  console.log('nombre: ',user.results[0].name.first)
  console.log('apellido: ',user.results[0].name.last)

})
.catch(function(){
  console.log('algo fallo');
});

//FUNCIONES ASINCRONAS
(async function load(){
  // await
  //action
  //terror
  //animation
  //se pausa la aplicacion hasta q termine el await y despues ejecutara las siguientes
  //lineas
  //UNA FUNCION ASYNC DENTRO DE OTRA FUNCION ASYNC
   async function getData(url){
    const response = await fetch(url);
    const data = await response.json();
      if(data.data.movie_count>0){
        return data;
      }
      //sino hay pelis aqui continua
      //se crea un error personlizado
        throw error = new Error('No se encontro datos en la busqueda') ;
          
    }
 //traer datos usando async-await
 //variable en mayuscula significa que nunca va a cambiar.
  const BASE_API = 'https://yts.lt/api/v2/';
// console.log( 'ACCION',actionlist,'DRAMA',dramaList,'ANIMACION',animationList);
  const $form = document.getElementById('form');
  const $featuringContainer = document.getElementById('featuring');
//FUNCION PARA AGREGAR ATRIBUTOS AL ELEMENTO HTML
  function setAtrtributes($element,attributes){
    for (const attribute in attributes){
      $element.setAttribute(attribute,attributes[attribute]);
    }

  }
  //EVENTO DE BUSQUEDA EN EL FORMULARIO DE BUSQUEDA
  $form.addEventListener('submit',async (event)=>{
    // la funcion preventDefault evita recargar la
    // pagina con cada busqueda del formulario.
    event.preventDefault();
    //metodo para añadir la clase
    $home.classList.add('search-active');
    //creando un elemento html
    const $loader = document.createElement('img');
    setAtrtributes($loader,{src: 'src/images/loader.gif',
    height: 50,
    width: 50,
    })
    //anadir varios atributos a un elemento html
    // $('atributo').attr({src:'sdsd/asas', height:'35px', width:'35px'});
    $featuringContainer.append($loader);

    const data = new FormData($form);
    try{
      
      const {
        data:{
          movies:pelis
        }
      }= await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`);
    
      const HTMLString = featuringTemplate(pelis[0]);
      //reemplazar el loader por la el template html
      $featuringContainer.innerHTML = HTMLString;
    console.log(peli);
    }
    catch(errori){
      // debugger
      alert(errori);
      $loader.remove();
      $home.classList.remove('search-active');
    }
    //Desestructuracion de objetos
    //se desestructura el objeto buscando el key solicitado.
    // debugger
  })
  //FUNCION QUE CONTIENE EL TEMPLATE DE LAS CATEGORIAS
 function videoItemTemplate(movie, category){
    return(
      `<div class="primaryPlaylistItem" data-id="${movie.id}"data-category=${category}>
          <div class="primaryPlaylistItem-image">
              <img src="${movie.medium_cover_image}">
          </div>
            <h4 class="primaryPlaylistItem-title">
                   ${movie.title}
            </h4>     
      </div>`

    )
  }
  //FUNCION QUE CONTIENE EL TEMPLATE DEL LA BUSQUEDA
  function featuringTemplate(peli){
    return(
      ` <div class="featuring">
        <div class="featuring-image" src="#" alt="">
          <img src="${peli.medium_cover_image}"  width ="100" height="110">
      </div>
      <div class="featuring_content">
        <p class="featuring-title">pelicula encontrada</p>
        <p class="featuring-album">${peli.title}</p>
      </div>`
    )
  }
 //FUNCION PARA CREAR UN DOCUMENTO HTML PARA INCRUSTAR EL TEMPLATE
  function createTemplate(HTMLString){
    // crear un documento html nuevo dentro del DOM
    const html = document.implementation.createHTMLDocument();
    //innerHTML = convierte  y pega dentro de si mismo  cualquier texto html 
    html.body.innerHTML = HTMLString;
    return html.body.children[0];
    
  }
  // console.log(videoItemTemplate('src/images/covers/bitcoin.jpg', 'BITCOIN'));
  //FUNCION QUE DESEATA UN EVENTO DE CLICK TRAYENDO EL MODAL DEL LA PELICULA
function addEventClick($element){
  $element.addEventListener('click',()=>{
+ showModal($element);
  })
}
//evento click con jquery
// $('div').on('click',function){}


//function para cargar los templates de la peticion en la pagina
   function renderMovieList(list, $container, category){

  // actionlist.data.movies
  //remover el gif del container antes de cargar las peliculas  
  $container.children[0].remove();
  list.forEach(movie=>{
   
    const HTMLString = videoItemTemplate(movie, category);
    const movieElement = createTemplate(HTMLString);
    
    //UTILZA LA FUNCION APPEND PARA INCLUIR HTML DENTRO DEL DOM
    $container.append(movieElement);
    const image=  movieElement.querySelector('img');
    image.addEventListener('load',(event)=>{
    event.srcElement.classList.add('fadeIn');

    })
    addEventClick(movieElement);
  })
   }

  const $actionContainer = document.querySelector('#action');
  const $dramaContainer = document.querySelector('#drama');
  const $animationContainer = document.querySelector('#animation');
//CONSTANTE QUE TRAE LAS PETICIONES DE LA API MAS EL RENDER DE LAS PETICIONES
  const{data: { movies: actionlist} }= await getData(`${BASE_API}list_movies.json?genre=action`);
  renderMovieList(actionlist, $actionContainer,'action');

  const {data: { movies: dramaList} } = await getData(`${BASE_API}list_movies.json?genre=drama`);
  renderMovieList(dramaList,$dramaContainer,'drama');

  const {data: { movies: animationList} } = await getData(`${BASE_API}list_movies.json?genre=animation`);
  renderMovieList(animationList,$animationContainer,'animation');

  //SELECTORES

  const $home = document.getElementById('home');


  const $modal = document.getElementById('modal');
  const $overlay = document.getElementById('overlay');
  const $hideModal = document.getElementById('hide-modal');

    const $modalImage = $modal.querySelector('img');
    const $modalTitle = $modal.querySelector('h1');
    const $modalDescription = $modal.querySelector('p');
    //FUNCION PARA ENCONTRAR PELICULA POR SU ID
  function findById(list, id){
    return list.find(movie=>
    //busca y retorna a coincidencia
    //parseando el id a tipo numerico
     movie.id === parseInt(id, 10))
  }
  //FUNCION PARA ENCONTRAR PELICULA POR
 function findMovie(id, category){
   //con swicht se compara datos que ya conocemos
   switch(category){
     case 'action':{
      return findById(actionlist, id)
     }
     case 'drama':{
       return findById(dramaList, id)
     }
     case 'animation  ':{
    return findById(animationList, id)
     }
     default:{
       return alert('no se necontro coincidencias');
     }
   }
  //  //la funcion find busca dentro de arrays
  // actionlist.find(movie=>
  //   //busca y retorna a coincidencia
  //   //parseando el id a tipo numerico
  //    movie.id === parseInt(id, 10))
 }
  function showModal($element){
    $overlay.classList.add('active');
    $modal.style.animation ="modalIn .8s  forwards";
    //dataset agrupa todos los atributos de un elemento hmtl
    const id =  $element.dataset.id;
    const category = $element.dataset.category;
    const data = findMovie(id,category);
    // debugger
    $modalTitle.textContent = data.title;
    $modalImage.setAttribute('src',data.medium_cover_image);
    $modalDescription.textContent = data.description_full;

  }

  $hideModal.addEventListener('click',hideModal);
 function hideModal(){
    $overlay.classList.remove('active');
    $modal.style.animation ="modalOut .8s  forwards";
};  


  
  //CREANDO TEMPLATES
 


  //TRAER DATOS UTILIZANDO PROMESAS
//  let terrorList;
//   getData('https://yts.lt/api/v2/list_movies.json?genre=terror')
//    .then(function(data){
//      terrorList = data;
//      console.log('terrorList', terrorList);
//    })
})()


//SELECTORES EN JAVASCRIPT

  // const $home = $('.home . list #item');
  // const $home = document.getElementById('MODAL');
  // //trae el primer selector que coincida
  // document.querySelector('modal');
  // //traer todos los selectores de una clase en array
  // document.querySelectorAll('modal')
  // //traer una en especifico del  array
  // document.querySelectorAll('modal').[0];
  // //traer todos los componentes de una clase en array
  // document.getElementsByClassName('modal'); 



// const noCambia = "Leonidas";

// let cambia = "@LeonidasEsteban"

// function cambiarNombre(nuevoNombre) {
//   cambia = nuevoNombre
// }

// const getUserAll = new Promise(function(todoBien, todoMal) {
//   // llamar a un api
//   setTimeout(function() {
//     // luego de 3 segundos
//     todoBien('se acabó el tiempo');
//   }, 5000)
// })

// const getUser = new Promise(function(todoBien, todoMal) {
//   // llamar a un api
//   setTimeout(function() {
//     // luego de 3 segundos
//     todoBien('se acabó el tiempo 3');
//   }, 3000)
// })

// // getUser
// //   .then(function() {
// //     console.log('todo está bien en la vida')
// //   })
// //   .catch(function(message) {
// //     console.log(message)
// //   })

// Promise.race([
//   getUser,
//   getUserAll,
// ])
// .then(function(message) {
//   console.log(message);
// })
// .catch(function(message) {
//   console.log(message)
// })



// $.ajax('https://randomuser.me/api/sdfdsfdsfs', {
//   method: 'GET',
//   success: function(data) {
//     console.log(data)
//   },
//   error: function(error) {
//     console.log(error)
//   }
// })

// fetch('https://randomuser.me/api/dsfdsfsd')
//   .then(function (response) {
//     // console.log(response)
//     return response.json()
//   })
//   .then(function (user) {
//     console.log('user', user.results[0].name.first)
//   })
//   .catch(function() {
//     console.log('algo falló')
//   });


// (async function load() {
//   // await
//   // action
//   // terror
//   // animation
//   async function getData(url) {
//     const response = await fetch(url);
//     const data = await response.json();
//     if (data.data.movie_count > 0) {
//       // aquí se acaba
//       return data;
//     }
//     // si no hay pelis aquí continua
//     throw new Error('No se encontró ningun resultado');
//   }
//   const $form = document.getElementById('form');
//   const $home = document.getElementById('home');
//   const $featuringContainer = document.getElementById('featuring');


//   function setAttributes($element, attributes) {
//     for (const attribute in attributes) {
//       $element.setAttribute(attribute, attributes[attribute]);
//     }
//   }
//   const BASE_API = 'https://yts.am/api/v2/';

//   function featuringTemplate(peli) {
//     return (
//       `
//       <div class="featuring">
//         <div class="featuring-image">
//           <img src="${peli.medium_cover_image}" width="70" height="100" alt="">
//         </div>
//         <div class="featuring-content">
//           <p class="featuring-title">Pelicula encontrada</p>
//           <p class="featuring-album">${peli.title}</p>
//         </div>
//       </div>
//       `
//     )
//   }

//   $form.addEventListener('submit', async (event) => {
//     event.preventDefault();
//     $home.classList.add('search-active')
//     const $loader = document.createElement('img');
//     setAttributes($loader, {
//       src: 'src/images/loader.gif',
//       height: 50,
//       width: 50,
//     })
//     $featuringContainer.append($loader);

//     const data = new FormData($form);
//     try {
//       const {
//         data: {
//           movies: pelis
//         }
//       } = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`)

//       const HTMLString = featuringTemplate(pelis[0]);
//       $featuringContainer.innerHTML = HTMLString;
//     } catch(error) {
//       alert(error.message);
//       $loader.remove();
//       $home.classList.remove('search-active');
//     }
//   })

//   function videoItemTemplate(movie, category) {
//     return (
//       `<div class="primaryPlaylistItem" data-id="${movie.id}" data-category=${category}>
//         <div class="primaryPlaylistItem-image">
//           <img src="${movie.medium_cover_image}">
//         </div>
//         <h4 class="primaryPlaylistItem-title">
//           ${movie.title}
//         </h4>
//       </div>`
//     )
//   }
//   function createTemplate(HTMLString) {
//     const html = document.implementation.createHTMLDocument();
//     html.body.innerHTML = HTMLString;
//     return html.body.children[0];
//   }
//   function addEventClick($element) {
//     $element.addEventListener('click', () => {
//       // alert('click')
//       showModal($element)
//     })
//   }
//   function renderMovieList(list, $container, category) {
//     // actionList.data.movies
//     $container.children[0].remove();
//     list.forEach((movie) => {
//       const HTMLString = videoItemTemplate(movie, category);
//       const movieElement = createTemplate(HTMLString);
//       $container.append(movieElement);
//       const image = movieElement.querySelector('img');
//       image.addEventListener('load', (event) => {
//         event.srcElement.classList.add('fadeIn');
//       })
//       addEventClick(movieElement);
//     })
//   }

//   async function cacheExist(category) {
//     const listName = `${category}List`;
//     const cacheList = window.localStorage.getItem(listName);

//     if (cacheList) {
//       return JSON.parse(cacheList);
//     }
//     const { data: { movies: data } } = await getData(`${BASE_API}list_movies.json?genre=${category}`)
//     window.localStorage.setItem(listName, JSON.stringify(data))

//     return data;
//   }

//   // const { data: { movies: actionList} } = await getData(`${BASE_API}list_movies.json?genre=action`)
//   const actionList = await cacheExist('action');
//   // window.localStorage.setItem('actionList', JSON.stringify(actionList))
//   const $actionContainer = document.querySelector('#action');
//   renderMovieList(actionList, $actionContainer, 'action');

//   const dramaList = await await cacheExist('drama');
//   const $dramaContainer = document.getElementById('drama');
//   renderMovieList(dramaList, $dramaContainer, 'drama');

//   const animationList = await await cacheExist('animation');
//   const $animationContainer = document.getElementById('animation');
//   renderMovieList(animationList, $animationContainer, 'animation');








//   // const $home = $('.home .list #item');
//   const $modal = document.getElementById('modal');
//   const $overlay = document.getElementById('overlay');
//   const $hideModal = document.getElementById('hide-modal');

//   const $modalTitle = $modal.querySelector('h1');
//   const $modalImage = $modal.querySelector('img');
//   const $modalDescription = $modal.querySelector('p');

//   function findById(list, id) {
//     return list.find(movie => movie.id === parseInt(id, 10))
//   }

//   function findMovie(id, category) {
//     switch (category) {
//       case 'action' : {
//         return findById(actionList, id)
//       }
//       case 'drama' : {
//         return findById(dramaList, id)
//       }
//       default: {
//         return findById(animationList, id)
//       }
//     }
//   }

//   function showModal($element) {
//     $overlay.classList.add('active');
//     $modal.style.animation = 'modalIn .8s forwards';
//     const id = $element.dataset.id;
//     const category = $element.dataset.category;
//     const data = findMovie(id, category);

//     $modalTitle.textContent = data.title;
//     $modalImage.setAttribute('src', data.medium_cover_image);
//     $modalDescription.textContent = data.description_full
//   }

//   $hideModal.addEventListener('click', hideModal);
//   function hideModal() {
//     $overlay.classList.remove('active');
//     $modal.style.animation = 'modalOut .8s forwards';

//   }




// })()
