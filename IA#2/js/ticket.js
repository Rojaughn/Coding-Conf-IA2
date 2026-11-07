const savedData = localStorage.getItem("codingConfAttendee");

if (!savedData) {
    
    window.location.href = "login.html";

} else {
 
    const attendee = JSON.parse(savedData);

    // Display  name
    document.getElementById("ticketName").textContent =
        attendee.name.split(" ")[0];

    document.getElementById("displayName").textContent =
        attendee.name;

    // Display email
    document.getElementById("displayEmail").textContent =
        attendee.email;

    // Display usernm
    document.getElementById("displayGithub").textContent =
        attendee.github;

    // Display avatr
    document.getElementById("ticketAvatar").src =
        attendee.avatar;

    // Display tik num
    document.getElementById("ticketNumber").textContent =
        "#" + attendee.ticketNumber;

}
