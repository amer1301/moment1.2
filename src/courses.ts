export interface CourseInfo {
    code: string;        // Kurskod
    coursename: string;  // Kursnamn
    progression: 'A' | 'B' | 'C';  // Progression (A, B, C)
    syllabus: string;    // Länk till kursplan
}

// Funktion för att hämta kurser från localStorage
export function getCoursesFromLocalStorage(): CourseInfo[] {
    const storedCourses = localStorage.getItem('courses');
    if (storedCourses) {
        return JSON.parse(storedCourses); // Om kurser finns, returnera dem som ett objekt
    } else {
        return []; // Om inga kurser finns, returnera en tom lista
    }
}

// Funktion för att spara kurser till localStorage
export function saveCoursesToLocalStorage(courses: CourseInfo[]): void {
    localStorage.setItem('courses', JSON.stringify(courses)); // Spara kurser som en JSON-sträng
}

// Funktion för att lägga till en kurs
export function addCourse(course: CourseInfo): void {
    const courses = getCoursesFromLocalStorage();  // Hämta alla kurser från localStorage
    // Kontrollera att kurskoden är unik
    if (courses.some(existingCourse => existingCourse.code === course.code)) {
        alert('Kurskoden är redan använd!');
        return;
    }
    courses.push(course);  // Lägg till den nya kursen i listan
    saveCoursesToLocalStorage(courses);  // Spara uppdaterad kurslista till localStorage
}

// Funktion för att rendera kurser på sidan
export function renderCourses(courses: CourseInfo[]): void {
    const courseList = document.getElementById('courseList') as HTMLElement;

    // Rensa listan innan den fylls med nya kurser
    courseList.innerHTML = '';

    if (courses.length === 0) {
        courseList.innerHTML = '<li>Inga kurser tillagda än.</li>';
    } else {
        // Lägg till varje kurs som en listpost
        courses.forEach(course => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <strong>${course.code}:</strong> ${course.coursename} (${course.progression}) - 
                <a href="${course.syllabus}" target="_blank">Kursplan</a>
            `;
            courseList.appendChild(listItem);
        });
    }
}
