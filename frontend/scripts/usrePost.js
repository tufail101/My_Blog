

const user = JSON.parse(localStorage.getItem("user"));
const fetchPost = async () => {
  const userId = user.userId;
  let postContener = document.getElementById("postcon");
  if (!userId) {
    postContener.innerHTML = `<p>Logging Is Nedded</p>`;
    return;
  }
  try {
    const response = await fetch(`https://myblog-production-c5bb.up.railway.app/userPost/${userId}`);
    let data = await response.json();
    if (response.ok) {
      if (data.lenght === 0) {
        postContener.innerHTML = `<p>No Post Found</p>`;
        return;
      }
      // console.log(data);

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
        <button class="bg-blue-500 text-white px-4 py-2 rounded-xl deleteBtn ">Delete</button>
</div>


 `;

        postContener.appendChild(postData);
        const read_more_btn = postData.querySelector(".read-more-btn");
        read_more_btn.addEventListener("click", () => {
          window.location.href = `../pages/post.html?postId=${post.id}`;
          // window.location.href = `../pages/post.html`;
        });

        const deleteBtn = postData.querySelector(".deleteBtn");
        deleteBtn.addEventListener("click", async () => {
          if (confirm("Are you sure you want to delete this post?")) {
            try {
              let response = await fetch(`https://myblog-production-c5bb.up.railway.app/deletePost/${post.id}`, {
                method: "DELETE",
              });
              let data = await response.json();
              if (response.ok) {
                alert(data.message);
                postData.remove(); // Remove the post from DOM
              } else {
                alert(data.message);
              }
            } catch (error) {
              console.log(error);
              alert("Failed to delete post");
            }
          } else {
            alert("Post was not deleted");
          }
        });
        

      });
    }
  } catch (error) {
    console.log(error);

    postContener.innerHTML = `<p>Failed To Fetch Post</p>`;
  }
};
fetchPost();
