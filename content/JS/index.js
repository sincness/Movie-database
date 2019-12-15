// ES6 Query Selector Arrow Function
$ = (selector) => (document.querySelectorAll(selector).length > 1) ? document.querySelectorAll(selector) : document.querySelector(selector)
// ES6 Create Element Arrow Function
elemCreate = (element) => document.createElement(element)
// ES6 Set Attribute Arrow Function
setA = (element, attribute, value) => element.setAttribute(attribute, value)
// ES6 Set Class Arrow Function
setC = (element, value) => element.setAttribute('class', value)
// ES6 Change textContent Arrow Function
tC = (element, value) => element.textContent = value
// ES6 Change innerHTML Arrow Function
iH = (element, value) => element.innerHTML = value
// ES6 Append Child Arrow Function
aC = (parent, child) => parent.appendChild(child)
// ES6 Return Body Offset Height
bH = () => document.body.clientHeight




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



  // Her bruger vi en af de nye indbyggede array funktioner med metode filter
  // den filtrer som lidt gi'r sig selv, det gør den ud fra job.
  // Det bruger vi istedet for en switch, da det andet ikke kom til rette.
  let directorPerson = fdata.credits.crew.filter((person) => {
    if(person.job == 'Director') {return person}
  })
  let producerPerson = fdata.credits.crew.filter((person) => {
    if(person.job == 'Producer') {return person}
  })

  iH(director, '<h3>Director </h3>' + directorPerson[0].name)
  aC(people, director)
  iH(producer, '<h3>Producer </h3>' + producerPerson[0].name)
  aC(people, producer)


 
      iH(hc1, '<h3>'+fdata.credits.cast[0].character+' </h3>' + fdata.credits.cast[0].name)
      iH(hc2, '<h3>'+fdata.credits.cast[1].character+' </h3>' + fdata.credits.cast[1].name)
      iH(hc3, '<h3>'+fdata.credits.cast[2].character+' </h3>' + fdata.credits.cast[2].name)
      



          html = ""
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
      
      aC(people, hc1)
      aC(people, hc2)
      aC(people, hc3)
      
}




// Element length variabel, der skal afgøre 'data'-objektets length i forEach funktionen
i = 0


// Search Submit
$('button').addEventListener('click', async function(e) {
    e.preventDefault()
    // Denne iH Funktion gør at hver gang der søges et nyt resultat, så bli'r
    // dem der allerede eksisterer, fjernet!
    iH($('section.result'), "")
    // Input Søgefelt
    search = document.forms[0][0].value
    // Async ES6 fetch
      data = await(await fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=${search}&api_key=4ffe4c9183f5c5122350abfcb096598b`)).json()
      
    // forEach loop til hver enkelt film hentes ud af det fetchede objekt
    // og lægges ned i 'element' arrow function, til hver af filmene
      data.results.forEach(element => {
      // Oprettelse af elementerne med en variabel som tilgang
          let elm = element;
          card = elemCreate('section')
          title = elemCreate('p')
          average = elemCreate('span')
          released = elemCreate('span')
          overview = elemCreate('p')
          




      // Click Function til at fremvise hver enkelt film i en modal
      card.addEventListener('click', () => {
            info = elemCreate('section')
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

        // Setting classes, textcontent, innerhtml, styling
        setC(info, 'info')
        setC(content, 'content')
        setC(people, 'people')
        setC(text, 'text')
        setC(spans, 'spans')
        setC(trailer, 'trailer')
        setC(close, 'close')
        
        info.style.minHeight = bH() + 'px'

        // Aktiver modal ud fra filmens id
        fetches(element.id)

        // Director, Actors, Producers, Runtime
        tC(title, elm.title)
        tC(overview, elm.overview)
        iH(created, "<h3>Released</h3>" + elm.release_date)
        iH(rating, "<h3>Rating</h3>" + elm.vote_average + "<i class='fas fa-star'></i>")
        iH(close, '&times;')

      // Append alle elementerne til deres respektive placeringer
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



        window.onclick = (event) => {
          if (event.target == info) {
            info.remove()
          }
        }

        close.addEventListener('click', () => {
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

        // Der kan fortages andre handlinger istedet for at fjerne card'et
        // en simpel løsning, ville være en random erstartningsfarve der genereres
        // så card'et stadigvæk kan vises, det vil være mere optimalt -
        // hvis man ønsker flere resultater
      }
      i++

    })

})




First()




async function First() {
  // Denne iH Funktion gør at hver gang der søges et nyt resultat, så bli'r
  // dem der allerede eksisterer, fjernet!
  iH($('section.result'), "")
  // Search input'et erstattes med keywordet Christmas
  search = 'Christmas'
    // Async ES6 fetch
    data = await(await fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=${search}&api_key=4ffe4c9183f5c5122350abfcb096598b`)).json()
    

    // forEach loop til hver enkelt film hentes ud af det fetchede objekt
    // og lægges ned i 'element' arrow function, til hver af filmene
    data.results.forEach(element => {
    // Element oprettelse
    let elm = element;
        card = elemCreate('section')
        title = elemCreate('p')
        average = elemCreate('span')
        released = elemCreate('span')
        overview = elemCreate('p')
        




    // Click Function til at fremvise hver enkelt film i en modal
    card.addEventListener('click', () => {
      // Oprettelse af elementerne med en variabel som tilgang
          info = elemCreate('section')
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


      // Append alle elementerne til deres respektive placeringer
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



      window.onclick = (event) => {
        if (event.target == info) {
          info.remove()
        }
      }

      close.addEventListener('click', () => {
        info.remove()
      })
    })

    // Setting classes, textcontent, innerhtml, styling
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
