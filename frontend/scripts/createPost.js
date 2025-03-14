const user = JSON.parse(localStorage.getItem("user"));
document.addEventListener("DOMContentLoaded", () => {
    const quill = new Quill("#editor-container", {
        theme: "snow",
        placeholder: "Write something amazing...",
        modules: {
            toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["blockquote", "code-block"],
                ["link", "image"],
                [{ align: [] }],
                [{ color: [] }, { background: [] }],
                ["clean"]
            ]
        }
    });
document.getElementById("createPostForm").addEventListener("submit",async (e)=>{
    e.preventDefault();
    const title = document.getElementById("title").value;
    const content = quill.root.innerHTML;
    const category = document.getElementById("category").value;
    const submitPost = document.getElementById("submitPost");
    const userId = user ? user.userId : null;;
    const message = document.getElementById("message");
    
    if(!userId){
        message.innerText=`You Must Be Logged In TO Create Post `;
        message.style.color="red";
    }
    if (!title || !content || !category) {
        message.innerText = `All fields are required.`;
        message.style.color = "red";
        return;
    }
    submitPost.disabled = true;
    submitPost.textContent = 'Posting...';

    
    try{
        const formData = new FormData();
        formData.append("userId",userId);
        formData.append("title",title);
        formData.append("content",content);
        formData.append("category",category);

        // formData.append("image",image);
        formData.append("upload_preset", "your_upload_preset");




        const response = await fetch("https://my-blog-w41s.onrender.com/createPost",{
            method:"POST",
           
            body:formData
           
        })
        const data = await response.json();
        console.log(data);
        
        if(response.ok){
            submitPost.disabled = true;
            submitPost.textContent = 'Posted!';
       
            message.innerText = `Post Create SuccesFully`;
            message.style.color = "green";
            setTimeout(()=>{
                window.location.href = `../index.html`;
            },2000)
        }else{
            submitPost.disabled = false;
            submitPost.textContent = 'Failed To Post Try Again!';
        }
        
    }catch(error){
        console.log(error);
        submitPost.disabled = false;
        submitPost.textContent = 'Failed To Post!';
        message.innerText=`Sothing Went Worng`;
        message.style.color="red";
        
    }

})
});
