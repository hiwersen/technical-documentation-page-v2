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
  const parallaxWrapper = document.getElementById("parallax-wrapper");
  const content2 = document.getElementById("container-content2");
  const content3 = document.getElementById("container-content3");

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

  function willAnimate(elements) {
    const offsetTop = -200;
    const offsetBottom = 0;
    const viewTop = scrollY + offsetTop;
    const viewBottom = scrollY + window.innerHeight - offsetBottom;

    elements.forEach((elem) => {
      const rect = elem.getBoundingClientRect();
      const top = scrollY + rect.top;
      const bottom = top + rect.height;

      const isActive = elem.classList.contains("active");
      const isInView = bottom > viewTop && top < viewBottom;
      const isFarFromView = bottom > viewTop - 500 && top < viewBottom + 500;

      if (isInView && !isActive) {
        elem.classList.add("active");
      } else if (top > viewBottom && !isFarFromView && isActive) {
        elem.classList.remove("active");
      }
    });
  }

  function parallax() {
    const content2Height = parseInt(content2.getBoundingClientRect().height);
    const content3Height = parseInt(content3.getBoundingClientRect().height);
    const content2Top = parseInt(content2.getBoundingClientRect().top);
    const content3Top = parseInt(content3.getBoundingClientRect().top);

    parallaxWrapper.style.height = `${content2Height + content3Height}px`;

    if (content3Top - 400 < window.innerHeight) {
      content2.style.position = "sticky";
      content2.style.top = `${content2Top}px`;
    } else {
      content2.style.position = "relative";
      /* ! BUG: FIXED !!!!!!
       set top to empty string when position when position is relative !*/
      content2.style.top = "";
    }

    /*
    ! CONSOLE.LOG EVERYTHING!!!!
    console.log(
      "content2-",
      "rect-top:",
      content2Top,
      "css-top",
      content2.style.top,
      "position:",
      content2.style.position
    );
    */
  }

  willAnimate(elementsWillAnimate);

  window.addEventListener("scroll", () => {
    const viewportTop = scrollY;
    const viewportBottom = scrollY + window.innerHeight;

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

    lastY = scrollY;

    willAnimate(elementsWillAnimate);
    parallax();
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

  window.addEventListener("resize", () => {
    parallax();
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
