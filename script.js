window.addEventListener("load", () => {
  const sections = document.querySelectorAll("section");
  const navBar = document.querySelector(".navbar");
  const header = document.querySelector("header");
  const navbarLabel = document.querySelector(".navbar-label");
  const sectionInView = document.querySelector(".section-in-view");
  const navLinksContainer = document.querySelector(".nav-links-container");
  const navLinks = document.querySelector(".nav-links");
  const navLinksList = document.querySelectorAll(".nav-link");
  const hambMenu = document.querySelector(".hamb-menu");
  let lastY = null;

  window.addEventListener("scroll", () => {
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

    if (!navLinks.classList.contains("active")) {
      if (lastY && scrollY > lastY) {
        navbarLabel.classList.add("hide");
        sectionInView.classList.add("hide");
        navLinksContainer.classList.add("hide");
        navBar.classList.add("menu-only");
        header.classList.add("menu");
      } else {
        navbarLabel.classList.remove("hide");
        sectionInView.classList.remove("hide");
        navLinksContainer.classList.remove("hide");
        navBar.classList.remove("menu-only");
        header.classList.remove("menu");
      }
    }

    lastY = scrollY;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (scrollY > sectionTop - 64)
        sectionInViewID = section.getAttribute("id");
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
    } else {
      navLinksContainer.classList.add("hide");
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
