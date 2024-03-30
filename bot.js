const phrases = {
    "Hello": "Hi! How can I help you?",
    "Bye": "Bye!",
    "I want to buy puzzles": "Great! You can find a large assortment of puzzles on our website",
    "I want to know more detailed information": "For more details please call +380249294389",
    "Connect me with the manager": "Our manager will call you back soon!",
    "What puzzles would you recommend?": "If you are an expert, then choose large puzzles",
    "Thanks": "Happy to help",
    "Do you have children's puzzles?": "We can make to order",
    "Do you have sets of 2000 puzzles?": "Yes, you can find them on our website"
}

// const hello = "Hello!";

$("h1").css("color", "blue");

$("#chatbot").click(function () {
    $(this).toggleClass("showChat");
});

// $("#answers").append(`<div class="bot_answ">${hello}</div>`);

$("#answers").click(function () {
    return false;
});

$("#question").click(function () {
    return false;
});

let audio = new Audio('./sounds/forest.mp3');

$("#turn-on-sounds").click(function () {
    audio.play();
    $(this).hide();
    $("#turn-off-sounds").show();
    $("#answers").append(`<div class="human_answ">Turn off the sounds of the forest</div>`);
    $("#answers").append(`<div class="bot_answ">Okay</div>`);
    return false;
});

$("#turn-off-sounds").click(function () {
    audio.pause();
    audio.currentTime = 0;
    $(this).hide();
    $("#turn-on-sounds").show();
    $("#answers").append(`<div class="human_answ">Turn on the sounds of the forest</div>`);
    $("#answers").append(`<div class="bot_answ">Okay</div>`);
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