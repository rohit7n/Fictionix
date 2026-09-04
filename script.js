/* =========================================================
   FICTIONIX
   Lightweight Interaction & Motion
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       HEADER — SCROLL STATE
       ===================================================== */

    const header = document.querySelector(".site-header");

    const updateHeader = () => {
        if (!header) return;

        header.classList.toggle(
            "scrolled",
            window.scrollY > 35
        );
    };

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) return;

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);
                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -50px 0px"
                }
            );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });
    }


    /* =====================================================
       SMOOTH INTERNAL NAVIGATION
       ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    internalLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            /*
             * Keep the URL useful without
             * causing an instant jump.
             */
            history.pushState(
                null,
                "",
                targetId
            );
        });
    });


    /* =====================================================
       NOTICE SYSTEM
       ===================================================== */

    const notice =
        document.querySelector(".notice");

    let noticeTimer = null;

    window.showNotice = function (
        message,
        duration = 3200
    ) {

        if (!notice) return;

        notice.textContent = message;

        notice.classList.add("show");

        clearTimeout(noticeTimer);

        noticeTimer = setTimeout(() => {

            notice.classList.remove("show");

        }, duration);
    };


    /* =====================================================
       COPY EMAIL
       ===================================================== */

    const emailLink =
        document.querySelector(".contact-email");

    if (emailLink) {

        emailLink.addEventListener(
            "contextmenu",
            event => {

                /*
                 * Normal email links remain usable.
                 * This intentionally does nothing.
                 */
            }
        );
    }


    /* =====================================================
       STORY CARD MICRO-INTERACTION
       ===================================================== */

    const cards =
        document.querySelectorAll(".story-card");

    const supportsHover =
        window.matchMedia(
            "(hover: hover)"
        ).matches;

    if (supportsHover) {

        cards.forEach(card => {

            card.addEventListener(
                "pointermove",
                event => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX - rect.left;

                    const y =
                        event.clientY - rect.top;

                    const percentX =
                        (x / rect.width) * 100;

                    const percentY =
                        (y / rect.height) * 100;

                    card.style.setProperty(
                        "--mouse-x",
                        `${percentX}%`
                    );

                    card.style.setProperty(
                        "--mouse-y",
                        `${percentY}%`
                    );
                }
            );

            card.addEventListener(
                "pointerleave",
                () => {

                    card.style.removeProperty(
                        "--mouse-x"
                    );

                    card.style.removeProperty(
                        "--mouse-y"
                    );
                }
            );
        });
    }


    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            '.nav-links a[href^="#"]'
        );

    if (
        sections.length &&
        navLinks.length &&
        "IntersectionObserver" in window
    ) {

        const sectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        const id =
                            entry.target.id;

                        navLinks.forEach(link => {

                            const isActive =
                                link.getAttribute("href") ===
                                `#${id}`;

                            link.classList.toggle(
                                "active",
                                isActive
                            );
                        });

                    });

                },
                {
                    threshold: 0.25,
                    rootMargin:
                        "-20% 0px -60% 0px"
                }
            );

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }


    /* =====================================================
       PAGE LOAD
       ===================================================== */

    document.documentElement.classList.add(
        "js-ready"
    );


    /* =====================================================
       BACK / FORWARD SUPPORT
       ===================================================== */

    window.addEventListener(
        "popstate",
        () => {

            const hash =
                window.location.hash;

            if (!hash) return;

            const target =
                document.querySelector(hash);

            if (!target) return;

            setTimeout(() => {

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }, 50);
        }
    );

});
