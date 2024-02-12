const createPost = function() {
    location.href="/api/newPost";
}

document.querySelector('#createPost').addEventListener('click', createPost);