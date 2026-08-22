const projects = {

    atitlan: {

        name: "Lake Atitlán",

        photos: [
            "images/FUJI1225.jpg",
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


const gallery = document.getElementById("gallery");

const projectName =
    document.getElementById("project-name");

const projectCount =
    document.getElementById("project-count");

const projectButtons =
    document.querySelectorAll(".project");


function showProject(projectId) {

    const project = projects[projectId];


    /*
        Change title
    */

    projectName.textContent = project.name;


    /*
        Number of photographs
    */

    projectCount.textContent =
        project.photos.length +
        (project.photos.length === 1
            ? " photograph"
            : " photographs");


    /*
        Clear old gallery
    */

    gallery.innerHTML = "";


    /*
        Create photographs
    */

    project.photos.forEach((photo, index) => {

        const photoContainer =
            document.createElement("div");

        photoContainer.className = "photo";


        const img =
            document.createElement("img");

        img.src = photo;

        img.alt =
            project.name +
            " — photograph " +
            (index + 1);


        /*
            Information below photograph
        */

        const info =
            document.createElement("div");

        info.className = "photo-info";


        const number =
            document.createElement("span");

        number.textContent =
            String(index + 1).padStart(2, "0");


        const total =
            document.createElement("span");

        total.textContent =
            String(project.photos.length)
                .padStart(2, "0");


        info.appendChild(number);
        info.appendChild(total);


        /*
            Add everything
        */

        photoContainer.appendChild(img);
        photoContainer.appendChild(info);

        gallery.appendChild(photoContainer);

    });


    /*
        Highlight active project
    */

    projectButtons.forEach(button => {

        button.classList.remove("active");

        if (button.dataset.project === projectId) {

            button.classList.add("active");

        }

    });


    /*
        Start project from top
    */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/*
    Project buttons
*/

projectButtons.forEach(button => {

    button.addEventListener("click", () => {

        showProject(
            button.dataset.project
        );

    });

});


/*
    Initial project
*/

showProject("atitlan");
