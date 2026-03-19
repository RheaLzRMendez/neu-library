// Dummy user data
const users = [
  { name: "Rhealiza Rose T. Mendez", email: "rhealizarose.mendez@neu.edu.ph", status: "Active" },
  { name: "Rhealiza Rose T. Mendez", email: "eyamendez18june@gmail.com", status: "Active" }
];

// Render table
function renderTable() {
  const tbody = document.getElementById("visitorTable");
  tbody.innerHTML = "";
  users.forEach(u => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${u.name}</td>
      <td>${u.email}</td>
      <td class="${u.status === "Active" ? "status-active" : "status-issue"}">${u.status}</td>
      <td><button class="blockBtn">${u.status === "Active" ? "Block Access" : "Unblock"}</button></td>
    `;
    tbody.appendChild(row);
  });
}

// Search filter
document.getElementById("searchInput").addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const rows = document.querySelectorAll("#visitorTable tr");
  rows.forEach(row => {
    const name = row.cells[0].innerText.toLowerCase();
    const email = row.cells[1].innerText.toLowerCase();
    row.style.display = (name.includes(query) || email.includes(query)) ? "" : "none";
  });
});

// Block/Unblock toggle
document.addEventListener("click", function(e) {
  if (e.target.classList.contains("blockBtn")) {
    const row = e.target.closest("tr");
    const statusCell = row.cells[2];
    if (statusCell.innerText === "Active") {
      statusCell.innerText = "Blocked";
      statusCell.className = "status-issue";
      e.target.innerText = "Unblock";
      row.style.background = "rgba(220,38,38,0.1)"; // red highlight
    } else {
      statusCell.innerText = "Active";
      statusCell.className = "status-active";
      e.target.innerText = "Block Access";
      row.style.background = "";
    }
  }
});

// Sidebar navigation
function showSection(sectionId) {
  document.getElementById("dashboardSection").style.display = "none";
  document.getElementById("usersSection").style.display = "none";
  document.getElementById("adminSection").style.display = "none";
  document.getElementById(sectionId).style.display = "block";
}

document.getElementById("dashboardBtn").addEventListener("click", () => {
  showSection("dashboardSection");
});

document.getElementById("usersBtn").addEventListener("click", () => {
  showSection("usersSection");
  renderTable();
});

document.getElementById("adminBtn").addEventListener("click", () => {
  showSection("adminSection");
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  // Clear any stored login/session data
  localStorage.clear();
  sessionStorage.clear();

  // Redirect back to your login page
  window.location.href = "index.html"; 
});


// Analysis Engine
document.getElementById("generateAnalysis").addEventListener("click", () => {
  document.getElementById("analysisStatus").innerText = "Generating insights...";
  setTimeout(() => {
    document.getElementById("analysisStatus").innerText =
      "Insights generated: Peak visitors at 5pm, Engineering highest attendance.";
  }, 2000);
});

// Chart.js setup
const hourlyCtx = document.getElementById('hourlyChart').getContext('2d');
new Chart(hourlyCtx, {
  type: 'bar',
  data: {
    labels: ['8AM','9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM'],
    datasets: [{
      label: 'Visitors',
      data: [2, 3, 4, 5, 6, 8, 10, 12, 9, 7], // sample data
      backgroundColor: '#4CAF50'
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: { beginAtZero: true }
    }
  }
});

const collegeCtx = document.getElementById('collegeChart').getContext('2d');
new Chart(collegeCtx, {
  type: 'pie',
  data: {
    labels: [
      'Computer Studies',
      'Engineering',
      'Arts and Sciences',
      'Business Administration'
    ],
    datasets: [{
      data: [4, 5, 2, 2], // sample data
      backgroundColor: ['#2196F3','#FF9800','#9C27B0','#F44336']
    }]
  },
  options: {
    responsive: true
  }
});


// Hourly Visitors Chart
new Chart(hourlyCtx, {
  type: 'bar',
  data: {
    labels: ['8AM','9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM'],
    datasets: [{
      label: 'Visitors',
      data: [2, 3, 4, 5, 6, 8, 10, 12, 9, 7],
      backgroundColor: '#4CAF50'
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'gold',
          font: { size: 18, family: 'Georgia' }
        }
      },
      title: {
        display: true,
        text: 'Visitor Trends',
        color: 'gold',
        font: { size: 28, family: 'Georgia', weight: 'bold' }
      }
    },
    scales: { y: { beginAtZero: true } }
  }
});

// Visitors by College Chart
new Chart(collegeCtx, {
  type: 'pie',
  data: {
    labels: ['Computer Studies','Engineering','Arts and Sciences','Business Administration'],
    datasets: [{
      data: [4, 5, 2, 2],
      backgroundColor: ['#2196F3','#FF9800','#9C27B0','#F44336']
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'gold',
          font: { size: 18, family: 'Georgia' }
        }
      },
      title: {
        display: true,
        text: 'Visitors by College',
        color: 'gold',
        font: { size: 28, family: 'Georgia', weight: 'bold' }
      }
    }
  }
});
