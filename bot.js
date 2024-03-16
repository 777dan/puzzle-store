const phrases = {
    "Hello": "How can I help you?",
    "Bye": "Bye!",
    "Do you like the weather today?": "Yes, sure! The weather is beautiful today!",
    "I want to know more detailed information": "For more details please call 123456789",
    "Connect me with the manager": "Our manager will call you back soon!"
}

const hello = "Hello!";

$("h1").css("color", "blue");

$("#chatbot").click(function () {
    $(this).toggleClass("showChat");
});

$("#answers").append(`<div class="bot_answ">${hello}</div>`);

$("#answers").click(function () {
    return false;
});

$("#question").click(function () {
    return false;
});

$("#ok").click(function () {
    let q = $("#question").val().trim();
    $("#question").val("");


    if (q !== "") {
        let answer = "";
        for (const key in phrases) {
            if (q === key) {
                answer = phrases[key];
            }
        }
        if (answer === "") {
            answer = "For more details please call 123456789";
        }
        $("#answers").append(`<div class="human_answ">${q}</div>`);
        setTimeout(function () {
            $("#answers").append(`<div class="bot_answ">${answer}</div>`);

            let chatbot = document.getElementById("chatbot");
            $("#chatbot").animate(
                { scrollTop: chatbot.scrollHeight - chatbot.clientHeight },
                100
            );
        }, 1000);
    }
    return false;
});

function enterKey(event) {
    if (event.keyCode == 13) {
        $("#ok").click();
        return false;
    }
}

$("#question").keypress("keyup", enterKey);