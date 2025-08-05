document.addEventListener("DOMContentLoaded", function () {
  const gallery = document.getElementById("gallery");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  // Fetch all stored images/messages
  const storedImages = JSON.parse(localStorage.getItem("images")) || [];
  const messages = JSON.parse(localStorage.getItem("messages")) || [];

  // ========== Public Gallery ==========
  if (gallery) {
    renderGallery("all"); // default show all
  }

  // ========== Contact Form ==========
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.onsubmit = function (e) {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      const to = document.getElementById("targetPhotographer").value;

      if (!name || !email || !message || !to) {
        alert("All fields are required!");
        return;
      }

      const newMessage = {
        name,
        email,
        message,
        to,
        timestamp: new Date().toLocaleString(),
      };

      messages.push(newMessage);
      localStorage.setItem("messages", JSON.stringify(messages));
      alert("Message sent!");
      e.target.reset();
    };
  }

  // ========== Admin Login ==========
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.onsubmit = function (e) {
      e.preventDefault();
      const user = document.getElementById("username").value.trim();
      const pass = document.getElementById("password").value.trim();

      const validAdmins = ["admin1", "admin2", "admin3", "admin4"];
      if (validAdmins.includes(user) && pass === "admin123") {
        localStorage.setItem("adminLoggedIn", user);
        location.href = "dashboard.html";
      } else {
        alert("Invalid credentials");
      }
    };
  }

  // ========== Access Control ==========
  if (location.pathname.includes("dashboard.html")) {
    const currentAdmin = localStorage.getItem("adminLoggedIn");
    if (!currentAdmin) location.href = "admin.html";
  }

  // ========== Upload Form ==========
  const uploadForm = document.getElementById("uploadForm");
  if (uploadForm) {
    uploadForm.onsubmit = function (e) {
      e.preventDefault();
      const title = document.getElementById("imgTitle").value.trim();
      const file = document.getElementById("imgFile").files[0];
      const photographer = document.getElementById("photographerSelect").value;

      if (!title || !file || !photographer) {
        alert("All fields are required.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = function () {
        storedImages.push({
          title,
          src: reader.result,
          photographer,
        });
        localStorage.setItem("images", JSON.stringify(storedImages));
        alert("Image uploaded!");
        location.reload();
      };
      reader.readAsDataURL(file);
    };
  }

  // ========== Dashboard Gallery ==========
  if (document.getElementById("adminGalleryContainer")) {
    const sections = {
      admin1: document.getElementById("gallery-admin1"),
      admin2: document.getElementById("gallery-admin2"),
      admin3: document.getElementById("gallery-admin3"),
      admin4: document.getElementById("gallery-admin4"),
    };

    Object.keys(sections).forEach((photographer) => {
      const gallery = sections[photographer];
      gallery.innerHTML = "";

      storedImages.forEach((img, index) => {
        if (img.photographer === photographer) {
          const container = document.createElement("div");
          container.style.position = "relative";
          container.style.margin = "10px";

          const image = document.createElement("img");
          image.src = img.src;
          image.alt = img.title;
          image.style.width = "200px";
          image.style.borderRadius = "8px";

          const delBtn = document.createElement("button");
          delBtn.textContent = "Delete";
          delBtn.style.position = "absolute";
          delBtn.style.top = "5px";
          delBtn.style.right = "5px";
          delBtn.style.background = "#d9534f";
          delBtn.style.color = "#fff";
          delBtn.style.border = "none";
          delBtn.style.padding = "5px 8px";
          delBtn.style.cursor = "pointer";
          delBtn.style.borderRadius = "3px";

          delBtn.onclick = function () {
            deleteImage(index);
          };

          container.appendChild(image);
          container.appendChild(delBtn);
          gallery.appendChild(container);
        }
      });
    });
  }

  // ========== Dashboard Messages ==========
  if (document.getElementById("messageTable")) {
    const tbody = document.querySelector("#messageTable tbody");
    tbody.innerHTML = "";

    messages.forEach((msg, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${msg.name}</td>
        <td>${msg.email}</td>
        <td>${msg.message}</td>
        <td>${msg.to}</td>
        <td>${msg.timestamp}</td>
        <td><button onclick="deleteMessage(${index})">Delete</button></td>
      `;
      tbody.appendChild(row);
    });
  }
});

// ========== Lightbox ==========
function openLightbox(src) {
  document.getElementById("lightbox-img").src = src;
  document.getElementById("lightbox").style.display = "flex";
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

// ========== Logout ==========
function logout() {
  localStorage.removeItem("adminLoggedIn");
  location.href = "admin.html";
}

// ========== Delete Functions ==========
function deleteImage(index) {
  const images = JSON.parse(localStorage.getItem("images")) || [];
  images.splice(index, 1);
  localStorage.setItem("images", JSON.stringify(images));
  location.reload();
}

function deleteMessage(index) {
  const messages = JSON.parse(localStorage.getItem("messages")) || [];
  messages.splice(index, 1);
  localStorage.setItem("messages", JSON.stringify(messages));
  location.reload();
}

// ========== Filter Gallery by Photographer ==========
function filterByPhotographer(photographer) {
  const gallery = document.getElementById("gallery");
  const images = JSON.parse(localStorage.getItem("images")) || [];
  gallery.innerHTML = "";

  images.forEach((img) => {
    if (photographer === "all" || img.photographer === photographer) {
      const image = document.createElement("img");
      image.src = img.src;
      image.alt = img.title;
      image.onclick = () => openLightbox(img.src);
      gallery.appendChild(image);
    }
  });
}

