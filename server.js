const express = require('express');
const app = express();
const path = require('path');

// För att använda EJS som template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files, som t.ex. JavaScript och CSS
app.use(express.static(path.join(__dirname, 'public')));

// Rendera index.ejs
app.get('/', (req, res) => {
    const courses = [
        { code: 'dt057', name: 'Webbutveckling I', progression: 'A', syllabus: 'https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT057G/' },
        { code: 'dt084g', name: 'Introduktion till programmering i JavaScript', progression: 'A', syllabus: 'https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT084G/' },
    ];
    res.render('index', { courses });
});

// Starta servern
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
