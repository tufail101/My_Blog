
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
  document.getElementById("forgotPasswordForm").addEventListener("submit" ,async (e) => {
    e.preventDefault();
    const userName = sessionStorage.getItem("userName");
    const password = document.getElementById("password").value;
    const confirmPass = document.getElementById("confirmPass").value;
    const message = document.getElementById("message");
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
        
        const response = await fetch("https://myblog-production-c5bb.up.railway.app/changePassword",{
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
       
        setTimeout(() => {
            window.location.href = `../pages/login.html`;
        },2000)
        
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