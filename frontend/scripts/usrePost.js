const user = JSON.parse(localStorage.getItem("user"));
const fetchPost = async () => {
  const userId = user.userId;
  let postContener = document.getElementById("postcon");
  if (!userId) {
    postContener.innerHTML = `<p>Logging Is Nedded</p>`;
    return;
  }
  try {
    const response = await fetch(`http://localhost:3000/userPost/${userId}`);
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
  
  <div class="overflow-hidden rounded-xl w-60 h-40 mx-auto">
    <img src="${post.img_url}" alt="Post Image" class="w-full h-full object-cover" />
  </div>
  
  <div class="w-2/3">
    <h3 class="text-2xl font-extrabold text-gray-900 mb-2">${post.title}</h3>
    <p class="text-gray-700 leading-relaxed mb-4">${post.content.substring(0, 100)}...</p>
  </div>
</div>


 `;
        postContener.appendChild(postData);
        postData.addEventListener("click", () => {
          window.location.href = `../pages/post.html?postId=${post.id}`;
          // window.location.href = `../pages/post.html`;
        });
      });
    }
  } catch (error) {
    console.log(error);

    postContener.innerHTML = `<p>Failed To Fetch Post</p>`;
  }
};
fetchPost();
