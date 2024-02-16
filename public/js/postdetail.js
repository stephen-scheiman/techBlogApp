//Function to delete a post

const deletePost = async (event) => {
  event.preventDefault();

  const result = confirm("Are you sure you want to delete this post?");

  if (result) {
    const postID = document.getElementById("postID").textContent;
    const response = await fetch("/api/posts/" + postID, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the dashboard page
      document.location.replace("/dashboard/");
    } else {
      alert(response.statusText);
    }
  }
};
//Function to update a post

const updatePost = async (event) => {
  event.preventDefault();

  const postTitle = document.getElementById("postTitle").textContent;
  const postBody = document.getElementById("postBody").textContent;
  document.getElementById("xxxpost-title").value = postTitle;
  document.getElementById("xxxpost-body").value = postBody;
};

//Function to submit the updated post (kinda weird, I know)
const submitUpdatedPost = async (event) => {
  event.preventDefault();
  const postID = document.getElementById("postID").textContent;
  const post_title = document.getElementById("xxxpost-title").value;
  const post_body = document.getElementById("xxxpost-body").value;

  if (post_title && post_body) {
    try {
      // Send a PUT request to the API endpoint
      const response = await fetch("/api/posts/update/" + postID, {
        method: "PUT",
        body: JSON.stringify({ post_title, post_body }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        // If successful, redirect the browser to the dashboard page
        console.log("Post updated successfully");
        document.location.replace("/dashboard");
      } else {
        throw new Error(response.statusText); // Throw error for non-successful response
      }
    } catch (error) {
      console.error("Error updating post:", error.message);
      alert("Error updating post:", error.message);
    }
  } else {
    alert("Post title and body cannot be empty");
  }
};

const addComment = async (event) => {
  event.preventDefault();

  const comment_body = document.getElementById("comment-body").value;
  const comment_post = document.getElementById("postID").textContent;
  const commentPosted_by = document.getElementById("userID").textContent;
  const payload = JSON.stringify({
    comment_body,
    commentPosted_by,
    comment_post,
  });
  

  if (comment_body) {
    try {
      // Send a POST request to the API endpoint
      const response = await fetch("/api/comments", {
        method: "POST",
        body: payload,
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        // If successful, redirect the browser to the dashboard page
        const postID = document.getElementById("postID").textContent;
        console.log("Comment posted successfully");
        document.location.replace("/dashboard/postDetail/" + postID);
      } else {
        throw new Error(response.statusText); // Throw error for non-successful response
      }
    } catch (error) {
      console.error("Error posting comment:", error.message);
      alert("Error posting comment:", error.message);
    }
  } else {
    alert("Comment cannot be empty");
  }
};

document.getElementById("deletePost").addEventListener("click", deletePost);
document.getElementById("updatePost").addEventListener("click", updatePost);
document.getElementById("comment-submit").addEventListener("click", addComment);
document
  .getElementById("formUpdate")
  .addEventListener("click", submitUpdatedPost);
