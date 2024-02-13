//Function to delete a post
const deletePost = async (event) => {
    event.preventDefault();

const result = confirm("Are you sure you want to delete this post?");

if (result) {

const postID = document.getElementById('postID').innerHTML;  
  
const response = await fetch("/api/posts/" + postID, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    });

if (response.ok) {
    // If successful, redirect the browser to the dashboard page
    document.location.replace("/dashboard");
    } else {
    alert(response.statusText);
    }  
  }
}
//Function to update a post
const updatePost = async (event) => {
    event.preventDefault();

const postID = document.getElementById('postID').innerHTML;  
const post_title = document.querySelector("#post-title").value.trim();
const post_body = document.querySelector("#post-body").value.trim();

const getPost = await fetch("/dashboard/onePost/" + postID, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
});
if (getPost.ok) {
    console.log(JSON.parse(getPost.body));
} else {
    alert(getPost.statusText)
}

  
// const response = await fetch("/api/posts/" + postID, {
//     method: "PUT",
//     body: JSON.stringify({ post_title, post_body }),
//     headers: { "Content-Type": "application/json" },
//     });

// if (response.ok) {
//     // If successful, redirect the browser to the dashboard page
//     document.location.replace("/dashboard");
//     } else {
//     alert(response.statusText);
//     } 
}

document
  .querySelector('#deletePost')
  .addEventListener('click', deletePost);

  document
  .querySelector('#updatePost')
  .addEventListener('click', updatePost);