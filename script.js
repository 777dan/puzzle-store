document.onreadystatechange = function () {
    let state = document.readyState;
    if (state == "interactive") {
    //   document.getElementById("contents").style.visibility = "hidden";
      document.getElementById("load").style.visibility = "visible";
    } else if (state == "complete") {
      setTimeout(function () {
        document.getElementById("load").style.visibility = "hidden";
        // document.getElementById("contents").style.visibility = "visible";
      }, 2000);
    }
  };