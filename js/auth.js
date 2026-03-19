function handleCredentialResponse(response) {
  const data = parseJwt(response.credential);
  const email = data.email;
  const firstName = data.given_name;
  const role = document.querySelector('input[name="role"]:checked').value;

  // Save to localStorage for later pages
  localStorage.setItem("userEmail", email);
  localStorage.setItem("firstName", firstName);

  const exceptionAccount = "jcesperanza@neu.edu.ph";

  if (email === exceptionAccount) {
    if (role === "student") {
      window.location.href = "checkin.html";
    } else {
      window.location.href = "admin.html";
    }
    return;
  }

  if (role === "student" && email.endsWith("@neu.edu.ph")) {
    window.location.href = "checkin.html";
  } else if (role === "admin" && email.endsWith("@gmail.com")) {
    window.location.href = "admin.html";
  } else {
    alert("Access denied. Invalid account for selected role.");
  }
}

// Helper: decode JWT
function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}
