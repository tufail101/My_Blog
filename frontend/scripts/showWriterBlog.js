const userName = new URLSearchParams(window.location.search).get("userName");
const API_URL = `https://my-blog-w41s.onrender.com`;
const fetchPost = async () => {
  let postContener = document.getElementById("postcon");
 
  try {
    const response = await fetch(`${API_URL}/showWriterBlog/${userName}`);
    let data = await response.json();
    if (response.ok) {
      if (data.lenght === 0) {
        postContener.innerHTML = `<p>No Post Found</p>`;
        return;
      }
     

      data.forEach((post) => {
        let postData = document.createElement("div");
        postData.innerHTML = `
<div class="bg-white p-6 rounded-2xl shadow-xl border border-gray-200 mt-6 transition-transform transform hover:scale-105 hover:shadow-2xl flex items-center">
  
  <div class="w-2/3">
    <h3 class="text-2xl font-extrabold text-gray-900 mb-2">${post.title}</h3>
    <p class="text-gray-700 leading-relaxed mb-4">${post.content.substring(0, 100)}...</p>
  </div>
  <div class="w-1/3">
        <button class="bg-blue-500 text-white px-4 py-2 rounded-xl read-more-btn">Read More</button>
        
</div>
</div>

 `;

        postContener.appendChild(postData);
        const read_more_btn = postData.querySelector(".read-more-btn");
        read_more_btn.addEventListener("click", () => {
          window.location.href = `../pages/post.html?postId=${post.id}`;
          
        });

      
        

      });
    }
  } catch (error) {
    console.log(error);

    postContener.innerHTML = `<p>Failed To Fetch Post</p>`;
  }
};
fetchPost();
