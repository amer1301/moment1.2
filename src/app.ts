import { CourseInfo, addCourse, renderCourses, getCoursesFromLocalStorage, saveCoursesToLocalStorage } from './courses';

// Förifyllda exempelkurser som används om inga kurser finns i localStorage
const defaultCourses: CourseInfo[] = [
    {
        "code": "dt057g",
        "coursename": "Webbutveckling I",
        "progression": "A",
        "syllabus": "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT057G/"
    },
    {
        "code": "dt084g",
        "coursename": "Introduktion till programmering i JavaScript",
        "progression": "A",
        "syllabus": "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT084G/"
    },
    {
        "code": "dt200g",
        "coursename": "Grafisk teknik för webb",
        "progression": "A",
        "syllabus": "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT200G/"
    },
    {
        "code": "dt068g",
        "coursename": "Webbanvändbarhet",
        "progression": "B",
        "syllabus": "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT068G/"
    },
    {
        "code": "dt003g",
        "coursename": "Databaser",
        "progression": "A",
        "syllabus": "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT003G/"
    },
    {
        "code": "dt211g",
        "coursename": "Frontend-baserad webbutveckling",
        "progression": "B",
        "syllabus": "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT211G/"
    },
    {
        "code": "dt207g",
        "coursename": "Backend-baserad webbutveckling",
        "progression": "B",
        "syllabus": "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT207G/"
    },
    {
        "code": "dt208g",
        "coursename": "Programmering i TypeScript",
        "progression": "B",
        "syllabus": "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT208G/"
    },
    {
        "code": "ik060g",
        "coursename": "Projektledning",
        "progression": "B",
        "syllabus": "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/IK060G/"
    },
    {
        "code": "dt071g",
        "coursename": "Programmering i C#.net",
        "progression": "A",
        "syllabus": "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT071G/"
    },
    {
        "code": "dt193g",
        "coursename": "Fullstacks-utveckling med ramverk",
        "progression": "B",
        "syllabus": "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT193G/"
    },
    {
        "code": "dt209g",
        "coursename": "Webbutveckling för WordPress",
        "progression": "B",
        "syllabus": "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT209G/"
    },
    {
        "code": "dt191g",
        "coursename": "Webbutveckling med .NET",
        "progression": "B",
        "syllabus": "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT191G/"
    },
    {
        "code": "dt210g",
        "coursename": "Fördjupad frontend-utveckling",
        "progression": "B",
        "syllabus": "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT210G/"
    },
    {
        "code": "dt140g",
        "coursename": "Självständigt arbete",
        "progression": "B",
        "syllabus": "https://www.miun.se/utbildning/kursplaner-och-utbildningsplaner/DT140G/"
    }
];

// När sidan laddas, hämtar vi kurser från localStorage och renderar
window.onload = () => {
    let courses = getCoursesFromLocalStorage();

    // Om inga kurser finns i localStorage, använd standardlistan
    if (courses.length === 0) {
        courses = defaultCourses;
        saveCoursesToLocalStorage(courses); // Spara dessa som standardkurser i localStorage
    } else {
        // Kombinera defaultCourses med de som finns i localStorage
        const allCourses = [...defaultCourses, ...courses];
        saveCoursesToLocalStorage(allCourses);
        courses = allCourses; // Uppdatera courses med alla kurser
    }

    renderCourses(courses); // Rendera kurserna på sidan
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
