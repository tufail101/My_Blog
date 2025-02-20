document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const message = document.getElementById("message");
  form.addEventListener("submit", async(e) => {
    e.preventDefault();
    let name = document.getElementById("Name").value;
    let userName = document.getElementById("userName").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let ConfirmPassword = document.getElementById("ConfirmPassword").value;

    if (password !== ConfirmPassword) {
      message.innerHTML = "Password Are Not Matched";
      message.style.color = "red";
    } else {
      message.innerHTML = "";
      try{
        let response = await fetch("http://localhost:3000/signup",{
            method : "POST",
            headers : { "Content-Type": "application/json" },
            body : JSON.stringify({name,userName,email,password})
        })
        let data = await response.json();
        if (response.ok) {
            message.innerText = "Login Successful!";
            message.style.color = "green";
            console.log("User Info:", data);
            setTimeout(()=>{

                window.location.href = "../pages/login.html";
            },1000);
        } else {
            message.innerText = data.error;
            message.style.color = "red";
            return;
        }
      }catch(err){
        console.log(err);
        message.innerText = "Something went wrong!";
        message.style.color = "red";
        
      }
    }
  });
});
