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
     setTimeout(() => {
      window.location.href = `../pages/forgotPass.html`
     }, 2000);
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