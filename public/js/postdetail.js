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

  document.getElementById("post-title").value = postTitle;
  document.getElementById("post-body").value = postBody;
};

//Function to submit the updated post (kinda weird, I know)
const submitUpdatedPost = async (event) => {
  event.preventDefault();
  console.log("I'm running");
  const postID = document.getElementById("postID").textContent;
  console.log(postID);
  const postTitle = document.getElementById("post-title").value;
  console.log(postTitle);
  const postBody = document.getElementById("post-body").value;
  console.log(postBody);

  if (postTitle && postBody) {
    try {
      // Send a PUT request to the API endpoint
      const response = await fetch("/api/posts/update/" + postID, {
        method: "PUT",
        body: JSON.stringify({ postTitle, postBody }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        // If successful, redirect the browser to the dashboard page
        console.log("Post updated successfully");
       // document.location.replace("/dashboard");
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

document.getElementById("deletePost").addEventListener("click", deletePost);
document.getElementById("updatePost").addEventListener("click", updatePost);
document
  .getElementById("formUpdate")
  .addEventListener("click", submitUpdatedPost);
