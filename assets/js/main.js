document.getElementById("menu").addEventListener("click", function () {
  document.getElementById("nav-trigger").classList.toggle("open");
});

/*

document.addEventListener("DOMContentLoaded", function () {
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    prefersDark ? switchTo("dark") : switchTo("light")
});

function switchTo(theme) {
    const themeLink = document.querySelector("#theme-link");
    
    if (theme == "light") {
        themeLink.href = "/assets/css/light.css";
    } else {
        themeLink.href = "/assets/css/dark.css";
    }
}

window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', event => {
  if (event.matches) {
    switchTo("dark")
  } else {
    switchTo("light")
  }
})

*/