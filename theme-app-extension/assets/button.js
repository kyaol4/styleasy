window.addEventListener('DOMContentLoaded', () => {
   var button = document.getElementById("ARbutton");
   var x = document.getElementById("AR");
   var ep = document.getElementById("explain")
   console.log(button, x)
   button.addEventListener('click', (event)=>{
     console.log('check')
      if (x.style.display === "none") {
      x.style.display = "block";
      ep.style.display = "block";
    } else {
      x.style.display = "none";
      ep.style.display = "none";
    }
  })
});
