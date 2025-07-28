document.addEventListener("DOMContentLoaded", function () {
  const gallery = document.getElementById("gallery");
  const storedImages = JSON.parse(localStorage.getItem("images")) || [];
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  if (gallery) {
    storedImages.forEach(img => {
      const image = document.createElement("img");
      image.src = img.src;
      image.alt = img.title;
      image.onclick = () => openLightbox(img.src);
      gallery.appendChild(image);
    });
  }

  if (document.getElementById("contactForm")) {
    document.getElementById("contactForm").onsubmit = function (e) {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) return alert("All fields required!");

      const messages = JSON.parse(localStorage.getItem("messages") || "[]");
      messages.push({ name, email, message });
      localStorage.setItem("messages", JSON.stringify(messages));
      alert("Message sent!");
      e.target.reset();
    };
  }

  if (document.getElementById("loginForm")) {
    document.getElementById("loginForm").onsubmit = function (e) {
      e.preventDefault();
      const user = document.getElementById("username").value;
      const pass = document.getElementById("password").value;
      if (user === "admin" && pass === "admin123") {
        localStorage.setItem("adminLoggedIn", "true");
        location.href = "dashboard.html";
      } else {
        alert("Invalid credentials");
      }
    };
  }

  if (location.pathname.includes("dashboard.html") && localStorage.getItem("adminLoggedIn") !== "true") {
    location.href = "admin.html";
  }

  if (document.getElementById("uploadForm")) {
    document.getElementById("uploadForm").onsubmit = function (e) {
      e.preventDefault();
      const title = document.getElementById("imgTitle").value;
      const file = document.getElementById("imgFile").files[0];
      const reader = new FileReader();
      reader.onloadend = function () {
        const images = JSON.parse(localStorage.getItem("images") || "[]");
        images.push({ title, src: reader.result });
        localStorage.setItem("images", JSON.stringify(images));
        alert("Image uploaded!");
        location.reload();
      };
      reader.readAsDataURL(file);
    };
  }

  if (document.getElementById("adminGallery")) {
    const images = JSON.parse(localStorage.getItem("images") || "[]");
    const adminGallery = document.getElementById("adminGallery");
    adminGallery.innerHTML = "";

    images.forEach((img, index) => {
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
      adminGallery.appendChild(container);
    });
  }

  if (document.getElementById("messageTable")) {
    const messages = JSON.parse(localStorage.getItem("messages") || "[]");
    const tbody = document.querySelector("#messageTable tbody");
    tbody.innerHTML = "";

    messages.forEach((msg, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${msg.name}</td>
        <td>${msg.email}</td>
        <td>${msg.message}</td>
        <td><button onclick="deleteMessage(${index})">Delete</button></td>
      `;

      tbody.appendChild(row);
    });
  }
});

function openLightbox(src) {
  const lb = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  img.src = src;
  lb.style.display = "flex";
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

function logout() {
  localStorage.removeItem("adminLoggedIn");
  location.href = "admin.html";
}

function deleteMessage(index) {
  const messages = JSON.parse(localStorage.getItem("messages") || "[]");
  messages.splice(index, 1);
  localStorage.setItem("messages", JSON.stringify(messages));
  location.reload();
}

function deleteImage(index) {
  const images = JSON.parse(localStorage.getItem("images") || "[]");
  images.splice(index, 1);
  localStorage.setItem("images", JSON.stringify(images));
  location.reload();
}
