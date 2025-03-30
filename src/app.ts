import { CourseInfo, addCourse, renderCourses } from './courses';

document.getElementById('courseForm')?.addEventListener('submit', (event: Event) => {
    event.preventDefault();
    
    // Hämta input-värdena
    const code = (document.getElementById('code') as HTMLInputElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const progression = (document.getElementById('progression') as HTMLSelectElement).value as 'A' | 'B' | 'C';
    const syllabus = (document.getElementById('syllabus') as HTMLInputElement).value;
    
    // Skapa ett nytt CourseInfo-objekt
    const newCourse: CourseInfo = {
        code,
        name,
        progression,
        syllabus
    };
    
    // Lägg till kursen
    addCourse(newCourse);
    
    // Rendera kurser
    renderCourses();
});

// När sidan laddas, rendera kurser från localStorage
window.onload = renderCourses;
