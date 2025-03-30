import { CourseInfo, addCourse, renderCourses, getCoursesFromLocalStorage, saveCoursesToLocalStorage } from './courses';

// Förifyllda exempelkurser som används om inga kurser finns i localStorage
const defaultCourses: CourseInfo[] = [
    {
        "code": "dt057g",
        "coursename": "Webbutveckling I",
        "progression": "A",
        "syllabus": "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT057G/"
    },
    // Lägg till dina andra kurser här
];

// När sidan laddas, hämtar vi kurser från localStorage och renderar
window.onload = () => {
    let courses = getCoursesFromLocalStorage();

    // Om inga kurser finns i localStorage, använd standardlistan
    if (courses.length === 0) {
        courses = defaultCourses;
        saveCoursesToLocalStorage(courses); // Spara dessa som standardkurser i localStorage
    }

    renderCourses(courses);
};

// Hantera formulärsändning
document.getElementById('courseForm')?.addEventListener('submit', (event) => {
    event.preventDefault();

    // Hämta användarinmatning från formuläret
    const code = (document.getElementById('code') as HTMLInputElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const progression = (document.getElementById('progression') as HTMLSelectElement).value as 'A' | 'B' | 'C';
    const syllabus = (document.getElementById('syllabus') as HTMLInputElement).value;

    const newCourse: CourseInfo = {
        code,
        coursename: name,
        progression,
        syllabus
    };

    // Lägg till den nya kursen och rendera kurslistan
    addCourse(newCourse);
    renderCourses(getCoursesFromLocalStorage());
});
