document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");
  const message = document.getElementById("message");
  form.addEventListener("submit", async (e) => {
      e.preventDefault();

      console.log("Form submission prevented!");

      const name = document.getElementById("Name").value;
      const userName = document.getElementById("userName").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("ConfirmPassword").value;
      const image = document.getElementById("image").files[0];

      if (password !== confirmPassword) {
          message.innerHTML = "Passwords do not match";
          message.style.color = "red";
          return;
      }

      message.innerHTML = "";

      try {
          const formData = new FormData();
          formData.append("name", name);
          formData.append("userName", userName);
          formData.append("email", email);
          formData.append("password", password);
          formData.append("image", image);

          const response = await fetch("http://localhost:3000/signup", {
              method: "POST",
              body: formData
          });

          const data = await response.json();
          console.log("Server response:", data);

          if (response.ok) {
              message.innerText = "Sign up successful!";
              message.style.color = "green";
              
              
                  window.location.href = "../pages/login.html";
             
          } else {
              message.innerText = data.error || "Something went wrong!";
              message.style.color = "red";
          }
      } catch (error) {
          console.error("Error:", error);
          message.innerText = "An unexpected error occurred";
          message.style.color = "red";
      }
  });
});
