// TypeScript interface för kursinformationen
export interface CourseInfo {
    code: string;        // Kurskod
    name: string;        // Kursnamn
    progression: 'A' | 'B' | 'C';  // Progression (A, B, C)
    syllabus: string;    // Länk till kursplan
}

// Funktion för att hämta kurser från localStorage
export function getCoursesFromLocalStorage(): CourseInfo[] {
    const storedCourses = localStorage.getItem('courses');
    if (!storedCourses) {
        return [];
    }
    try {
        return JSON.parse(storedCourses) as CourseInfo[];
    } catch (error) {
        console.error('Fel vid inläsning av kursdata från localStorage:', error);
        return [];
    }
}

// Funktion för att spara kurser till localStorage
export function saveCoursesToLocalStorage(courses: CourseInfo[]): void {
    localStorage.setItem('courses', JSON.stringify(courses));
}

// Funktion för att lägga till en kurs
export function addCourse(course: CourseInfo): void {
    const courses = getCoursesFromLocalStorage();
    // Kontrollera att kurskoden är unik
    if (courses.some(existingCourse => existingCourse.code === course.code)) {
        alert('Kurskoden är redan använd!');
        return;
    }
    courses.push(course);
    saveCoursesToLocalStorage(courses);
}

// Funktion för att rendera kurser på sidan
export function renderCourses(): void {
    const courses = getCoursesFromLocalStorage();
    const courseList = document.getElementById('courseList') as HTMLElement;

    // Rensa listan innan den fylls med nya kurser
    courseList.innerHTML = '';
    
    if (courses.length === 0) {
        courseList.innerHTML = '<li>Inga kurser tillagda än.</li>';
    } else {
        courses.forEach(course => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <strong>${course.code}:</strong> ${course.name} (${course.progression}) - 
                <a href="${course.syllabus}" target="_blank">Kursplan</a>
            `;
            courseList.appendChild(listItem);
        });
    }
}
