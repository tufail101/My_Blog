const getPost = async () => {
  const postId = new URLSearchParams(window.location.search).get("postId");

  if (!postId) {
    document.getElementById(
      "post-container"
    ).innerHTML = `<p>Post Id Not Found</p>`;
    return;
  }
  try {
    let responce = await fetch(`http://localhost:3000/post/${postId}`);
    let data = await responce.json();
    if(!responce.ok){
        document.getElementById(
            "post-container"
          ).innerHTML = `<p>${data.err}</p>`;
        return;
    }
    document.getElementById('post-container').innerHTML = `
    <h1 class="text-4xl font-bold px-2">${data.title}</h1>
    
    <p class="text-gray-700 leading-relaxed px-2">${data.content}</p>
`;
    
  } catch (error) {
    console.error('Error fetching post:', error);
    document.getElementById('post-container').innerHTML = '<p>Failed to load post.</p>';
  }
};
getPost();
