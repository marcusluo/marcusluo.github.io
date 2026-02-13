document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('imageUploader');
  const preview = document.getElementById('preview');
  if (fileInput && preview) {
    fileInput.addEventListener('change', function() {
      preview.innerHTML = '';
      Array.from(this.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = e => {
          const img = document.createElement('img');
          img.src = e.target.result;
          img.style.maxWidth = '200px';
          img.style.marginRight = '10px';
          img.style.marginBottom = '10px';
          preview.appendChild(img);
        };
        reader.readAsDataURL(file);
      });
    });
  }
});
