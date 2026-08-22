/* =========================
   PROJECTS
   ========================= */

const projects = {


    /* =====================
       MEXICO
       ===================== */

    zapatista: {

        country: "Mexico",

        name: "Zapatista",

        description:
            "Documentary project about the Zapatista communities in Chiapas.",

        photos: [

            "images/zapatista-1.jpg",
            "images/zapatista-2.jpg",
            "images/zapatista-3.jpg",
            "images/zapatista-4.jpg"

        ]

    },


    orizaba: {

        country: "Mexico",

        name: "Pico de Orizaba",

        description:
            "A journey toward Pico de Orizaba, the highest mountain in Mexico.",

        photos: [

            "images/orizaba-1.jpg",
            "images/orizaba-2.jpg",
            "images/orizaba-3.jpg",
            "images/orizaba-4.jpg"

        ]

    },


    "mexico-street": {

        country: "Mexico",

        name: "Street",

        description:
            "Fragments of everyday life and people encountered on the streets of Mexico.",

        photos: [

            "images/mexico-street-1.jpg",
            "images/mexico-street-2.jpg",
            "images/mexico-street-3.jpg",
            "images/mexico-street-4.jpg"

        ]

    },

   /* =====================
   PROJECTS
   ===================== */

sombrero: {
    country: "Projects",
    name: "Sombrero",
    description:
        "A photographic study of the sombrero as an object, symbol and part of everyday life.",
    photos: [
        "images/sombrero-1.jpg",
        "images/sombrero-2.jpg",
        "images/sombrero-3.jpg",
        "images/sombrero-4.jpg"
    ]

},

mannequin: {
    country: "Projects",
    name: "Mannequin",
    description:
        "A study of mannequins, bodies and artificial representations of the human figure.",
    photos: [
        "images/mannequin-1.jpg",
        "images/mannequin-2.jpg",
        "images/mannequin-3.jpg",
        "images/mannequin-4.jpg"
    ]
},
   
streetmusic: {
    country: "Projects",
    name: "Street Music",
    description:
        "Street musicians and performers encountered across Latin America.",
    photos: [
        "images/streetmusic-1.jpg",
        "images/streetmusic-2.jpg",
        "images/streetmusic-3.jpg",
        "images/streetmusic-4.jpg"
    ]
},

    /* =====================
       GUATEMALA
       ===================== */

    atitlan: {

        country: "Guatemala",

        name: "Atitlán",

        description:
            "Life around Lake Atitlán and the communities living on its shores.",

        photos: [

            "images/atitlan-1.jpg",
            "images/atitlan-2.jpg",
            "images/atitlan-3.jpg",
            "images/atitlan-4.jpg"

        ]

    },


    tajumulco: {

        country: "Guatemala",

        name: "Tajumulco",

        description:
            "A journey to Tajumulco, the highest point in Guatemala.",

        photos: [

            "images/tajumulco-1.jpg",
            "images/tajumulco-2.jpg",
            "images/tajumulco-3.jpg",
            "images/tajumulco-4.jpg"

        ]

    },


    "guatemala-street": {

        country: "Guatemala",

        name: "Street",

        description:
            "People, streets and everyday moments observed across Guatemala.",

        photos: [

            "images/guatemala-street-1.jpg",
            "images/guatemala-street-2.jpg",
            "images/guatemala-street-3.jpg",
            "images/guatemala-street-4.jpg"

        ]

    }

};


/* =========================
   ELEMENTS
   ========================= */

const slidesContainer =
    document.getElementById("slides");


const projectName =
    document.getElementById("project-name");


const projectDescription =
    document.getElementById(
        "project-description"
    );


const counter =
    document.getElementById("counter");


const projectButtons =
    document.querySelectorAll(".project");


const countryButtons =
    document.querySelectorAll(
        ".country-title"
    );


const previousButton =
    document.getElementById("prev");


const nextButton =
    document.getElementById("next");


const aboutButton =
    document.getElementById(
        "about-button"
    );


const nameLink =
    document.querySelector(".name");


const about =
    document.getElementById("about");


const aboutClose =
    document.getElementById(
        "about-close"
    );


/* =========================
   STATE
   ========================= */

let currentProject =
    "zapatista";


let currentSlide =
    0;


let isChanging =
    false;


/* =========================
   PRELOAD IMAGE
   ========================= */

function preloadImage(src) {

    return new Promise(
        (resolve, reject) => {

            const image =
                new Image();


            image.onload =
                resolve;


            image.onerror =
                reject;


            image.src =
                src;

        }
    );

}


/* =========================
   SHOW PROJECT
   ========================= */

async function showProject(
    projectId
) {

    const project =
        projects[projectId];


    if (!project) {
        return;
    }


    currentProject =
        projectId;


    currentSlide =
        0;


    /* Project information */

    projectName.textContent =
        project.name;


    projectDescription.textContent =
        project.description;


    /* Clear gallery */

    slidesContainer.innerHTML =
        "";


    /* Create slides */

    project.photos.forEach(
        (photo, index) => {

            const slide =
                document.createElement(
                    "div"
                );


            slide.className =
                "slide";


            if (index === 0) {

                slide.classList.add(
                    "active"
                );

            }


            const image =
                document.createElement(
                    "img"
                );


            image.src =
                photo;


            image.alt =
                project.name +
                " — photograph " +
                (index + 1);


            image.draggable =
                false;


            image.loading =
                index === 0
                    ? "eager"
                    : "lazy";


            slide.appendChild(
                image
            );


            slidesContainer.appendChild(
                slide
            );

        }
    );


    updateCounter();


    /* Active project */

    projectButtons.forEach(
        button => {

            button.classList.remove(
                "active"
            );


            if (
                button.dataset.project
                === projectId
            ) {

                button.classList.add(
                    "active"
                );

            }

        }
    );


    /* Close About */

    about.classList.remove(
        "open"
    );

}


/* =========================
   SHOW SLIDE
   ========================= */

async function showSlide(index) {

    if (isChanging) {
        return;
    }


    const slides =
        document.querySelectorAll(
            ".slide"
        );


    if (!slides.length) {
        return;
    }


    let newIndex =
        index;


    /* Loop */

    if (newIndex < 0) {

        newIndex =
            slides.length - 1;

    }


    if (
        newIndex >= slides.length
    ) {

        newIndex =
            0;

    }


    if (
        newIndex === currentSlide
    ) {

        return;

    }


    isChanging =
        true;


    const project =
        projects[currentProject];


    try {

        await preloadImage(
            project.photos[newIndex]
        );

    }
    catch {

        isChanging =
            false;

        return;

    }


    slides[currentSlide]
        .classList.remove(
            "active"
        );


    currentSlide =
        newIndex;


    slides[currentSlide]
        .classList.add(
            "active"
        );


    updateCounter();


    setTimeout(
        () => {

            isChanging =
                false;

        },
        400
    );

}


/* =========================
   NEXT
   ========================= */

function nextSlide() {

    showSlide(
        currentSlide + 1
    );

}


/* =========================
   PREVIOUS
   ========================= */

function previousSlide() {

    showSlide(
        currentSlide - 1
    );

}


/* =========================
   COUNTER
   ========================= */

function updateCounter() {

    const project =
        projects[currentProject];


    const current =
        String(
            currentSlide + 1
        ).padStart(2, "0");


    const total =
        String(
            project.photos.length
        ).padStart(2, "0");


    counter.textContent =
        current +
        " / " +
        total;

}


/* =========================
   PROJECT BUTTONS
   ========================= */

projectButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                showProject(
                    button.dataset.project
                );

            }
        );

    }
);


/* =========================
   COUNTRY COLLAPSIBLE MENU
   ========================= */

countryButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const country =
                    button.dataset.country;


                const menu =
                    document.getElementById(
                        country +
                        "-projects"
                    );


                menu.classList.toggle(
                    "closed"
                );


                button.classList.toggle(
                    "closed"
                );

            }
        );

    }
);


/* =========================
   ARROWS
   ========================= */

nextButton.addEventListener(
    "click",
    nextSlide
);


previousButton.addEventListener(
    "click",
    previousSlide
);


/* =========================
   KEYBOARD
   ========================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            about.classList.contains(
                "open"
            )
        ) {

            return;

        }


        if (
            event.key === "ArrowRight"
        ) {

            nextSlide();

        }


        if (
            event.key === "ArrowLeft"
        ) {

            previousSlide();

        }

    }
);


/* =========================
   TOUCH / SWIPE
   ========================= */

let touchStartX =
    0;


let touchEndX =
    0;


slidesContainer.addEventListener(
    "touchstart",
    event => {

        touchStartX =
            event
                .changedTouches[0]
                .screenX;

    },
    { passive: true }
);


slidesContainer.addEventListener(
    "touchend",
    event => {

        touchEndX =
            event
                .changedTouches[0]
                .screenX;


        const distance =
            touchEndX -
            touchStartX;


        if (
            Math.abs(distance) < 50
        ) {

            return;

        }


        if (distance < 0) {

            nextSlide();

        }
        else {

            previousSlide();

        }

    },
    { passive: true }
);


/* =========================
   ABOUT
   ========================= */

aboutButton.addEventListener(
    "click",
    () => {

        about.classList.add(
            "open"
        );

    }
);


/* NAME → ABOUT */

nameLink.addEventListener(
    "click",
    event => {

        event.preventDefault();


        about.classList.add(
            "open"
        );

    }
);


/* CLOSE ABOUT */

aboutClose.addEventListener(
    "click",
    () => {

        about.classList.remove(
            "open"
        );

    }
);


/* ESC */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            about.classList.remove(
                "open"
            );

        }

    }
);


/* =========================
   INITIALIZE
   ========================= */

showProject(
    "zapatista"
);
