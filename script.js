(() => {
  "use strict";

  const header = document.querySelector("#siteHeader");
  const menuButton = document.querySelector(".menu-button");
  const mobileNav = document.querySelector("#mobileNav");
  const year = document.querySelector("#year");

  const setMenuState = (open) => {
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Menu sluiten" : "Menu openen");
    mobileNav.hidden = !open;
    document.body.classList.toggle("menu-open", open);
  };

  menuButton.addEventListener("click", () => {
    setMenuState(menuButton.getAttribute("aria-expanded") !== "true");
  });

  mobileNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenuState(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) setMenuState(false);
  }, { passive: true });

  const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 18);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  year.textContent = String(new Date().getFullYear());

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -48px" });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("visible"));
  }
})();
