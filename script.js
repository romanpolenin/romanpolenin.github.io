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
/* =========================
   SHOW PROJECT
   ========================= */
function showProject(projectId) {
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
        Clear old slides
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
            image.src = photo;
            image.alt =
                project.name +
                " — photograph " +
                (index + 1);
            /*
                First image loads immediately.
                Others load lazily.
            */
            image.loading =
                index === 0
                    ? "eager"
                    : "lazy";
            slide.appendChild(image);
            slidesContainer.appendChild(slide);
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
function showSlide(index) {
    const slides =
        document.querySelectorAll(
            ".slide"
        );
    if (slides.length === 0) {
        return;
    }
    /*
        Loop around
    */
    if (index < 0) {
        currentSlide =
            slides.length - 1;
    }
    else if (
        index >= slides.length
    ) {
        currentSlide = 0;
    }
    else {
        currentSlide = index;
    }
    /*
        Remove active
    */
    slides.forEach(
        slide => {
            slide.classList.remove(
                "active"
            );
        }
    );
    /*
        Show current
    */
    slides[currentSlide]
        .classList.add("active");
    updateCounter();
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
        current + " / " + total;
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
        /*
            Don't change slides
            while About is open.
        */
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
let touchStartX = 0;
let touchEndX = 0;
slidesContainer.addEventListener(
    "touchstart",
    event => {
        touchStartX =
            event.changedTouches[0].screenX;
    },
    { passive: true }
);
slidesContainer.addEventListener(
    "touchend",
    event => {
        touchEndX =
            event.changedTouches[0].screenX;
        const distance =
            touchEndX - touchStartX;
        /*
            Minimum swipe distance
        */
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
   ESC
   ========================= */
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
showProject("atitlan");
