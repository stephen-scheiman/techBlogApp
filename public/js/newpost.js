const createNewPost = async (event) => {
  event.preventDefault();

  // Collect values from the create post form
  const post_title = document.querySelector("#post-title").value.trim();
  console.log(post_title);
  const post_body = document.querySelector("#post-body").value.trim();
  console.log(post_body);
  const posted_by = document.getElementById("userID").innerHTML;
  console.log(posted_by);
  const posted_date = "01/01/24";
  console.log(posted_date);
  const test = JSON.stringify({ post_title, posted_by, post_body, posted_date  });
  console.log(test);

  if (post_title && post_body) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ post_title, posted_by, post_body, posted_date }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the dashboard page
      console.log("Hooray")
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', createNewPost);

