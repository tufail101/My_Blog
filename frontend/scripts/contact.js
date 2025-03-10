document.addEventListener("DOMContentLoaded" , () => {
    document.getElementById("contactForm").addEventListener('submit' ,async (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;
        const responseMessage = document.getElementById("responseMessage");
       
        

        if(!name || !email || !message){
            responseMessage.textContent = `Please Enter All Filleds`;
            responseMessage.style.color = "red";
            return;
        }

        try {
            const formData = new FormData();
            formData.append("name",name);
            formData.append("email",email);
            formData.append("message",message);
            
            
            const response = await fetch("https://myblog-production-c5bb.up.railway.app/userConatct",{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify({name,email,message})
            })
            const data = await response.json();
            if(response.ok){
                responseMessage.textContent = data.message;
                responseMessage.style.color = "green";
            }
        } catch (error) {
            message.innerText=`Sothing Went Worng`;
            message.style.color="red";
        }
    })
})