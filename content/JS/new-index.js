
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
// ES6 Return Body Offset Height
let bH = () => document.body.clientHeight




// Her initialiseres variabler til senere brug
let ftime, yid, newfetched, creditsfetched, runtimefetched;




//////////////////////////////////////////////////////////////////////////////
// Her foregår der et fetch med forskellige objekter merged til ét
// her får vi trailer, runtime, skuespillere samt instruktør og producent
//
// Det er en asynkron funktion der har et parameter mid(movieid),
// den tager det en argument ind når den køres.
//////////////////////////////////////////////////////////////////////////////

async function fetches(mid){

  fdata = await(await fetch(`https://api.themoviedb.org/3/movie/${mid}?api_key=05e8e134e4a46808f28a798d17cc7854&append_to_response=videos,credits`)).json()

  // Her tilføjes youtube video key fra det nye store objekt - innerHTML funktion tilføjer iframe til trailer-element.
  iH(trailer, `<iframe width="640" height="360" src="https://www.youtube.com/embed/${fdata.videos.results[0].key}" frameborder="0" allow="accelerometer;  autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" style="border-radius:15px; box-shadow: #00000040 1px 1px 10px 0px;"></iframe>`)

  // For loop til at tilføje 3 hovedepersoner samt instruktør og producer
  for (let o = 0; o < fdata.credits.crew.length; o++) {

        switch (fdata.credits.crew[o].job) {
          case 'Director':
              iH(director, '<h3>Director </h3>' + fdata.credits.crew[0].name)
              aC(people, director)
            break;
          case 'Producer':
              iH(producer, '<h3>Producer </h3>' + fdata.credits.crew[0].name)
              aC(people, producer)
            break;
        
          default:
            break;
        }
        
      }
      iH(hc1, '<h3>'+fdata.credits.cast[0].character+' </h3>' + fdata.credits.cast[0].name)
      iH(hc2, '<h3>'+fdata.credits.cast[1].character+' </h3>' + fdata.credits.cast[1].name)
      iH(hc3, '<h3>'+fdata.credits.cast[2].character+' </h3>' + fdata.credits.cast[2].name)
      



      let html = ""
          time = fdata.runtime
          min = time%60
          hour = time/60
          fulltime = Math.floor(hour)
          html =+ fulltime + 't '
          estTime = '<h3>Time</h3>'

      if(min != 0){
        html += min + 'min'
      }

      iH(estimate, estTime + html)

      // let time = fdata.runtime 
      //     min = time%60
      //     hour = time/60
      //     ftime = Math.floor(hour)


      // iH(estimate, '<h3>Time</h3>'+ftime+'t ')

      // if(min != 0){
      //   estimate.insertAdjacentHTML('beforeend', min + 'min')
      // }
      
      aC(people, hc1)
      aC(people, hc2)
      aC(people, hc3)
      
}




// Element length variabel, der skal afgøre 'data'-objektets length i forEach funktionen
let i = 0


// Search Submit
$('button').addEventListener('click', async function(e) {
    e.preventDefault()
    // Denne iH Funktion gør at hver gang der søges et nyt resultat, så bli'r
    // dem der allerede eksisterer, fjernet!
    iH($('section.result'), "")
    // Input Søgefelt
    let search = document.forms[0][0].value
      data = await(await fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=${search}&api_key=4ffe4c9183f5c5122350abfcb096598b`)).json()
      
      data.results.forEach(element => {

      let elm = element;
          card = elemCreate('section')
          title = elemCreate('p')
          average = elemCreate('span')
          released = elemCreate('span')
          overview = elemCreate('p')
          // button = elemCreate('a')
          




      // Click Function til at fremvise hver enkelt film
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
        
        info.style.minHeight = bH() + 'px'

        fetches(element.id)

        // Director, Actors, Producers, Runtime
        tC(title, elm.title)
        tC(overview, elm.overview)
        iH(created, "<h3>Released</h3>" + elm.release_date)
        iH(rating, "<h3>Rating</h3>" + elm.vote_average + "<i class='fas fa-star'></i>")
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


      // setC(button, 'btna')
      setC(card, 'movieCard')
      tC(title, element.title)

      tC(released, element['release_date'])
      iH(average, element['vote_average'] + "<i class='fas fa-star'></i>")
      
      tC(overview, element.overview)
      // tC(button, 'SE MERE')
      card.style.background = `url('https://image.tmdb.org/t/p/original/${element.backdrop_path}')`
      card.style.backgroundSize = `cover`
      aC($('section.result'), card)
      aC(card, title)
      // aC(card, button)





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

    })

})




First()


async function First() {
  // Denne iH Funktion gør at hver gang der søges et nyt resultat, så bli'r
  // dem der allerede eksisterer, fjernet!
  iH($('section.result'), "")
  // Input Søgefelt
  let search = 'Christmas'
    data = await(await fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=${search}&api_key=4ffe4c9183f5c5122350abfcb096598b`)).json()
    
    data.results.forEach(element => {

    let elm = element;
        card = elemCreate('section')
        title = elemCreate('p')
        average = elemCreate('span')
        released = elemCreate('span')
        overview = elemCreate('p')
        // button = elemCreate('a')
        




    // Click Function til at fremvise hver enkelt film
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
      
      info.style.minHeight = bH() + 'px'

      fetches(element.id)

      // Director, Actors, Producers, Runtime
      tC(title, elm.title)
      tC(overview, elm.overview)
      iH(created, "<h3>Released</h3>" + elm.release_date)
      iH(rating, "<h3>Rating</h3>" + elm.vote_average + "<i class='fas fa-star'></i>")
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


    setC(card, 'movieCard')
    tC(title, element.title)

    tC(released, element['release_date'])
    iH(average, element['vote_average'] + "<i class='fas fa-star'></i>")
    
    tC(overview, element.overview)
    card.style.background = `url('https://image.tmdb.org/t/p/original/${element.backdrop_path}')`
    card.style.backgroundSize = `cover`
    aC($('section.result'), card)
    aC(card, title)

    // Hvis der ikke medhører en et billede i movie-objektet
    // så fjerner den hele card'et, dvs filmen bliver ikke vist
    if(element.backdrop_path == null){
      card.remove();
    }
    
    i++

  })

}
