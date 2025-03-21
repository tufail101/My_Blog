document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("loginForm");
    const message = document.getElementById("message");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        let userName = document.getElementById("userName").value;
        let password = document.getElementById("password").value;

        try {
            let response = await fetch("https://my-blog-w41s.onrender.com/login", {
                method: "POST",
                // mode: 'no-cors',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userName, password })
            });

            let data = await response.json();

            if (response.ok) {
                message.innerText = "Login Successful!";
                message.style.color = "green";
                const user ={
                    userId:data.userId,
                    userName: data.userName,
                    name: data.name,
                    userEmail : data.userEmail
                };
                console.log("User Info:", user);
                localStorage.setItem("user", JSON.stringify(user));


               
                window.location.href = "../index.html";
            } else {
                message.innerText = data.message;
                message.style.color = "red";
            }
        } catch (error) {
            console.error("Error:", error);
            message.innerText = "Something went wrong!";
            message.style.color = "red";
        }
    });
});
