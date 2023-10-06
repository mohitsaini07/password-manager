const savedTable = document.querySelector("#saved-table");
savedTable.style.display = "none";

const deletePassword = (website) => {
  let data = localStorage.getItem("passwords");
  let arr = JSON.parse(data);

  arrUpdated = arr.filter((e) => {
    return e.website !== website;
  });
  localStorage.setItem("passwords", JSON.stringify(arrUpdated));
  showPasswords();
};

const togglePasswordVisibility = (eyeBtn) => {
  const passwordText = eyeBtn.nextElementSibling; // Get the password text element

  if (passwordText.style.display === "none") {
    passwordText.style.display = "inline-block"; // Show the password
    eyeBtn.textContent = "👁️";
  } else {
    passwordText.style.display = "none"; // Hide the password
    eyeBtn.textContent = "🙈";
  }
};

const showPasswords = () => {
  const table = document.querySelector("table");
  const data = localStorage.getItem("passwords");
  if (data == null) {
    table.innerHTML = "There is no data to show!";
  } else {
    table.innerHTML = `
            <tr>
                 <th>Website</th>
                <th>Username</th>
                <th>Password</th>
                <th>Delete</th>
            </tr>`;
    const arr = JSON.parse(data);
    let str = "";

    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      str += `<tr>
        <td>${element.website}</td>
        <td>${element.username}</td>
        <td><span id="eyeBtn" onclick="togglePasswordVisibility(this)">👁️</span>
        <span class="password-text">${element.password}</span></td>
        <td><button id="deleteBtn" onclick="deletePassword('${element.website}')"><i class="fa-solid fa-trash"></i></button></td>
        </tr>
        `;
    }
    table.innerHTML = table.innerHTML + str;
  }
  website.value = "";
  username.value = "";
  password.value = "";
};

showPasswords();
const submitBtn = document.querySelector("#btn");
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (!website.value || !username.value || !password.value) {
    alert("Please fill in all fields!");
    return; // Stop further processing
  }
  const passwords = localStorage.getItem("passwords");
  if (passwords == null) {
    let json = [];
    json.push({
      website: website.value,
      username: username.value,
      password: password.value,
    });
    localStorage.setItem("passwords", JSON.stringify(json));
  } else {
    let json = JSON.parse(localStorage.getItem("passwords"));
    json.push({
      website: website.value,
      username: username.value,
      password: password.value,
    });
    localStorage.setItem("passwords", JSON.stringify(json));
  }
  savedTable.style.display = "block";
  showPasswords();
  createSuccessToast("Password Saved Successfully");
});
