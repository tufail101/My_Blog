const User = JSON.parse(localStorage.getItem("user"));
const createPost =document.getElementsByClassName("createPost")[0];
document.addEventListener("DOMContentLoaded", () => {
  // console.log(user);

  if (User) {
    document.getElementById("logout").style.display = "block";
    document.getElementById("login").style.display = "none";
    document.getElementById("signup").style.display = "none";
  } else {
    document.getElementById("logout").style.display = "none";
    document.getElementById("login").style.display = "block";
    document.getElementById("signup").style.display = "block";
  }
});

document.getElementById("logout").addEventListener("click", () => {
  showConfirm();
});
function showConfirm() {
  document.getElementById("customConfirm").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}

function confirmAction(isConfirmed) {
  if (isConfirmed) {
    let alrt = document.getElementById("constumAlert");
    localStorage.removeItem("user");
    alrt.style.display = "block";
    alrt.classList.remove("bg-red-200");
    alrt.classList.add("bg-green-200");
    alrt.innerHTML = `${User.name} Is Logged Out`;
    window.location.reload();

    setTimeout(() => {
      document.getElementById("constumAlert").style.display = "none";
    }, 2000);
  } else {
    let alrt = document.getElementById("constumAlert");
    alrt.style.display = "block";
    alrt.innerHTML = `Action canceled!`;

    setTimeout(() => {
      document.getElementById("constumAlert").style.display = "none";
    }, 2000);
  }
  document.getElementById("customConfirm").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

document.getElementById("btn-confirm").addEventListener("click", () => {
  confirmAction(true);
});
document.getElementById("btn-cancel").addEventListener("click", () => {
  confirmAction(false);
});
