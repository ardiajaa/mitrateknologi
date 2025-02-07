// database.js

// Data proyek awal
const initialProjects = [
    { id: 1, name: 'Website Development', status: 'progress', deadline: '2024-03-01' },
    { id: 2, name: 'Mobile App', status: 'pending', deadline: '2024-03-15' },
    { id: 3, name: 'System Integration', status: 'complete', deadline: '2024-02-28' }
];

// Data pengguna
const users = [
    { username: 'ardi', password: 'ardi' },
    { username: 'admin', password: 'admin' },
    { username: 'mitratek', password: 'mitratek' },
    { username: 'jurit', password: 'jurit' },
    { username: 'tkj', password: 'tkj' }
];

class Database {
    constructor() {
        this.initializeProjects();
    }

    // Menginisialisasi proyek jika belum ada di localStorage
    initializeProjects() {
        if (!localStorage.getItem('projects')) {
            localStorage.setItem('projects', JSON.stringify(initialProjects));
        }
    }

    // Mengambil semua proyek dari localStorage
    getAllProjects() {
        return JSON.parse(localStorage.getItem('projects')) || [];
    }

    // Menambah proyek baru ke localStorage
    addProject(project) {
        const projects = this.getAllProjects();
        const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
        const newProject = { ...project, id: newId };
        projects.push(newProject);
        localStorage.setItem('projects', JSON.stringify(projects));
        return newProject;
    }

    // Memperbarui proyek yang sudah ada di localStorage
    updateProject(id, updatedProject) {
        const projects = this.getAllProjects();
        const index = projects.findIndex(p => p.id === id);
        if (index !== -1) {
            projects[index] = { ...projects[index], ...updatedProject };
            localStorage.setItem('projects', JSON.stringify(projects));
            return projects[index];
        }
        return null;
    }

    // Menghapus proyek dari localStorage
    deleteProject(id) {
        const projects = this.getAllProjects();
        const filteredProjects = projects.filter(p => p.id !== id);
        localStorage.setItem('projects', JSON.stringify(filteredProjects));
    }

    // Mencari proyek berdasarkan nama
    searchProjects(searchTerm) {
        const projects = this.getAllProjects();
        return projects.filter(project => 
            project.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    // Memeriksa username dan password
    authenticateUser(username, password) {
        return users.find(u => u.username === username && u.password === password);
    }

    // Mengembalikan data ke kondisi awal (untuk keperluan testing)
    resetToInitial() {
        localStorage.setItem('projects', JSON.stringify(initialProjects));
    }
}

// Membuat instance database untuk digunakan
const db = new Database();
export default db;