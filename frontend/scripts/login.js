document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("loginForm");
    const message = document.getElementById("message");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        let userName = document.getElementById("userName").value;
        let password = document.getElementById("password").value;

        try {
            let response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userName, password })
            });

            let data = await response.json();

            if (response.ok) {
                message.innerText = "Login Successful!";
                message.style.color = "green";
                console.log("User Info:", data.user);
                localStorage.setItem("user", JSON.stringify(data.user));

               
                window.location.href = "../index.html";
            } else {
                message.innerText = data.error;
                message.style.color = "red";
            }
        } catch (error) {
            console.error("Error:", error);
            message.innerText = "Something went wrong!";
            message.style.color = "red";
        }
    });
});
