"use strict";

// Select the menu icon and navigation links
var toggleButton = document.getElementById('toggle-button');
var navLinks = document.getElementById('nav-links');
toggleButton.addEventListener('click', function () {
    navLinks.classList.toggle('active');
});
// slider.ts  
// Get all slide elements and track the current index  
var slides = document.querySelectorAll('.slide');
var currentIndex = 0;
// Function to show the slide at the given index  
function showSlide(index) {
    slides.forEach(function (slide) {
        slide.classList.remove('active');
    });
    slides[index].classList.add('active');
}
// Function to move to the next slide  
function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length; // Loop back to 0  
    showSlide(currentIndex);
}
// Automatically switch slides every 3 seconds  
setInterval(nextSlide, 6000); // Change slides every 3 seconds  
// Show the first slide when the script loads  
showSlide(currentIndex);
window.onload = function () {
    // Get elements from the DOM  
    var templateModal = document.getElementById('template-modal');
    var resumeModal = document.getElementById('resume-modal');
    var resumeForm = document.getElementById('resume-form');
    var openFormButton = document.getElementById('open-form-btn');
    var closeTemplateBtn = document.getElementById('close-template-btn');
    var templateImages = document.querySelectorAll('.template-image');
    var selectedTemplate = null;
    // Show the template selection modal  
    var showTemplateModal = function () {
        if (templateModal)
            templateModal.style.display = 'block';
        if (resumeModal)
            resumeModal.style.display = 'none';
    };
    // Close the template modal  
    var closeTemplateModal = function () {
        if (templateModal)
            templateModal.style.display = 'none';
    };
    // Show the resume form modal after selecting a template  
    var showResumeForm = function () {
        if (selectedTemplate && resumeModal) {
            resumeModal.style.display = 'block';
            if (templateModal)
                templateModal.style.display = 'none';
        }
    };
    // Event listener for showing the template modal on "Select Template" button click  
    if (openFormButton) {
        openFormButton.addEventListener('click', showTemplateModal);
    }
    // Handle template selection  
    templateImages.forEach(function (image) {
        image.addEventListener('click', function (event) {
            var selected = event.target.dataset.template;
            if (selected) {
                selectedTemplate = selected;
                showResumeForm();
            }
        });
    });
    // Handle form submission  
    resumeForm.addEventListener('submit', function (event) {
        var _a;
        event.preventDefault();
        // Access form elements safely  
        var titleInput = document.getElementById('title');
        var nameInput = document.getElementById('name');
        var emailInput = document.getElementById('email');
        var phoneInput = document.getElementById('phone');
        var ageInput = document.getElementById('age');
        var skillsInput = document.getElementById('skills');
        var experienceInput = document.getElementById('experience');
        var educationInput = document.getElementById('education');
        var imageInput = document.getElementById('image');
        // Reset error messages  
        document.querySelectorAll('.error-message').forEach(function (el) {
            el.textContent = '';
        });
        // Validate inputs  
        var valid = true;
        // Check required fields with null checks  
        if (titleInput && titleInput.value.trim() === '') {
            document.getElementById('titleError').textContent = 'Title is required.';
            valid = false;
        }
        if (nameInput && nameInput.value.trim() === '') {
            document.getElementById('nameError').textContent = 'Name is required.';
            valid = false;
        }
        if (emailInput && emailInput.value.trim() === '') {
            document.getElementById('emailError').textContent = 'Email is required.';
            valid = false;
        }
        else if (emailInput && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailInput.value)) {
            document.getElementById('emailError').textContent = 'Please enter a valid email address.';
            valid = false;
        }
        if (phoneInput && phoneInput.value.trim() === '') {
            document.getElementById('phoneError').textContent = 'Phone number is required.';
            valid = false;
        }
        if (ageInput && (ageInput.value.trim() === '' || parseInt(ageInput.value, 10) <= 0)) {
            document.getElementById('ageError').textContent = 'Age must be a positive number.';
            valid = false;
        }
        if (skillsInput && skillsInput.value.trim() === '') {
            document.getElementById('skillsError').textContent = 'Skills are required.';
            valid = false;
        }
        if (experienceInput && experienceInput.value.trim() === '') {
            document.getElementById('experienceError').textContent = 'Experience details are required.';
            valid = false;
        }
        if (educationInput && educationInput.value.trim() === '') {
            document.getElementById('educationError').textContent = 'Education details are required.';
            valid = false;
        }
        if (imageInput && ((_a = imageInput.files) === null || _a === void 0 ? void 0 : _a.length) === 0) {
            document.getElementById('imageError').textContent = 'Profile image is required.';
            valid = false;
        }
        if (!valid) {
            return; // Stop submission if there are validation errors  
        }
        // All checks are done and inputs are safe to use now  
        var title = (titleInput === null || titleInput === void 0 ? void 0 : titleInput.value.trim()) || '';
        var name = (nameInput === null || nameInput === void 0 ? void 0 : nameInput.value.trim()) || '';
        var email = (emailInput === null || emailInput === void 0 ? void 0 : emailInput.value.trim()) || '';
        var phone = (phoneInput === null || phoneInput === void 0 ? void 0 : phoneInput.value.trim()) || '';
        var age = Number(ageInput === null || ageInput === void 0 ? void 0 : ageInput.value);
        var skills = (skillsInput === null || skillsInput === void 0 ? void 0 : skillsInput.value.trim()) || '';
        var experience = (experienceInput === null || experienceInput === void 0 ? void 0 : experienceInput.value.trim()) || '';
        var education = (educationInput === null || educationInput === void 0 ? void 0 : educationInput.value.trim()) || '';
        // Safely handle image file input  
        var image = null;
        if (imageInput && imageInput.files && imageInput.files[0]) {
            var file = imageInput.files[0];
            // Convert image to base64 string using FileReader  
            var reader_1 = new FileReader();
            reader_1.onloadend = function () {
                image = reader_1.result; // This is the base64 image string  
                // Create resume data object  
                var resumeData = {
                    title: title,
                    name: name,
                    email: email,
                    phone: phone,
                    age: age,
                    skills: skills,
                    experience: experience,
                    education: education,
                    image: image
                };
                // Store form data in sessionStorage  
                sessionStorage.setItem('resumeData', JSON.stringify(resumeData));
                // Validate template selection  
                if (!selectedTemplate) {
                    alert('Please select a template first.');
                    return;
                }
                // Open selected template in new window and send data  
                var resumeWindow = window.open("templates/".concat(selectedTemplate), '_blank');
                if (resumeWindow) {
                    resumeWindow.onload = function () {
                        resumeWindow.postMessage(resumeData, '*');
                    };
                }
                // Hide the resume modal after form submission  
                if (resumeModal)
                    resumeModal.style.display = 'none';
            };
            reader_1.readAsDataURL(file); // Read file as base64 string  
        }
        else {
            // If no image is selected, set the image as null  
            image = null;
        }
    });
    // Close the template modal  
    if (closeTemplateBtn) {
        closeTemplateBtn.addEventListener('click', closeTemplateModal);
    }
};
