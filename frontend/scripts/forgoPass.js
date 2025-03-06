document.getElementById('forgotPasswordForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const userName = document.getElementById("userName").value;
    const email = document.getElementById('email').value;
    const sendOtpBtn = document.getElementById("sendOtpBtn");
    const message = document.getElementById('message');
  
    if (!email) {
      message.textContent = 'Please enter your email!';
      message.classList.add('text-red-600');
      message.classList.remove('hidden');
      return;
    }
  
    sendOtpBtn.disabled = true;
    sendOtpBtn.textContent = 'Sending...';
  
    try {
      const response = await fetch("http://localhost:3000/sendOtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email,userName })
      });
      
      const data = await response.json();
      
      
      if (response.ok) {
        sendOtpBtn.disabled = true;
        sendOtpBtn.textContent = 'Sended!';
        message.textContent = 'OTP sent to your email!';
        message.classList.remove('hidden');
        document.getElementById('otpVerifyForm').style.display = "block";
        sessionStorage.setItem('serverOtp', data.otp);
        sessionStorage.setItem('userName',userName);
          
        
      } else {
        message.textContent = data.message;
        message.classList.remove('hidden');
        sendOtpBtn.disabled = false;
        sendOtpBtn.textContent = 'Send OTP';
      }
  
    } catch (error) {
      console.error('Error:', error);
      message.textContent = 'Something went wrong. Please try again!';
      message.classList.remove('hidden');
      sendOtpBtn.disabled = false;
      sendOtpBtn.textContent = 'Send OTP';
    }
  });

  document.getElementById("otpVerifyForm").addEventListener("submit" ,async (e) => {
    e.preventDefault();
    const userOtp = document.getElementById("otp").value;
    const serverOtp = sessionStorage.getItem("serverOtp");
    const message = document.getElementById('message');
    if(!userOtp){
      message.textContent = 'Please enter your OTP!';
      message.classList.add('text-red-600');
      message.classList.remove('hidden');
      return;
    }
    if(userOtp === serverOtp){
      message.textContent = 'OTP verified successfully!';
      message.classList.add('text-green-600');
      message.classList.remove('hidden');
      setTimeout(async() => {
        const otpFormContainer = document.getElementById("otpFormContainer");
        otpFormContainer.innerHTML = ``;
        const changePassForm = document.createElement('form');
        changePassForm.innerHTML = `
          <div class="mb-4 relative">
  <label for="password" class="block text-gray-700 font-medium mb-2">Enter New Password</label>
  <input type="password" id="password" name="password" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10" required>
  <button type="button" onclick="togglePassword('password', 'togglePassIcon1')" class="absolute inset-y-0 right-3 flex items-center text-gray-500">
    <span id="togglePassIcon1">👁️</span>
  </button>
</div>

<div class="mb-4 relative">
  <label for="confirmPass" class="block text-gray-700 font-medium mb-2">Confirm Password</label>
  <input type="password" id="confirmPass" name="confirmPass" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10" required>
  <button type="button" onclick="togglePassword('confirmPass', 'togglePassIcon2')" class="absolute inset-y-0 right-3 flex items-center text-gray-500">
    <span id="togglePassIcon2">👁️</span>
  </button>
</div>

<button type="submit" class="my-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Change Password</button>

      `;
      otpFormContainer.appendChild(changePassForm);
      changePassForm.addEventListener("submit" ,async (e) => {
        e.preventDefault();
        const userName = sessionStorage.getItem("userName");
        const password = document.getElementById("password").value;
        const confirmPass = document.getElementById("confirmPass").value;
        
        
        // const user = JSON.parse(localStorage.getItem())
        if(!password){
          message.textContent = 'Please enter your password!';
          message.classList.add('text-red-600');
          message.classList.remove('hidden');
          return;
        }
        if(password !== confirmPass){
          message.textContent = 'Passwords do not match!';
          message.classList.add('text-red-600');
          message.classList.remove('hidden');
          return;
        }
        try {
          console.log(password);
          const response = await fetch("http://localhost:3000/changePassword",{
            method : "POST",
            headers : {
              "Content-Type" : "application/json"
            },
            body : JSON.stringify({userName,password})
          });
        const data = await response.json();
        if(response.ok){
          message.textContent = 'Password changed successfully!';
          message.classList.add('text-green-600');
          message.classList.remove('hidden');
        }else {
          message.textContent = data.message;
          message.classList.add('text-red-600');
          message.classList.remove('hidden');
        }

        } catch (error) {
          console.error('Error:', error);
          message.textContent = 'Something went wrong. Please try again!';
          message.classList.add('text-red-600');
          message.classList.remove('hidden');
        }
      })
      },2000);
    }
    else {
      message.textContent = 'Invalid OTP. Please try again!';
      message.classList.add('text-red-600');
      message.classList.remove('hidden');
    }

    
  })

  const togglePassword = (inputId,iconId) => {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    if(input.type === "password"){
      input.type = "text";
      icon.textContent = '🙈';
    }
    else{
        input.type = 'password';
        icon.textContent = '👁️';
      
    }
  }