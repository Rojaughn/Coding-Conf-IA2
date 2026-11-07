const form = document.getElementById("registration-form");

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const github = document.getElementById("github");
const avatar = document.getElementById("avatar");

const formStatus = document.getElementById("formStatus");


function isValidEmail(emailAddress) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(emailAddress);
}

function showError(input, messageId, message) {
    document.getElementById(messageId).textContent = message;

    input.setAttribute("aria-invalid", "true");
}


function clearError(input, messageId) {
    document.getElementById(messageId).textContent = "";

    input.removeAttribute("aria-invalid");
}

avatar.addEventListener("change", function () {

    const file = avatar.files[0];

    if (!file) {
        document.getElementById("uploadCopy").textContent =
            "Drag and drop or click to upload";

        return;
    }

    document.getElementById("uploadCopy").textContent = file.name;
});


form.addEventListener("submit", function (event) {

    // Stop the form from submitting automatically
    event.preventDefault();

    let isValid = true;

    clearError(fullName, "nameError");
    clearError(email, "emailError");
    clearError(github, "githubError");
    clearError(avatar, "avatarError");

    formStatus.textContent = "";

    if (fullName.value.trim().length < 2) {

        showError(
            fullName,
            "nameError",
            "Please enter your full name."
        );

        isValid = false;
    }

    if (!isValidEmail(email.value.trim())) {

        showError(
            email,
            "emailError",
            "Please enter a valid email address."
        );

        isValid = false;
    }

    const githubPattern = /^@[a-zA-Z0-9-]{1,39}$/;

    if (!githubPattern.test(github.value.trim())) {

        showError(
            github,
            "githubError",
            "Enter a valid GitHub username starting with @."
        );

        isValid = false;
    }

    const selectedFile = avatar.files[0];

    if (!selectedFile) {

        showError(
            avatar,
            "avatarError",
            "Please upload an avatar."
        );

        isValid = false;

    } else {

        const allowedTypes = ["image/jpeg", "image/png"];

        if (!allowedTypes.includes(selectedFile.type)) {

            showError(
                avatar,
                "avatarError",
                "Only JPG and PNG images are allowed."
            );

            isValid = false;

        } else if (selectedFile.size > 500 * 1024) {

            showError(
                avatar,
                "avatarError",
                "Your image must be smaller than 500KB."
            );

            isValid = false;
        }
    }

    if (!isValid) {
        formStatus.textContent =
            "Please correct the errors above.";

        return;
    }

    const reader = new FileReader();

    reader.onload = function () {

        const attendee = {
            name: fullName.value.trim(),
            email: email.value.trim(),
            github: github.value.trim(),
            avatar: reader.result,
            ticketNumber: Math.floor(100000 + Math.random() * 900000)
        };

        localStorage.setItem(
            "codingConfAttendee",
            JSON.stringify(attendee)
        );

        window.location.href = "ticket.html";
    };

    reader.onerror = function () {
        formStatus.textContent =
            "There was a problem reading your image. Please try again.";
    };

    reader.readAsDataURL(selectedFile);

});
