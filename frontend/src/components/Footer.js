// src/components/Footer.js
// Shared footer rendered on every page except the splash screen.
// Extracted into its own component to follow the DRY principle —
// one change here updates the footer everywhere.

function Footer() {
  return (
    <footer className='site-footer'>
      <p>Contact: gayocarlo@gmail.com | Follow my chess journey on social media</p>
      <p>&copy; 2026 My Chess Journey | Student Portfolio Project</p>
      <p>Created with ♟️ and dedication</p>
    </footer>
  );
}

export default Footer;
