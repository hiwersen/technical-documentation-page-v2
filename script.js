window.addEventListener("load", () => {
  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section");
    const sectionInView = document.querySelector(".section-in-view");
    const navLinks = document.querySelectorAll(".nav-link");
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

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (scrollY > sectionTop - 64)
        sectionInViewID = section.getAttribute("id");
    });

    sectionInView.textContent = sectionNames[sectionInViewID];

    navLinks.forEach((link) => {
      link.getAttribute("href") === "#" + sectionInViewID
        ? link.classList.add("view")
        : link.classList.remove("view");
    });
  });
});

document.querySelector(".hamb-menu").addEventListener("click", () => {
  document.querySelector(".nav-links").classList.toggle("active");
  document.querySelector(".hamb-menu").classList.toggle("close");
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
