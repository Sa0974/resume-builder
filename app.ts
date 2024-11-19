import { jsPDF } from 'jspdf';  
// Select the menu icon and navigation links

const toggleButton = document.getElementById('toggle-button') as HTMLElement;  
const navLinks = document.getElementById('nav-links') as HTMLElement;  

toggleButton.addEventListener('click', () => {  
    navLinks.classList.toggle('active');  
});  





// slider.ts  

// Get all slide elements and track the current index  
const slides = document.querySelectorAll<HTMLDivElement>('.slide');  
let currentIndex = 0;  

// Function to show the slide at the given index  
function showSlide(index: number): void {  
    slides.forEach((slide) => {  
        slide.classList.remove('active');  
    });  
    slides[index].classList.add('active');  
}  

// Function to move to the next slide  
function nextSlide(): void {  
    currentIndex = (currentIndex + 1) % slides.length; // Loop back to 0  
    showSlide(currentIndex);  
}  

// Automatically switch slides every 3 seconds  
setInterval(nextSlide, 6000); // Change slides every 3 seconds  

// Show the first slide when the script loads  
showSlide(currentIndex);

window.onload = () => {  
    // Define types for the form data  
    interface ResumeData {  
        title: string;  
        name: string;  
        email: string;  
        phone: string;  
        age: number;  
        skills: string;  
        experience: string;  
        education: string;  
        image: string | null;  
    }  

    // Get elements from the DOM  
    const templateModal = document.getElementById('template-modal') as HTMLDivElement;  
    const resumeModal = document.getElementById('resume-modal') as HTMLDivElement;  
    const resumeForm = document.getElementById('resume-form') as HTMLFormElement;  
    const openFormButton = document.getElementById('open-form-btn') as HTMLButtonElement;  
    const closeTemplateBtn = document.getElementById('close-template-btn') as HTMLButtonElement;  
    const templateImages = document.querySelectorAll('.template-image') as NodeListOf<HTMLImageElement>;  

    let selectedTemplate: string | null = null;  

    // Show the template selection modal  
    const showTemplateModal = () => {  
        if (templateModal) templateModal.style.display = 'block';  
        if (resumeModal) resumeModal.style.display = 'none';  
    };  

    // Close the template modal  
    const closeTemplateModal = () => {  
        if (templateModal) templateModal.style.display = 'none';  
    };  

    // Show the resume form modal after selecting a template  
    const showResumeForm = () => {  
        if (selectedTemplate && resumeModal) {  
            resumeModal.style.display = 'block';  
            if (templateModal) templateModal.style.display = 'none';  
        }  
    };  

    // Event listener for showing the template modal on "Select Template" button click  
    if (openFormButton) {  
        openFormButton.addEventListener('click', showTemplateModal);  
    }  

    // Handle template selection  
    templateImages.forEach((image) => {  
        image.addEventListener('click', (event: MouseEvent) => {  
            const selected = (event.target as HTMLImageElement).dataset.template;  
            if (selected) {  
                selectedTemplate = selected;  
                showResumeForm();  
            }  
        });  
    });  

    // Handle form submission  
resumeForm.addEventListener('submit', (event: Event) => {  
    event.preventDefault();  

    // Access form elements safely  
    const titleInput = document.getElementById('title') as HTMLInputElement | null;  
    const nameInput = document.getElementById('name') as HTMLInputElement | null;  
    const emailInput = document.getElementById('email') as HTMLInputElement | null;  
    const phoneInput = document.getElementById('phone') as HTMLInputElement | null;  
    const ageInput = document.getElementById('age') as HTMLInputElement | null;  
    const skillsInput = document.getElementById('skills') as HTMLTextAreaElement | null;  
    const experienceInput = document.getElementById('experience') as HTMLTextAreaElement | null;  
    const educationInput = document.getElementById('education') as HTMLTextAreaElement | null;  
    const imageInput = document.getElementById('image') as HTMLInputElement | null;  

    // Reset error messages  
    document.querySelectorAll('.error-message').forEach((el) => {  
        el.textContent = '';  
    });  

    // Validate inputs  
    let valid = true;  

    // Check required fields with null checks  
    if (titleInput && titleInput.value.trim() === '') {  
        document.getElementById('titleError')!.textContent = 'Title is required.';  
        valid = false;  
    }  
    if (nameInput && nameInput.value.trim() === '') {  
        document.getElementById('nameError')!.textContent = 'Name is required.';  
        valid = false;  
    }  
    if (emailInput && emailInput.value.trim() === '') {  
        document.getElementById('emailError')!.textContent = 'Email is required.';  
        valid = false;  
    } else if (emailInput && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailInput.value)) {  
        document.getElementById('emailError')!.textContent = 'Please enter a valid email address.';  
        valid = false;  
    }  
    if (phoneInput && phoneInput.value.trim() === '') {  
        document.getElementById('phoneError')!.textContent = 'Phone number is required.';  
        valid = false;  
    }  
    if (ageInput && (ageInput.value.trim() === '' || parseInt(ageInput.value, 10) <= 0)) {  
        document.getElementById('ageError')!.textContent = 'Age must be a positive number.';  
        valid = false;  
    }  
    if (skillsInput && skillsInput.value.trim() === '') {  
        document.getElementById('skillsError')!.textContent = 'Skills are required.';  
        valid = false;  
    }  
    if (experienceInput && experienceInput.value.trim() === '') {  
        document.getElementById('experienceError')!.textContent = 'Experience details are required.';  
        valid = false;  
    }  
    if (educationInput && educationInput.value.trim() === '') {  
        document.getElementById('educationError')!.textContent = 'Education details are required.';  
        valid = false;  
    }  
    if (imageInput && imageInput.files?.length === 0) {  
        document.getElementById('imageError')!.textContent = 'Profile image is required.';  
        valid = false;  
    }  

    if (!valid) {  
        return; // Stop submission if there are validation errors  
    }  

    // All checks are done and inputs are safe to use now  
    const title = titleInput?.value.trim()|| '';  
    const name = nameInput?.value.trim() || '';  
    const email = emailInput?.value.trim() || '';  
    const phone = phoneInput?.value.trim() || '';  
    const age = Number(ageInput?.value);  
    const skills = skillsInput?.value.trim() || '';  
    const experience = experienceInput?.value.trim() || '';  
    const education = educationInput?.value.trim() || '';  
    
        // Safely handle image file input  
        let image: string | null = null;  

        if (imageInput && imageInput.files && imageInput.files[0]) {  
            const file = imageInput.files[0];  

            // Convert image to base64 string using FileReader  
            const reader = new FileReader();  
            reader.onloadend = () => {  
                image = reader.result as string; // This is the base64 image string  

                // Create resume data object  
                const resumeData: ResumeData = {  
                    title,  
                    name,  
                    email,  
                    phone,  
                    age,  
                    skills,  
                    experience,  
                    education,  
                    image  
                };  

                // Store form data in sessionStorage  
                sessionStorage.setItem('resumeData', JSON.stringify(resumeData));  

                // Validate template selection  
                if (!selectedTemplate) {  
                    alert('Please select a template first.');  
                    return;  
                }  

                // Open selected template in new window and send data  
                const resumeWindow = window.open(`templates/${selectedTemplate}`, '_blank');  
                if (resumeWindow) {  
                    resumeWindow.onload = () => {  
                        resumeWindow.postMessage(resumeData, '*');  
                    };  
                }  

                // Hide the resume modal after form submission  
                if (resumeModal) resumeModal.style.display = 'none';  
            };  
            reader.readAsDataURL(file); // Read file as base64 string  
        } else {  
            // If no image is selected, set the image as null  
            image = null;  
        }  
    });  

    // Close the template modal  
    if (closeTemplateBtn) {  
        closeTemplateBtn.addEventListener('click', closeTemplateModal);  
    }  
};  