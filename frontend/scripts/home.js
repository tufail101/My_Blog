const fetchPost = async () => {
  const postcon = document.getElementById("postcon");
  const response = await fetch("http://localhost:3000/homeBlod");
  const data = await response.json();

  if (response.ok) {
    if (data.lenght === 0) {
      postContener.innerHTML = `<p>No Post Found</p>`;
      return;
    }
    postcon.innerHTML="";
    
    
    data.blogs.forEach((blog) => {
        const postItem = document.createElement("div");
        postItem.classList.add("bg-white", "rounded-2xl", "shadow-lg", "overflow-hidden","my-2");
      postItem.innerHTML = `
           <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div class="p-6">
                <h2 class="text-2xl font-bold text-gray-800">${blog.title}</h2>
                <p class="text-gray-600 mt-2">${blog.content.substring(
                  0,
                  100
                )}</p>
                <div class="flex justify-between items-center mt-4">
                    <a href="./pages/post.html?postId=${blog.id}" class="text-blue-600 hover:underline">Read More →</a>
                    <span class="text-gray-500 text-sm">Published on ${blog.createdAt}</span>
                </div>
             </div>
            </div>
        `;
      postcon.appendChild(postItem);
    });
  }
};

fetchPost();
