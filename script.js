
/* ================= SAFE INIT ================= */
document.addEventListener("DOMContentLoaded", () => {

    const header = document.querySelector("header");
    const navCards = document.querySelectorAll(".nav-card");
    const sections = document.querySelectorAll("section");
	
	const calendarSection = document.getElementById("calendar");

	    if (!calendarSection) return;

	    // Optional: lazy loading effect
	    const observer = new IntersectionObserver((entries) => {
	        entries.forEach(entry => {
	            if (entry.isIntersecting) {
	                const iframe = entry.target.querySelector("iframe");
	                if (iframe && !iframe.src) {
	                    iframe.src = iframe.dataset.src;
	                }
	            }
	        });
	    });

	    observer.observe(calendarSection);

    /* ================= NAVIGATION CLICK ================= */
    navCards.forEach(card => {
        card.addEventListener("click", () => {
            const targetId = card.getAttribute("data-target");
            const target = document.getElementById(targetId);

            if (!target) return;

            const headerOffset = header ? header.offsetHeight : 0;
            const position = target.offsetTop - headerOffset - 8;

            window.scrollTo({
                top: position,
                behavior: "smooth"
            });
        });
    });


    /* ================= ACTIVE NAV STATE ================= */
    function updateActiveNav() {
        let current = "";

        sections.forEach(section => {
            const top = section.offsetTop - 120;
            const bottom = top + section.offsetHeight;

            if (window.scrollY >= top && window.scrollY < bottom) {
                current = section.id;
            }
        });

        navCards.forEach(card => {
            card.classList.remove("active");

            if (card.getAttribute("data-target") === current) {
                card.classList.add("active");
            }
        });
    }


    /* ================= SCROLL HANDLING (OPTIMIZED) ================= */
    let ticking = false;

    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    });


    /* ================= INITIAL ACTIVE STATE ================= */
    updateActiveNav();


    /* ================= OPTIONAL: URL HASH SUPPORT ================= */
    // If user opens link like #projects, scroll correctly
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            const headerOffset = header ? header.offsetHeight : 0;
            const position = target.offsetTop - headerOffset - 8;

            window.scrollTo({
                top: position
            });
        }
    }

});