// ===============================
// JAI KAPEES INFRACON
// Customer Feedback System
// ===============================
window.onload = function () {
    let selectedRating = "";
    let selectedEmoji = "";
    // Rating Mapping
    const ratings = {
        1: {emoji: "🤩",text: "Excellent"},
        2: {emoji: "😐",text: "Average"},
        3: {emoji: "😡",text: "Bad"}
    };
    // Make variables available globally
    window.selectedRating = selectedRating;
    window.selectedEmoji = selectedEmoji;
    // --------------------
    // Emoji Selection
    // --------------------
    document.querySelectorAll(".emoji").forEach(function (emoji) {
        emoji.addEventListener("click", function () {
            document.querySelectorAll(".emoji").forEach(function (e) {
                e.classList.remove("selected");
            });
            this.classList.add("selected");
            window.selectedRating = this.dataset.rating;
            window.selectedEmoji =
                ratings[window.selectedRating].emoji;
            document.getElementById("ratingText").innerHTML =
                window.selectedEmoji +
                " " +
                ratings[window.selectedRating].text;
        });
    });
    // --------------------
    // Submit Feedback
    // --------------------
    document.getElementById("submitBtn")
        .addEventListener("click", function () {
            let orderNo =
                document.getElementById("orderNo")
                    .value
                    .trim()
                    .toUpperCase();
            let experience =
                document.getElementById("experience")
                    .value
                    .trim();
            let improve =
                document.getElementById("improve")
                    .value
                    .trim();
            if (orderNo === "") {alert("Please enter Order Number.");
                return;
            }
            if (!window.selectedRating) {alert("Please select a rating.");
                return;
            }
            const feedback = {
                orderNumber: orderNo,
                rating: ratings[window.selectedRating].text,
                emoji: ratings[window.selectedRating].emoji,
                experience: experience,
                improvement: improve,
                submittedOn: new Date().toLocaleString()
            };
            // Save Data
            let data =
                JSON.parse(
                    localStorage.getItem("feedbackData")
                ) || [];
            data.push(feedback);
            localStorage.setItem(
                "feedbackData",
                JSON.stringify(data)
            );
            // Generate TXT File
            let txt =
`=================================================
JAI KAPEES INFRACON PVT LTD
CUSTOMER FEEDBACK
=================================================
Order Number : ${feedback.orderNumber}
Rating : ${feedback.emoji} ${feedback.rating}
Liked About Service :${feedback.experience}
Improvement Suggestions :${feedback.improvement}
Submitted On :${feedback.submittedOn}
=================================================
`;
            const blob =
                new Blob(
                    [txt],
                    { type: "text/plain" }
                );
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "Feedback_" + feedback.orderNumber + ".txt";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            // Thank You Screen
            document.querySelector(".container").innerHTML =
`
<div class="success">
<h1>🎉</h1>
<h2>Thank You!</h2>
<p>
Your feedback has been submitted successfully.
</p>
<br>
<p>
Order Number:
<b>${feedback.orderNumber}</b>
</p>
<br>
<h3>
❤️ Team JAI KAPEES INFRACON
</h3>
</div>
`;
        });
};
// --------------------
// Verify Order Number
// --------------------
function verifyOrder() {
    let orderNo =
        document.getElementById("orderNo")
            .value
            .trim()
            .toUpperCase();
    if (orderNo === "") {
        alert("Please enter Order Number.");
        return;
    }
    let feedbackData =
        JSON.parse(
            localStorage.getItem("feedbackData")
        ) || [];
    let alreadySubmitted =
        feedbackData.some(function (item) {
            return item.orderNumber === orderNo;
        });
    if (alreadySubmitted) {
        alert(
            "You have already submitted feedback for this Order Number."
        );
        return;
    }
    document.getElementById("step1").style.display = "none";
    document.getElementById("step2").style.display = "block";
}
