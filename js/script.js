/*
--Descrizione--
Ricreiamo un feed social aggiungendo al layout di base fornito, il nostro script JS in cui:

--Milestone 1-- 
- Creiamo il nostro array di oggetti che rappresentano ciascun post (come da esempio).
Ogni post dovrà avere le informazioni necessarie per stampare la relativa card:
- id del post, numero progressivo da 1 a n
- nome autore,
- foto autore,
- data in formato americano (mm-gg-yyyy: es 05-03-2022),
- testo del post,
- immagine (non tutti i post devono avere una immagine),
- numero di likes.
*Non è necessario creare date casuali*
*Per le immagini va bene utilizzare qualsiasi servizio di placeholder ad es. Unsplash (https://unsplash.it/300/300?image=<id>)*

--Milestone 2-- 
- Prendendo come riferimento il layout di esempio presente nell'html, stampiamo i post del nostro feed.

--Milestone 3-- 
- Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo.
Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.

--BONUS--
 1. Formattare le date in formato italiano (gg/mm/aaaa)
 2. Gestire l'assenza dell'immagine profilo con un elemento di fallback che contiene le iniziali dell'utente (es. Olga Demina > OD).
 3. Al click su un pulsante "Mi Piace" di un post, se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone.

--Consigli del giorno:--
→ Ragioniamo come sempre a step.
→ Prima scriviamo nei commenti la logica in italiano e poi traduciamo in codice.
console.log() è nostro amico.
→ Quando un pezzo di codice funziona, chiediamoci se possiamo scomporlo in funzioni più piccole.
*/

const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.", // testo del post
        "media": "https://unsplash.it/600/300?image=171", //immagine post

        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15" // immagine utente
        },

        "likes": 80,
        "created": "2021-06-25"
    },

    {
        "id": 2,
        "content": "Ma fossi tu quel barbaro barbiere che barbassi quella barba così barbaramente a piazza Barberini.", // testo del post
        "media": "https://unsplash.it/600/300?image=172", //immagine post

        "author": {
            "name": "Vitantonio Paparella",
            "image": "https://unsplash.it/300/300?image=16" // immagine utente
        },

        "likes": 128,
        "created": "2021-09-17"
    },

    {
        "id": 3,
        "content": " Se l’arcivescovo di Costantinopoli si disarcivescoviscostantinopolizzasse, tu ti disarcivescoviscostantinopolizzeresti come si è disarcivescoviscostantinopolizzato l’arcivescovo di Costantinopoli?", // testo del post
        "media": "https://unsplash.it/600/300?image=173", //immagine post

        "author": {
            "name": "Sara Genuardi",
            "image": "https://unsplash.it/300/300?image=17" // immagine utente
        },

        "likes": 166,
        "created": "2021-06-16"
    },

    {
        "id": 4,
        "content": "Al pozzo di Santa Pazzia protettrice dei pazzi, c'è una pazza che lava una pezza, arriva un pazzo con un pezzo di pizza e chiede alla pazza se ne vuole un pezzo, la pazza rifiuta il pazzo si infuria e getta la pazza, la pezza e la pizza nel pozzo di Santa Pazzia protettrice dei pazzi", // testo del post
        "media": "https://unsplash.it/600/300?image=174", //immagine post

        "author": {
            "name": "Arianna Easteregg",
            "image": "https://unsplash.it/300/300?image=18" // immagine utente
        },

        "likes": 23,
        "created": "2021-1-8"
    }
];

/* Esempio post
<!-- post di esempio/template, da togliere/commentare e generare da JS -->

    <div class="post">
        <div class="post__header"> <!-- Sezione Header della card -->
            <div class="post-meta">                    
                <div class="post-meta__icon"> <!-- Immagine profilo -->
                    <img class="profile-pic" src="https://unsplash.it/300/300?image=15" alt="Phil Mangione">                    
                </div>
                <div class="post-meta__data"> <!-- Info profilo -->
                    <div class="post-meta__author">Phil Mangione</div>
                    <div class="post-meta__time">4 mesi fa</div>
                </div>                    
            </div>
        </div>
        <div class="post__text">Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.</div> <!-- Testo del post -->
        <div class="post__image"> <!-- Immagine del post -->
            <img src="https://unsplash.it/600/300?image=171" alt="">
        </div>
        <div class="post__footer"> <!-- Sezione Footer della card -->
            <div class="likes js-likes">
                <div class="likes__cta"> <!-- tasto mi piace -->
                    <a class="like-button  js-like-button" href="#" data-postid="1">
                        <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                        <span class="like-button__label">Mi Piace</span>
                    </a>
                </div>
                <div class="likes__counter">
                    Piace a <b id="like-counter-1" class="js-likes-counter">80</b> persone
                </div>
            </div> 
        </div>            
    </div>
*/
const container = document.getElementById("container");

posts.forEach(element => {
    const divPostCard = mainDivMaker(element.author.image, element.author.name)
    contentDivMaker(divPostCard, element.content, element.media)
    postInfoDivMaker(divPostCard, element.id, element.likes)
    container.append(divPostCard)
});




// FUNCTIONS

/*
Descrizione: la funzione prende 2 dati, crea un elemento div nell'html, gli affida una classe, al suo interno inserisce nome e immagine dell'utente, restituisce la variabile a cui poi si appendereanno le prossime funzioni
*/
function mainDivMaker(imgAuthor, nameAuthor) {
    
    const divPostCard = document.createElement("div");
        divPostCard.classList.add("post");
        divPostCard.innerHTML = 
        `<div class="post__header">
            <div class="post-meta">                    
                <div class="post-meta__icon">
                    <img class="profile-pic" src="${imgAuthor}" alt="${nameAuthor}">                    
                </div>
                <div class="post-meta__data">
                    <div class="post-meta__author">${nameAuthor}</div>
                    <div class="post-meta__time">4 mesi fa</div>
                </div>                    
            </div>
        </div>`

    return divPostCard
}

/*
Descrizione: la funzione prende 3 dati di cui uno l'elemento a cui appendersi (container), gli altri 2 servono a creare gli elementi del post, ovvero il testo e l'immagine del post
*/
function contentDivMaker(container, userContent, userMedia) {
    const divContentText = document.createElement("div");
        divContentText.classList.add("post__text");
        divContentText.innerHTML = `${userContent}`

    const divContentImage = document.createElement("div");
        divContentImage.classList.add("post__image");
        divContentImage.innerHTML = `<img src="${userMedia}" alt="${userContent}">`

        container.append(divContentText)
        container.append(divContentImage)
}

/*
Descrizione: la funzione prende 3 dati di cui uno sempre l'elemento a cui appendersi (container), gli altri 2 servono a creare gli elementi restanti del post, ovvero il bottone dei like e il numero di like ricevuti
*/
function postInfoDivMaker(container, userId, userThumbs) {
    const divPostInfo = document.createElement("div");
        divPostInfo.classList.add("post__footer");
        divPostInfo.innerHTML = 
        `<div class="likes js-likes">
        <div class="likes__cta">
            <a class="like-button  js-like-button" href="#" data-postid="${userId}">
                <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                <span class="like-button__label">Mi Piace</span>
            </a>
        </div>
        <div class="likes__counter">
            Piace a <b id="like-counter-1" class="js-likes-counter">${userThumbs}</b> persone
        </div>
        </div>`

        container.append(divPostInfo)
}