(() => {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  const form = document.querySelector("[data-form]");
  const thanks = document.querySelector("[data-thanks]");
  const tabs = document.querySelectorAll("[data-day-tab]");
  const table = document.querySelector("[data-schedule]");
  const scheduleBlock = document.querySelector("[data-schedule-block]");
  const label = toggle.querySelector(".sr-only");

  const setMenu = (open) => {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    label.textContent = open ? "Zatvori meni" : "Otvori meni";
    document.body.classList.toggle("nav-open", open);
  };

  toggle.addEventListener("click", () => {
    setMenu(!nav.classList.contains("is-open"));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });

  const desktop = window.matchMedia("(min-width: 900px)");
  desktop.addEventListener("change", (event) => {
    if (event.matches) setMenu(false);
  });

  const onScroll = () => {
    header.classList.toggle("is-stuck", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const day = tab.dataset.dayTab;
      tabs.forEach((item) => {
        const selected = item === tab;
        item.setAttribute("aria-selected", selected ? "true" : "false");
      });
      table.dataset.filter = day;
      scheduleBlock.classList.toggle("is-one-day", day !== "svi");
    });
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in"));
  }

  const nameSlot = thanks.querySelector("[data-thanks-name]");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const first = form.elements.ime.value.trim().split(/\s+/)[0];
    form.hidden = true;
    thanks.hidden = false;
    nameSlot.textContent = first;
    thanks.focus();
  });

  thanks.querySelector("[data-form-reset]").addEventListener("click", () => {
    form.reset();
    thanks.hidden = true;
    form.hidden = false;
    form.querySelector("input").focus();
  });
})();
