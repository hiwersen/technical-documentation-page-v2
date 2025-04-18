window.addEventListener("load", () => {
  const header = document.querySelector("header");
  const footer = document.querySelector("footer");
  const sections = document.querySelectorAll("section");
  const navBar = document.querySelector(".navbar");
  const navbarLabel = document.querySelector(".navbar-label");
  const sectionInView = document.querySelector(".section-in-view");
  const navLinksContainer = document.querySelector(".nav-links-container");
  const navLinks = document.querySelector(".nav-links");
  const navLinksList = document.querySelectorAll(".nav-link");
  const hambMenu = document.querySelector(".hamb-menu");
  const elementsWillAnimate = document.querySelectorAll(".will-animate");

  let lastY = 0;

  function navbarMenuOnly() {
    navBar.classList.add("menu-only");
    navbarLabel.classList.add("hide");
    sectionInView.classList.add("hide");
    navLinksContainer.classList.add("hide");
  }

  function navbarMiniForm() {
    navBar.classList.remove("menu-only");
    navbarLabel.classList.remove("hide");
    sectionInView.classList.remove("hide");
    navLinksContainer.classList.remove("hide");
  }

  function willAnimate(elements, offsetTop, offsetBottom) {
    const viewTop = scrollY + offsetTop;
    const viewBottom = scrollY + window.innerHeight - offsetBottom;

    elements.forEach((elem) => {
      const rect = elem.getBoundingClientRect();
      const top = scrollY + rect.top;
      const bottom = top + rect.height;

      const isInView = bottom > viewTop && top < viewBottom;
      const isActive = elem.classList.contains("active");

      /*
      if (elem.getAttribute("id") === "styling") {
        console.log("isInView:", isInView, "isActive:", isActive);
        console.log("top:", top, "bottom:", bottom);
        console.log("viewTop:", viewTop, "viewBottom:", viewBottom);
        console.log("--------------------------");
      }
        */

      if (isInView && !isActive) {
        elem.classList.add("active");
      } else if (!isInView && isActive) {
        elem.classList.remove("active");

        if (elem.classList.contains("card")) console.log(elem);
      }
    });
  }

  willAnimate(elementsWillAnimate, -200, -200);

  window.addEventListener("scroll", () => {
    willAnimate(elementsWillAnimate, -200, -200);

    let sectionInViewID = "";
    const sectionNames = {
      introduction: "Introduction",
      prerequisites: "Prerequisites",
      design: "Design",
      the_form_element: "The Form",
      the_label_input_and_textarea_elements: "Label |Input |Textarea",
      the_button_element: "The Button",
      styling: "Styling",
      submitting_data: "Submitting Data",
    };

    // Show header as mini-form field when scroll is at header or footer
    if (
      scrollY <= header.offsetTop + header.offsetHeight ||
      scrollY >= footer.offsetTop - window.innerHeight
    ) {
      navbarMiniForm();
    } else if (
      // Don't change header while menu is open and
      // Exclude minor scroll changes to avoid flickering
      !navLinks.classList.contains("active") &&
      Math.abs(scrollY - lastY) > 1
    ) {
      if (scrollY > lastY) {
        navbarMenuOnly();
      } else {
        navbarMiniForm();
      }
    }

    lastY = scrollY;

    const viewportTop = scrollY;
    const viewportBottom = scrollY + window.innerHeight;
    const viewportMiddle = viewportTop + window.innerHeight / 2;

    sections.forEach((section) => {
      const margin = 80;
      const rect =
        section.getBoundingClientRect(); /* ! Don't use offsetHeight */
      const sectionTop = scrollY + rect.top;
      const sectionBottom = sectionTop + rect.height;

      const isInView = [
        !sectionInViewID,
        sectionTop - margin < viewportBottom,
        sectionBottom + margin > viewportTop,
      ];

      if (isInView.every((test) => test)) {
        sectionInViewID = section.getAttribute("id");
      }
    });

    sectionInView.textContent = sectionNames[sectionInViewID];

    navLinksList.forEach((link) => {
      link.getAttribute("href") === "#" + sectionInViewID
        ? link.classList.add("view")
        : link.classList.remove("view");
    });
  });

  hambMenu.addEventListener("click", (event) => {
    event.stopPropagation();
    navLinks.classList.toggle("active");
    hambMenu.classList.toggle("close");

    if (navLinks.classList.contains("active")) {
      navLinksContainer.classList.remove("hide");
      navbarLabel.classList.remove("hide");
    } else {
      navLinksContainer.classList.add("hide");

      if (navBar.classList.contains("menu-only")) {
        navbarLabel.classList.add("hide");
      }
    }
  });

  window.addEventListener("click", () => {
    if (hambMenu.classList.contains("close")) {
      hambMenu.classList.remove("close");
      navLinks.classList.remove("active");
    }

    if (navLinks.classList.contains("active")) {
      navLinksContainer.classList.remove("hide");
    } else {
      navLinksContainer.classList.add("hide");
      if (navBar.classList.contains("menu-only")) {
        navbarLabel.classList.add("hide");
      }
    }
  });

  document.querySelector("form").onsubmit = (e) => {
    e.preventDefault();
    const [name, email, message] = [
      e.target.user_name,
      e.target.user_email,
      e.target.user_message,
    ];

    if (!name.value || !email.value || !message.value) {
      window.alert("All fields need to be filled out!");
      return;
    }

    [name.value, email.value, message.value] = ["", "", ""];

    window.alert("Your message was sent!");
  };
});
