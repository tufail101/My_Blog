document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");
  const message = document.getElementById("message");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    

    const name = document.getElementById("Name").value;
    const userName = document.getElementById("userName").value;
    const email = document.getElementById("email").value;
    const sendOtpBtn = document.getElementById("sendOtpBtn");
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("ConfirmPassword").value;

    if (!email) {
      message.textContent = "Please enter your email!";
      message.classList.add("text-red-600");
      message.classList.remove("hidden");
      return;
    }
    sendOtpBtn.disabled = true;
    sendOtpBtn.textContent = "Sending...";

    message.innerHTML = "";

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("userName", userName);
      formData.append("email", email);

      const response = await fetch("https://my-blog-w41s.onrender.com/sendSignINOtp", {
        method: "POST",
        
        body: formData,
      });

      const data = await response.json();
      

      if (response.ok) {
        message.innerText = "OTP Send successful!";
        message.style.color = "green";
        message.classList.remove("hidden");
        document.getElementById("otpVerifyForm").style.display = "block";
        sessionStorage.setItem("serverOtp", data.otp);
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("userName", userName);
        sessionStorage.setItem("email", email);
      } else {
        message.innerText = data.error || "Something went wrong!";
        message.style.color = "red";
        message.classList.remove("hidden");
      }
    } catch (error) {
      console.error("Error:", error);
      message.innerText = "An unexpected error occurred";
      message.style.color = "red";
      message.classList.remove("hidden");
    }
  });
});

document
  .getElementById("otpVerifyForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const userOtp = document.getElementById("otp").value;
    const serverOtp = sessionStorage.getItem("serverOtp");
    const message = document.getElementById("message");
    if (!userOtp) {
      message.textContent = "Please enter your OTP!";
      message.classList.add("text-red-600");
      message.classList.remove("hidden");
      return;
    }
    if (userOtp === serverOtp) {
      message.textContent = "OTP verified successfully!";
      message.classList.add("text-green-600");
      message.classList.remove("hidden");
      setTimeout(() => {
        const passwordForm = document.getElementById("passwordForm");
        passwordForm.style.display = "block";
        passwordForm.addEventListener("submit", async (e) => {
          e.preventDefault();
          const name = sessionStorage.getItem("name");
          const userName = sessionStorage.getItem("userName");
          const email = sessionStorage.getItem("userName");
          const password = document.getElementById("password").value;
          const ConfirmPassword = document.getElementById("ConfirmPassword");
          const message = document.getElementById("message");
          if (!password) {
            message.textContent = "Please enter your password!";
            message.classList.add("text-red-600");
            message.classList.remove("hidden");
            return;
          }
          try {
            const response = await fetch("https://myblog-production-c5bb.up.railway.app/signIN", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name, userName, email, password }),
            });
            const data = response.json();
            if (response.ok) {
              message.textContent = "Sign Up SuccesFull";
              message.classList.add("text-green-600");
              message.classList.remove("hidden");
              setTimeout(() => {
                window.location.href = `../pages/login.html`;
              }, 2000);
            } else {
              message.textContent = data.message;
              message.classList.add("text-red-600");
              message.classList.remove("hidden");
            }
          } catch (error) {
            message.textContent = "Something went wrong. Please try again!";
            message.classList.add("text-red-600");
            message.classList.remove("hidden");
          }
        });
      }, 2000);
    } else {
      message.textContent = "Invalid OTP. Please try again!";
      message.classList.add("text-red-600");
      message.classList.remove("hidden");
    }
  });
