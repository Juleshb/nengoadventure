'use strict';

/**
 * navbar toggle
 */
const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

const navToggleEvent = function (elem) {
  for (let i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", function () {
      navbar.classList.toggle("active");
      overlay.classList.toggle("active");
    });
  }
}

navToggleEvent(navElemArr);
navToggleEvent(navLinks);

/**
 * header sticky & go to top
 */
const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 200) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }
});

/**
 * form validation and submission
 */
// Initialize EmailJS with your user ID
emailjs.init("1h6oZ5_95pg096vaM");

// Validate form fields
function validateForm() {
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const date = document.getElementById("date").value;
  const today = new Date().toISOString().split('T')[0];

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[0-9]{10}$/;

  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return false;
  }

  if (!phonePattern.test(phone)) {
    alert("Please enter a valid 10-digit phone number.");
    return false;
  }

  if (date < today) {
    alert("The booking date cannot be in the past.");
    return false;
  }

  return true;
}

// Handle form submission
document.getElementById("booking-form").addEventListener("submit", function(event) {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  const serviceID = "service_984wnr3";
  const templateID = "template_1m1foiq";
  
  // Collect form data
  const formData = {
    firstname: document.getElementById("firstname").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    date: document.getElementById("date").value,
    group_size: document.getElementById("group-size").value,
    message: document.getElementById("message").value
  };
  
  // Send email using EmailJS
  emailjs.send(serviceID, templateID, formData)
    .then(response => {
      alert("Booking request sent successfully!");
      document.getElementById("booking-form").reset();
    })
    .catch(error => {
      alert("Failed to send booking request. Please try again.");
      console.error("EmailJS error:", error);
    });
    
});
