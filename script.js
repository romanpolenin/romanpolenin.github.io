/* =========================
   PROJECTS
   ========================= */
const projects = {
    atitlan: {
        name: "Lake Atitlán",
        photos: [
            "images/atitlan-01.jpg",
            "images/atitlan-02.jpg",
            "images/atitlan-03.jpg",
            "images/atitlan-04.jpg"
        ]
    },
    mexico: {
        name: "Mexico",
        photos: [
            "images/mexico-01.jpg",
            "images/mexico-02.jpg",
            "images/mexico-03.jpg"
        ]
    },
    portraits: {
        name: "Portraits",
        photos: [
            "images/portrait-01.jpg",
            "images/portrait-02.jpg",
            "images/portrait-03.jpg"
        ]
    },
    street: {
        name: "Street Musicians",
        photos: [
            "images/street-01.jpg",
            "images/street-02.jpg",
            "images/street-03.jpg"
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
const counter =
    document.getElementById("counter");
const projectButtons =
    document.querySelectorAll(".project");
const previousButton =
    document.getElementById("prev");
const nextButton =
    document.getElementById("next");
const aboutButton =
    document.getElementById("about-button");
const about =
    document.getElementById("about");
const aboutClose =
    document.getElementById("about-close");
/* =========================
   STATE
   ========================= */
let currentProject = "atitlan";
let currentSlide = 0;
let isChanging = false;
/* =========================
   PRELOAD IMAGE
   ========================= */
function preloadImage(src) {
    return new Promise(
        (resolve, reject) => {
            const image =
                new Image();
            image.onload = resolve;
            image.onerror = reject;
            image.src = src;
        }
    );
}
/* =========================
   SHOW PROJECT
   ========================= */
async function showProject(projectId) {
    const project =
        projects[projectId];
    if (!project) {
        return;
    }
    currentProject =
        projectId;
    currentSlide = 0;
    projectName.textContent =
        project.name;
    /*
        Clear gallery
    */
    slidesContainer.innerHTML = "";
    /*
        Create slides
    */
    project.photos.forEach(
        (photo, index) => {
            const slide =
                document.createElement("div");
            slide.className =
                "slide";
            if (index === 0) {
                slide.classList.add(
                    "active"
                );
            }
            const image =
                document.createElement("img");
            image.src =
                photo;
            image.alt =
                project.name +
                " — photograph " +
                (index + 1);
            image.draggable =
                false;
            slide.appendChild(
                image
            );
            slidesContainer.appendChild(
                slide
            );
        }
    );
    updateCounter();
    /*
        Active project
    */
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
    /*
        Close About
    */
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
    if (slides.length === 0) {
        return;
    }
    let newIndex = index;
    /*
        Loop
    */
    if (newIndex < 0) {
        newIndex =
            slides.length - 1;
    }
    if (
        newIndex >= slides.length
    ) {
        newIndex = 0;
    }
    /*
        Same slide
    */
    if (
        newIndex === currentSlide
    ) {
        return;
    }
    isChanging = true;
    /*
        Load image first
    */
    const project =
        projects[currentProject];
    try {
        await preloadImage(
            project.photos[newIndex]
        );
    }
    catch {
        isChanging = false;
        return;
    }
    /*
        Remove active
    */
    slides[currentSlide]
        .classList.remove("active");
    /*
        New slide
    */
    currentSlide =
        newIndex;
    slides[currentSlide]
        .classList.add("active");
    updateCounter();
    /*
        Small delay prevents
        accidental double click
    */
    setTimeout(
        () => {
            isChanging = false;
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
            if (
                event.key === "Escape"
            ) {
                about.classList.remove(
                    "open"
                );
            }
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
let touchStartX = 0;
let touchEndX = 0;
slidesContainer.addEventListener(
    "touchstart",
    event => {
        touchStartX =
            event.changedTouches[0]
                .screenX;
    },
    { passive: true }
);
slidesContainer.addEventListener(
    "touchend",
    event => {
        touchEndX =
            event.changedTouches[0]
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
aboutClose.addEventListener(
    "click",
    () => {
        about.classList.remove(
            "open"
        );
    }
);
/* =========================
   INITIALIZE
   ========================= */
showProject("atitlan");
