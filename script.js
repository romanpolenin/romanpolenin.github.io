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
const gallery =
    document.getElementById("gallery");
const projectName =
    document.getElementById("project-name");
const projectCount =
    document.getElementById("project-count");
const projectButtons =
    document.querySelectorAll(".project");
const aboutButton =
    document.getElementById("about-button");
const about =
    document.getElementById("about");
const aboutClose =
    document.getElementById("about-close");
/* =========================
   SHOW PROJECT
   ========================= */
function showProject(projectId) {
    const project =
        projects[projectId];
    if (!project) {
        return;
    }
    /* Project name */
    projectName.textContent =
        project.name;
    /* Number of photographs */
    const number =
        project.photos.length;
    projectCount.textContent =
        number +
        (number === 1
            ? " photograph"
            : " photographs");
    /* Clear gallery */
    gallery.innerHTML = "";
    /* Create photos */
    project.photos.forEach(
        (photo, index) => {
            const photoContainer =
                document.createElement("div");
            photoContainer.className =
                "photo";
            /* Image */
            const img =
                document.createElement("img");
            img.src = photo;
            img.alt =
                project.name +
                " — photograph " +
                (index + 1);
            img.loading =
                index === 0
                    ? "eager"
                    : "lazy";
            /* Information */
            const info =
                document.createElement("div");
            info.className =
                "photo-info";
            const numberElement =
                document.createElement("span");
            numberElement.textContent =
                String(index + 1)
                    .padStart(2, "0");
            const totalElement =
                document.createElement("span");
            totalElement.textContent =
                String(number)
                    .padStart(2, "0");
            info.appendChild(
                numberElement
            );
            info.appendChild(
                totalElement
            );
            /* Add to page */
            photoContainer.appendChild(
                img
            );
            photoContainer.appendChild(
                info
            );
            gallery.appendChild(
                photoContainer
            );
        }
    );
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
    /* Return to top */
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
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
   ABOUT OPEN
   ========================= */
aboutButton.addEventListener(
    "click",
    () => {
        about.classList.add(
            "open"
        );
    }
);
/* =========================
   ABOUT CLOSE
   ========================= */
aboutClose.addEventListener(
    "click",
    () => {
        about.classList.remove(
            "open"
        );
    }
);
/* =========================
   ESCAPE CLOSES ABOUT
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
   INITIAL PROJECT
   ========================= */
showProject("atitlan");
