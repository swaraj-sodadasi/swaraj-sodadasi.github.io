/*
==========================================
PORTFOLIO WEBSITE SCRIPT
==========================================
*/

document.addEventListener("DOMContentLoaded", () => {

    /*
    ==========================================
    NAVIGATION LINKS
    ==========================================
    */

    const navLinks = document.querySelectorAll("#nav-links a");

    /*
    ==========================================
    SMOOTH SCROLLING WITH HEADER OFFSET
    ==========================================
    */

    navLinks.forEach(link => {

        link.addEventListener("click", (event) => {

            event.preventDefault();

            const targetId = link.getAttribute("href");

            const targetSection =
                document.querySelector(targetId);

            if (!targetSection) {
                return;
            }

            /*
            ======================================
            HEADER HEIGHT
            ======================================
            */

            const header =
                document.querySelector("header");

            const headerHeight =
                header.offsetHeight;

            /*
            ======================================
            TARGET POSITION
            ======================================
            */

            const targetPosition =
                targetSection.offsetTop - headerHeight - 10;

            /*
            ======================================
            SMOOTH SCROLL
            ======================================
            */

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });

    /*
    ==========================================
    ACTIVE NAVIGATION LINK
    ==========================================
    */

    const sections =
        document.querySelectorAll("section");

    function updateActiveLink() {

        const header =
            document.querySelector("header");

        const headerHeight =
            header.offsetHeight;

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop -
                headerHeight -
                50;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {
                currentSection =
                    section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {
                link.classList.add("active");
            }

        });

    }

    /*
    ==========================================
    NAVBAR BORDER EFFECT
    ==========================================
    */

    const header =
        document.querySelector("header");

    function handleNavbarScroll() {

        if (window.scrollY > 10) {

            header.style.borderBottom =
                "1px solid #d9d9d9";

        } else {

            header.style.borderBottom =
                "1px solid #e5e5e5";

        }

    }

    /*
    ==========================================
    FOOTER YEAR
    ==========================================
    */

    const footerText =
        document.querySelector("footer p");

    if (footerText) {

        const currentYear =
            new Date().getFullYear();

        footerText.innerHTML =
            `&copy; ${currentYear} Swaraj Sodadasi. All Rights Reserved. Source code available under the MIT License.`;

    }

    /*
    ==========================================
    SCROLL EVENTS
    ==========================================
    */

    window.addEventListener("scroll", () => {

        updateActiveLink();
        handleNavbarScroll();

    });

    /*
    ==========================================
    INITIAL EXECUTION
    ==========================================
    */

    updateActiveLink();
    handleNavbarScroll();

});