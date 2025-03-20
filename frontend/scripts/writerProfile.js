const API_URL = `https://my-blog-w41s.onrender.com`;
document.addEventListener("DOMContentLoaded", async () => {
  const userName = new URLSearchParams(window.location.search).get("userName");
  try {
    const response = await fetch(
      `${API_URL}/writerProfile/${userName}`
    );
    const data = await response.json();

    const user = data.user;
    const userId = user.id;
    

    document.getElementById("name").textContent = user.name;
    document.getElementById("user-name").textContent = user.userName;
    const userEmail = document.getElementById("user-email");

    document.getElementById("user-bio").textContent = user.bio || "This user hasn’t added a bio yet.";
    userEmail.textContent = user.email;
    userEmail.href = `mailto:${user.email}`;

    const postsContainer = document.getElementById("user-posts");
    postsContainer.innerHTML = "";

    try {
        const postResponse = await fetch(`${API_URL}/writerProfile/post/${userId}`);
        const postData = await postResponse.json();
        console.log(postData);
        
        if (postResponse.ok) {
            if (postData.length === 0) {
              postContener.innerHTML = `<p>No Posts Found</p>`;
              return;
            }
        const posts = postData.blogs.slice(0, 2);
        console.log(posts);
        posts.forEach(post => {
            const postContener = document.createElement("div");
            postContener.innerHTML =
            `
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

            postsContainer.appendChild(postContener);
            const read_more_btn = postContener.querySelector(".read-more-btn");
            read_more_btn.addEventListener("click", () => {
              window.location.href = `../pages/post.html?postId=${post.id}`;
            });
        });
        if (postData.blogs.length > 2) {
            const viewAllButton = document.createElement("button");
            viewAllButton.className = "bg-blue-600 text-white font-bold py-3 px-6 rounded-2xl hover:bg-blue-700 transition duration-300 ease-in-out";
            viewAllButton.textContent = "View All Posts";
            viewAllButton.addEventListener("click", () => {
              window.location.href = `../pages/showWriterBlog.html?userName=${userName}`;
            });
            postsContainer.appendChild(viewAllButton);
          }
    }
 } catch (error) {
        document.getElementById(
            "profile-container"
          ).innerHTML = `<p class="text-center text-red-500">Failed to load Posts.</p>${error}`;
    }
  } catch (error) {
    console.error("Error loading writer profile:", error);
    document.getElementById(
      "profile-container"
    ).innerHTML = `<p class="text-center text-red-500">Failed to load profile.</p>`;
  }
});
