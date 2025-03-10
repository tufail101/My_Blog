const getPost = async () => {
  const postId = new URLSearchParams(window.location.search).get("postId");

  if (!postId) {
    document.getElementById(
      "post-container"
    ).innerHTML = `<p>Post Id Not Found</p>`;
    return;
  }
  try {
    let responce = await fetch(`https://my-blog-w41s.onrender.com/${postId}`);
    let data = await responce.json();
    if(!responce.ok){
        document.getElementById(
            "post-container"
          ).innerHTML = `<p>${data.err}</p>`;
        return;
    }
    document.getElementById('post-container').innerHTML = 
    `<div class="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-8 border border-blue-600">
  <h1 class="text-5xl font-extrabold text-blue-600 text-center mb-6">${data.title}</h1>
  <p class="text-gray-700 text-lg leading-relaxed text-justify mb-4">${data.content}</p>
 
</div>

`;
    
  } catch (error) {
    console.error('Error fetching post:', error);
    document.getElementById('post-container').innerHTML = '<p>Failed to load post.</p>';
  }
};
getPost();
