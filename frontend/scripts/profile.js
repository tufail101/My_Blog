const user = JSON.parse(localStorage.getItem("user"));

document.addEventListener("DOMContentLoaded", () => {
  if (user) {
    document.getElementById("name").textContent = user.name;
    document.getElementById("username").textContent = user.userName;
    document.getElementById("email").textContent = user.userEmail;
  }

  document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "../pages/login.html";
  });

  // document.getElementById("editProfileBtn").addEventListener("click",() => {
  //   window.location.href = "../pages/editProfile.html";
  // })
  const fetchPost = async () => {
    const userId = user.userId;

    let postContener = document.getElementById("postContener");

    if (!userId) {
      postContener.innerHTML = `<p>Login is needed</p>`;
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/userPost/${userId}`);
      let data = await response.json();
      if (response.ok) {
        if (data.length === 0) {
          postContener.innerHTML = `<p>No Posts Found</p>`;
          return;
        }

        const postsToShow = data.slice(0, 2);

        postsToShow.forEach((post) => {
          let postData = document.createElement("div");
          postData.innerHTML = `
                        <div class="bg-blue-50 p-6 rounded-2xl shadow-md">
                            <h4 class="text-xl font-bold text-blue-600">${
                              post.title
                            }</h4>
                            <p class="text-gray-700 mt-2">${post.content.substring(
                              0,
                              100
                            )}...</p>
                        </div>
                        <button class="bg-blue-500 text-white px-4 py-2 rounded-xl read-more-btn">Read More</button>
                        <button class="bg-red-500 text-white px-4 py-2 rounded-xl deleteBtn">Delete</button>
                    `;

          postContener.appendChild(postData);

          const read_more_btn = postData.querySelector(".read-more-btn");
          read_more_btn.addEventListener("click", () => {
            window.location.href = `../pages/post.html?postId=${post.id}`;
          });

          const deleteBtn = postData.querySelector(".deleteBtn");
          deleteBtn.addEventListener("click", async () => {
            if (confirm("Are you sure you want to delete this post?")) {
              try {
                let response = await fetch(
                  `http://localhost:3000/deletePost/${post.id}`,
                  {
                    method: "DELETE",
                  }
                );
                let data = await response.json();
                if (response.ok) {
                  alert(data.message);
                  postData.remove();
                } else {
                  alert(data.message);
                }
              } catch (error) {
                console.log(error);
                alert("Failed to delete post");
              }
            }
          });
        });

        if (data.length > 2) {
          const viewAllButton = document.createElement("button");
          viewAllButton.className =
            "bg-blue-600 text-white font-bold py-3 px-6 rounded-2xl hover:bg-blue-700 transition duration-300 ease-in-out";
          viewAllButton.textContent = "View All Posts";
          viewAllButton.addEventListener("click", () => {
            window.location.href = "./userPost.html";
          });
          postContener.appendChild(viewAllButton);
        }
      }
    } catch (error) {
      console.log(error);
      postContener.innerHTML = `<p>Failed To Fetch Posts</p>`;
    }
  };

  fetchPost();
});
