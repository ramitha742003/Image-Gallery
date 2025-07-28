class SpecialHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
        <nav>
          <a href="index.html">Gallery</a>
          <!--<a href="about.html">About</a>-->
          <a href="contact.html">Contact</a>
          <a href="admin.html">Admin</a>
        </nav>
      </header>
    `;
  }
}
customElements.define("special-header", SpecialHeader);

class SpecialFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="footer">
        <div class="footer-container">
          <div class="footer-column">
            <h3>Quick Links</h3>
            <hr />
            <ul>
              <li><a href="index.html">Home</a></li>
              <!--<li><a href="about.html">About</a></li>-->
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h3>Follow Us</h3>
            <hr />
            <ul>
              <li><a href="www.facebook.com">Facebook</a></li>
              <li><a href="www.x.com">Twitter</a></li>
              <li><a href="www.instagram.com">Instagram</a></li>
              <li><a href="www.pinterest.com">Pinterest</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h3>Contact Us</h3>
            <hr />
            <ul>
              <li>Email: <a href="mailto:info@imagegallery.com">info@imagegallery.com</a></li>
              <li>Phone: <a href="tel:+1234567890">+123 456 7890</a></li>
              <li>Website: <a href="www.imagegallery.com">www.imagegallery.com</a></li>
            </ul>
          </div>
        </div>
        <hr class="footer-divider" />
        <div class="footer-bottom">
          <p>&copy; 2025 Image Gallery. All Rights Reserved.</p>
        </div>
      </footer>
    `;
  }
}
customElements.define("special-footer", SpecialFooter);
