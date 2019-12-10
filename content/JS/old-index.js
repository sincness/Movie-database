
// fetch('https://api.themoviedb.org/3/movie/550?api_key=4ffe4c9183f5c5122350abfcb096598b')
// .then(resp => resp.json())
// .then(data => console.log(data))

// ES6 Query Selector Arrow Function
let $ = (selector) => (document.querySelectorAll(selector).length > 1) ? document.querySelectorAll(selector) : document.querySelector(selector)
// ES6 Create Element Arrow Function
let elemCreate = (element) => document.createElement(element)
// ES6 Set Attribute Arrow Function
let setA = (element, attribute, value) => element.setAttribute(attribute, value)
// ES6 Set Class Arrow Function
let setC = (element, value) => element.setAttribute('class', value)
// ES6 Change textContent Arrow Function
let tC = (element, value) => element.textContent = value
// ES6 Change innerHTML Arrow Function
let iH = (element, value) => element.innerHTML = value
// ES6 Append Child Arrow Function
let aC = (parent, child) => parent.appendChild(child)


// Dette var det første approach til at fetche de nødvendige objekter ned - linjen under her definere variablen yid (youtube id)
 let yid;


// Søg efter en films trailer
 async function fetchTrailer(mid){

   fetch(`https://api.themoviedb.org/3/movie/${mid}/videos?api_key=4ffe4c9183f5c5122350abfcb096598b`)
   .then(resp => (resp.json()))
//    .then(data => data.results.forEach(element  => {
//    console.log(element)
//    }))
   .then(data => {
       yid = data.id
       console.log(data)
       iH(trailer, `<iframe width="908" height="453" src="https://www.youtube.com/embed/${yid}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>`)

   })
 }
 let yid, newfetched, creditsfetched, runtimefetched;




 async function fetchTrailer(mid) {
     //await the response of the fetch call
   let response = await fetch(`https://api.themoviedb.org/3/movie/${mid}/videos?api_key=4ffe4c9183f5c5122350abfcb096598b`)
     //proceed once the first promise is resolved.
     newfetched = await response.json()
     //proceed only when the second promise is resolved
     yid = newfetched.results[0].key
    
       iH(trailer, `<iframe width="640" height="360" src="https://www.youtube.com/embed/${yid}" frameborder="0" allow="accelerometer;  autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" style="border-radius:15px; box-shadow: #00000040 1px 1px 10px 0px;"></iframe>`)
      


 }

 async function fetchRuntime(mid) {
   let response = await fetch(`https://api.themoviedb.org/3/movie/${mid}?api_key=4ffe4c9183f5c5122350abfcb096598b`)
   runtimefetched = await response.json()
  
  tC(estimate, runtimefetched.runtime+'min')

  

 }
 async function fetchCredits(mid) {
   let response = await fetch(`https://api.themoviedb.org/3/movie/${mid}/credits?api_key=4ffe4c9183f5c5122350abfcb096598b`)
   creditsfetched = await response.json()
   for (let o = 0; o < creditsfetched.crew.length; o++) {

     switch (creditsfetched.crew[o].job) {
       case 'Director':
           iH(director, '<h3>Director </h3>' + creditsfetched.crew[0].name)
           aC(people, director)
         break;
       case 'Producer':
           iH(producer, '<h3>Producer </h3>' + creditsfetched.crew[0].name)
           aC(people, producer)
         break;
    // Her kunne man tilføje en fejl-besked med ingen job members eller noget
       default:
         break;
     }
    
   }
   iH(hc1, '<h3>'+creditsfetched.cast[0].character+' </h3>' + creditsfetched.cast[0].name)
   iH(hc2, '<h3>'+creditsfetched.cast[1].character+' </h3>' + creditsfetched.cast[1].name)
   iH(hc3, '<h3>'+creditsfetched.cast[2].character+' </h3>' + creditsfetched.cast[2].name)
   aC(people, hc1)
   aC(people, hc2)
   aC(people, hc3)




  

 }



// Element length variabel, der skal afgøre 'data'-objektets length i forEach funktionen
let i = 0


// Search Submit
$('button').addEventListener('click', function(e) {
    e.preventDefault()
    // Denne iH Funktion gør at hver gang der søges et nyt resultat, så bli'r
    // dem der allerede eksisterer, fjernet!
    iH($('section.result'), "")
    // Input Søgefelt
    let search = document.forms[0][0].value
    fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=${search}&api_key=4ffe4c9183f5c5122350abfcb096598b`)
    .then(resp => resp.json())
    .then(data => data.results.forEach(element  => {

      let elm = element;
      


      
      
      let card = elemCreate('section')
          thumbnail = elemCreate('section')
          title = elemCreate('p')
          average = elemCreate('span')
          released = elemCreate('span')
          overview = elemCreate('p')
          button = elemCreate('a')
      
      
      
      // Click Funkcion til at fremvise hver enkelt film
      // Denne event listener kan ændres tilbage til button igen istedet for card!
      card.addEventListener('click', function() {
        let info = elemCreate('section')
            content = elemCreate('article')
            text = elemCreate('section')
            title = elemCreate('h1')
            overview = elemCreate('p')
            created = elemCreate('span')
            rating = elemCreate('span')
            trailer = elemCreate('section')
            close = elemCreate('a')
            people = elemCreate('section')
            estimate = elemCreate('span')
            hc1 = elemCreate('p')
            hc2 = elemCreate('p')
            hc3 = elemCreate('p')
            producer = elemCreate('p')
            director = elemCreate('p')
            spans = elemCreate('span')

        setC(info, 'info')
        setC(content, 'content')
        setC(people, 'people')
        setC(text, 'text')
        setC(spans, 'spans')
        setC(trailer, 'trailer')
        setC(close, 'close')
        
        
         fetchTrailer(element.id)
         fetchCredits(element.id)
         fetchRuntime(element.id)

        // Director, Actors, Producers, Runtime

        
        // content.style.background = `url('https://image.tmdb.org/t/p/original/${elm.backdrop_path}')`
        // content.style.backgroundSize = `cover`
        
        tC(title, elm.title)
        tC(overview, elm.overview)
        tC(created, elm.release_date)
        iH(rating, elm.vote_average + "<i class='fas fa-star'></i>")
        iH(close, '&times;')


        aC($('body'), info)
        aC(info, content)
        aC(content, text)
        aC(content, trailer)
        aC(content, close)
        aC(content, people)
        aC(text, title)
        aC(text, overview)
        aC(text, spans)        
        aC(spans, estimate)
        aC(spans, created)
        aC(spans, rating)



        window.onclick = function(event) {
          if (event.target == info) {
            info.remove()
          }
        }

        close.addEventListener('click', function(){
          info.remove()
        })
      })


      setC(button, 'btna')
      setC(card, 'movieCard')
      setC(thumbnail, 'thumbnail')
      tC(title, element.title)

      tC(released, element['release_date'])
      iH(average, element['vote_average'] + "<i class='fas fa-star'></i>")
      
      tC(overview, element.overview)
      tC(button, 'SE MERE')
      card.style.background = `url('https://image.tmdb.org/t/p/original/${element.backdrop_path}')`
      card.style.backgroundSize = `cover`
      // document.body.style.background = `linear-gradient(45deg, #1c2e68, #4169e1);`
    //   thumbnail.style.height = `100px`
      aC($('section.result'), card)
      aC(card, thumbnail)
      aC(card, title)
      // aC(card, overview)
      // aC(card, average)
      // aC(card, released)
      aC(card, button)











      // Hvis der ikke medhører en et billede i movie-objektet
      // så fjerner den hele card'et, dvs filmen bliver ikke vist
      if(element.backdrop_path == null){
        card.remove();

        // Der kan fortages andre handlinger istedet for at fjerne card'et
        // en simpel løsning, ville være en random erstartningsfarve der genereres
        // så card'et stadigvæk kan vises, det vil være mere optimalt -
        // hvis man ønsker flere resultater
      }
      // Hvis filmens billede der medhører er under 500px i width
      // så fjernes hele card'et også, dvs filmen ikke bliver vist
      // DETTE TJEK KUNNE GODT WRAPPES MED ET TJEK PÅ CLIENTWIDTH
      // SÅDAN AT RESULTATER KUN FJERNES I DE STØRRELSER DE IKKE FUNGERE I DESIGNET
      // if(card.offsetWidth < 600){
      //   console.log('REMOVE CARD')
      //   card.remove();
      // }
      i++

    }))
})


