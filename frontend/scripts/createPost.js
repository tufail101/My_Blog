const user = JSON.parse(localStorage.getItem("user"));
document.getElementById("createPostForm").addEventListener("submit",async (e)=>{
    e.preventDefault();
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const userId = user.userId;
    const message = document.getElementById("message");
    console.log(title,content);
    
    console.log(userId);
    if(!userId){
        message.innerText=`You Must Be Logged In TO Create Post `;
        message.style.color="red";
    }
    try{
        const response = await fetch("http://localhost:3000/createPost",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({userId,title,content})
        })
        const data = await response.json();
        console.log(data);
        if(response.ok){
            message.innerText = `Post Create SuccesFully`;
            message.style.color = "green";
        }
        
    }catch(error){
        console.log(error);
        message.innerText=`Sothing Went Worng`;
        message.style.color="red";
        
    }

})