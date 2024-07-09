// ^ HTML Elements

var nameInput = document.getElementById("name");
var urlInput = document.getElementById("url");
var bookmarkContainer = document.getElementById("bookmarkContainer");
var closeBtn = document.getElementById("closeBtn");
var boxModal = document.querySelector(".user-alret");

// ^ App Variables

var bookmarkList = JSON.parse(localStorage.getItem("bookmarks")) || [];
displayAllBookmarks();
var nameRegex = /^[A-Z][a-z]{3,}$/;
var urlRegex =
  /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
closeModal();

// ^ Functions

// ! Function to add Bookmark
function addBookmark() {
  if (validate(nameRegex, nameInput) && validate(urlRegex, urlInput)) {
    var bookmark = {
      name: nameInput.value,
      url: urlInput.value,
    };
    bookmarkList.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
    displayBookmark(bookmarkList.length - 1);
    clearInputs();
  } else {
    boxModal.classList.remove("d-none");
  }
}

// ! Function to display Bookmark
function displayBookmark(index) {
  var bookmarkHTML = `
  <tr>
  <td scope="col">${[index + 1]}</td>
  <td>${bookmarkList[index].name}</td>
  <td>
    <button class="btn btn-success">
      <a
        href="${bookmarkList[index].url}"
        target="_blank"
        class="text-decoration-none text-white"
      >
        <i class="fa-solid fa-eye pe-2"></i>
        Visit
      </a>
    </button>
  </td>
  <td>
    <button class="btn btn-danger" onclick='deleteBookmark(${index})'>
      <i class="fa-solid fa-trash-can pe-2"></i>
      Delete
    </button>
  </td>
</tr> 
  `;
  bookmarkContainer.innerHTML += bookmarkHTML;
}

// ! Function to display all Bookmark
function displayAllBookmarks() {
  for (var i = 0; i < bookmarkList.length; i++) {
    displayBookmark(i);
  }
}

// ! Function to clear Bookmark inputs
function clearInputs() {
  nameInput.value = "";
  urlInput.value = "";
}

// ! Function to delete Bookmark
function deleteBookmark(index) {
  bookmarkList.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
  bookmarkContainer.innerHTML = "";
  displayAllBookmarks();
}

// ! Function to Validate user Inputs
function validate(regex, element) {
  if (regex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
  }
}

// ! Function to present user alert
function closeModal() {
  boxModal.classList.add("d-none");
}

closeBtn.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    closeModal();
  }
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("user-alret")) {
    closeModal();
  }
});
