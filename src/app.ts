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

let userAddedCourses: CourseInfo[] = [];  // För att hålla användartilläggda kurser

// När sidan laddas, hämtar vi kurser från localStorage och renderar
window.onload = () => {
    let courses = getCoursesFromLocalStorage();
    let allCourses = [...defaultCourses, ...courses];  // Kombinera standard och användartilläggda kurser

    renderDefaultCourses(allCourses);  // Ropa på renderDefaultCourses för att visa både default- och användartilläggda kurser
    renderUserAddedCourses(userAddedCourses);  // Rendera användartilläggda kurser
};

// Hantera formulärsändning
document.getElementById('courseForm')?.addEventListener('submit', (event) => {
    event.preventDefault();

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

    // Lägg till den nya kursen i användartilläggda kurser om den inte redan finns
    if (!isCourseCodeTaken(newCourse.code)) {
        userAddedCourses.push(newCourse);  // Lägg till den manuellt inlagda kursen
        saveCoursesToLocalStorage(userAddedCourses);  // Spara i localStorage om du vill ha kvar den mellan sessioner
        renderUserAddedCourses(userAddedCourses);  // Rendera om användartilläggda kurser
    } else {
        alert('Kurskoden är redan använd!');
    }
});

// Funktion för att lägga till en kurs i användartilläggad lista
function addToUserAdded(course: CourseInfo) {
    if (!userAddedCourses.some(existingCourse => existingCourse.code === course.code)) {
        userAddedCourses.push(course);
        renderUserAddedCourses(userAddedCourses);
    }
}

// Rendera användartilläggda kurser
function renderUserAddedCourses(courses: CourseInfo[]) {
    const userCourseList = document.getElementById('userCourseList') as HTMLElement;
    userCourseList.innerHTML = ''; // Rensa listan innan den fylls

    if (courses.length === 0) {
        userCourseList.innerHTML = '<li>Inga kurser tillagda än.</li>';
    } else {
        courses.forEach(course => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <strong>${course.code}:</strong> ${course.coursename} (${course.progression}) - 
                <a href="${course.syllabus}" target="_blank">Kursplan</a>
            `;
            userCourseList.appendChild(listItem);
        });
    }
}

// Rendera de standardkurser som visas
function renderDefaultCourses(courses: CourseInfo[]): void {
    const courseList = document.getElementById('courseList') as HTMLElement;

    courseList.innerHTML = ''; // Rensa listan innan den fylls

    if (courses.length === 0) {
        courseList.innerHTML = '<li>Inga kurser tillagda än.</li>';
    } else {
        courses.forEach(course => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <strong>${course.code}:</strong> ${course.coursename} (${course.progression}) - 
                <a href="${course.syllabus}" target="_blank">Kursplan</a>
                <button class="add-course-button">Lägg till kurs</button>  <!-- Lägg till knappen -->
            `;
            courseList.appendChild(listItem);

            // Lägg till eventlistener på knappen
            const addButton = listItem.querySelector('.add-course-button') as HTMLElement;
            addButton.addEventListener('click', () => addToUserAdded(course));
        });
    }
}

// Kontrollera om en kurskod redan är tagen av antingen användartilläggda kurser eller defaultkurser
function isCourseCodeTaken(courseCode: string): boolean {
    const allCourses = [
        ...defaultCourses,                  // Alla defaultkurser
        ...userAddedCourses,                // Alla användartilläggda kurser
        ...getCoursesFromLocalStorage()     // Alla kurser sparade i localStorage
    ]; 

    return allCourses.some(course => course.code === courseCode);
}