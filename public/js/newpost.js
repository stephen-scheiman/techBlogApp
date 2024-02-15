const createNewPost = async (event) => {
  event.preventDefault();

  // Collect values from the create post form
  const post_title = document.querySelector("#post-title").value.trim();
  const post_body = document.querySelector("#post-body").value.trim();
  const posted_by = document.getElementById("userID").innerHTML;

  if (post_title && post_body) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ post_title, posted_by, post_body }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the dashboard page
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector(".login-form").addEventListener("submit", createNewPost);
