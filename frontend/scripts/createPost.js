const user = JSON.parse(localStorage.getItem("user"));
document.addEventListener("DOMContentLoaded", () => {
document.getElementById("createPostForm").addEventListener("submit",async (e)=>{
    e.preventDefault();
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    // const image = document.getElementById("image").files[0];
    // console.log(image);
    
    const userId = user ? user.userId : null;;
    const message = document.getElementById("message");
    console.log(title,content);
    
    console.log(userId);
    if(!userId){
        message.innerText=`You Must Be Logged In TO Create Post `;
        message.style.color="red";
    }
    try{
        const formData = new FormData();
        formData.append("userId",userId);
        formData.append("title",title);
        formData.append("content",content);
        // formData.append("image",image);
        formData.append("upload_preset", "your_upload_preset");

        const response = await fetch("https://my-blog-w41s.onrender.com/createPost",{
            method:"POST",
            // headers:{"Content-Type":"application/json"},
            // body:JSON.stringify({userId,title,content,image})
            body:formData
           
        })
        const data = await response.json();
        console.log(data);
        if(response.ok){
            message.innerText = `Post Create SuccesFully`;
            message.style.color = "green";
            setTimeout(()=>{
                window.location.href = `../index.html`;
            },2000)
        }
        
    }catch(error){
        console.log(error);
        message.innerText=`Sothing Went Worng`;
        message.style.color="red";
        
    }

})
});
