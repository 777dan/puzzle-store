document.onreadystatechange = function () {
  let state = document.readyState;
  if (state == "interactive") {
    document.getElementById("contents").style.display = "none";
    // document.getElementById("contents").style.visibility = "hidden";
    document.getElementById("load").style.visibility = "visible";
  } else if (state == "complete") {
    setTimeout(function () {
      document.getElementById("load").style.visibility = "hidden";
      document.getElementById("contents").style.display = "block";
    }, 2000);
  }
};


$(document).ready(function () {
  $.getJSON("puzzles.json", function (puzzArr) {
    for (let i = 0; i < puzzArr.length; i++) {
      $("#puzzles-section").append(`
      <div class='col-3 my-3'>
        <div class="card-header card-img">
            <img class="col-12" src='${puzzArr[i].img}' alt=''>
        </div>
        <div class="card-body">${puzzArr[i].name}</div>
        <div class="card-footer">${puzzArr[i].price}$</div>
      </div>`);
    }
  }).done(function () {
    $(".card-img").click(function () {
      console.log($(this));
    });
  });
});
