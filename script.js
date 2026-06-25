// ===============================
// Customer Feedback - GitHub Demo
// ===============================
let selectedRating = "";
let selectedEmoji = "";
// Rating text
const ratings = {
    1: { emoji: "😡", text: "Bad" },
    2: { emoji: "😐", text: "Average" },
    3: { emoji: "🤩", text: "Excellent" }
};
// Select Emoji
document.querySelectorAll(".emoji").forEach(function (emoji) {
    emoji.addEventListener("click", function () {
        document.querySelectorAll(".emoji").forEach(function (e) {
            e.classList.remove("selected");
        });
        this.classList.add("selected");
        selectedRating = this.dataset.rating;
        selectedEmoji = ratings[selectedRating].emoji;
        document.getElementById("ratingText").innerHTML =
            selectedEmoji + " " + ratings[selectedRating].text;
    });
});
// Submit
document.getElementById("submitBtn").addEventListener("click", function () {
    let orderNo = document.getElementById("orderNo").value.trim();
    let experience = document.getElementById("experience").value.trim();
    let improve = document.getElementById("improve").value.trim();
    if (orderNo === "") {
        alert("Please enter Order Number.");
        return;
    }
    if (selectedRating === "") {
        alert("Please select a rating.");
        return;
    }
    // Create feedback object
    const feedback = {
        orderNumber: orderNo,
        rating: ratings[selectedRating].text,
        emoji: selectedEmoji,
        experience: experience,
        improvement: improve,
        submittedOn: new Date().toLocaleString()
    };
    // Save in browser
    let data = JSON.parse(localStorage.getItem("feedbackData")) || [];
    data.push(feedback);
    localStorage.setItem("feedbackData", JSON.stringify(data));
    // Download txt file
    let txt =
`-----------------------------------------
JAI KAPEES INFRACON PVT LTD

Customer Feedback
-----------------------------------------
Order Number : ${feedback.orderNumber}
Rating : ${feedback.emoji} ${feedback.rating}
Experience : ${feedback.experience}
Improvement : ${feedback.improvement}
Submitted On : ${feedback.submittedOn}
-----------------------------------------
`;
    const blob = new Blob([txt], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "feedback.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    // Thank you screen
    document.querySelector(".container").innerHTML = `
<div class="success">
<h1>🎉</h1>
<h2>Thank You!</h2>
<p>
Your feedback has been submitted successfully.
</p>
<br>
<h3>
❤️ Team JAI KAPEES INFRACON 
</h3>
</div>
`;

});
