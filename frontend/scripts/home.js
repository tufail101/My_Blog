const categoryFilterForm = document.getElementById("categoryFilterForm");
const searchForm = document.getElementById("searchForm");
const API_URL = `https://my-blog-w41s.onrender.com`;

const renderPosts = async (posts) => {
  const postcon = document.getElementById("postcon");
  postcon.innerHTML="";
  if(!posts.blogs || posts.blogs.length === 0){
    const message = document.createElement("p");
    message.textContent = `No posts found for this category.`;
    message.classList.add("text-center", "text-gray-500", "my-4");
    postcon.appendChild(message);
    return ;
  }
    posts.blogs.forEach((post) => {
        const postItem = document.createElement("div");
        postItem.classList.add("bg-white", "rounded-2xl", "shadow-lg", "overflow-hidden","my-2");
      postItem.innerHTML = `
           <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div class="p-6">
          <h2 class="text-2xl font-bold text-gray-800">${post.title}</h2>
          <p class="text-gray-600 mt-2">${post.content.substring(0,100)}</p>
          <div class="flex justify-between items-center mt-4">
            <a href="./pages/post.html?postId=${post.id}" class="text-blue-600 hover:underline">Read More →</a>
            <span class="text-gray-500 text-sm">Published on ${post.createdAt}</span>
          </div>
         <a href="./pages/writerProfile.html?userName=${post.userName}" class="hover:underline"> <p class="text-gray-500 text-sm mt-2">Author: ${post.userName}</p></a>

        </div>
      </div>
        `;
      postcon.appendChild(postItem);
    });
  }
  document.getElementById("filter").addEventListener("change",async (e) => {
    e.preventDefault();
    const category = e.target.value;
    try {
      const response = await fetch(`${API_URL}/homeBlog?category=${category}`)
      
      const blogs = await response.json();
      renderPosts(blogs);
      
    } catch (error) {
      console.error('Error fetching posts:', error);

    }
    
  })

searchForm.addEventListener("submit",async (e) => {
  e.preventDefault();
  const searchQuery = document.getElementById("search").value;
  try {
    
    const response = await fetch(`${API_URL}/homeBlog?searchQuery=${searchQuery}`)
      
    const blogs = await response.json();
    if (!response.ok) {
      throw new Error("No posts found.");
    }
    renderPosts(blogs);
  } catch (error) {
    console.error("Error fetching posts:", error);
    const postcon = document.getElementById("postcon");
    postcon.innerHTML = `<p class="text-center text-gray-500 my-4">No posts found for this search.</p>`;
 
  }
})
const fetchAllBlogs = async () => {
  try {
    const response = await fetch(`${API_URL}/homeBlog?category=All`);
    const blogs = await response.json();
    renderPosts(blogs);
  } catch (error) {
    console.error("Error fetching all posts:", error);
    const postcon = document.getElementById("postcon");
    postcon.innerHTML = `<p class="text-center text-gray-500 my-4">No posts found for this search.</p>`;
 
  }
};
window.addEventListener("DOMContentLoaded", fetchAllBlogs);