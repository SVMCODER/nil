const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Cloud Storage</title>
      <style>
        body {
          font-family: Arial, sans-serif;
        }
      </style>
    </head>
    <body>
      <h1>Cloud Storage</h1>
      
      <form action="/upload" method="post" enctype="multipart/form-data">
        <input type="file" name="file" accept="image/*,video/*" multiple>
        <button type="submit">Upload</button>
      </form>
      
      <h2>Uploaded Files:</h2>
      <div id="fileList"></div>
    
      <script>
        window.addEventListener('DOMContentLoaded', () => {
          const fileList = document.getElementById('fileList');
      
          fetch('/uploads')
            .then(response => response.json())
            .then(data => {
              data.forEach(file => {
                const fileItem = document.createElement('div');
                fileItem.textContent = file.filename;
                fileList.appendChild(fileItem);
              });
            });
        });
      </script>
    </body>
    </html>
  `);
});

app.post('/upload', upload.array('file'), (req, res) => {
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
