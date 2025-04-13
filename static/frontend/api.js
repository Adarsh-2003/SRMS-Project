// API Base URL
const API_BASE_URL = '';

// Function to get CSRF token
function getCSRFToken() {
    const name = 'csrftoken';
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// Function to handle login
async function login(username, password) {
    try {
        // First get the CSRF token from the login page
        const loginPage = await fetch('/admin/login/');
        const loginHtml = await loginPage.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(loginHtml, 'text/html');
        const csrfToken = doc.querySelector('[name="csrfmiddlewaretoken"]').value;

        // Now perform the login
        const loginResponse = await fetch('/admin/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': csrfToken,
            },
            body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&csrfmiddlewaretoken=${csrfToken}&next=/`,
            credentials: 'include'
        });

        if (loginResponse.ok) {
            // Check if we can access the admin interface
            const adminResponse = await fetch('/admin/', {
                credentials: 'include'
            });

            if (adminResponse.ok) {
                // Store user data
                const userData = {
                    username: username,
                    is_admin: true
                };
                localStorage.setItem('userData', JSON.stringify(userData));
                return { success: true, user: userData };
            }
        }
        
        return { success: false, error: 'Invalid credentials' };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, error: 'Network error' };
    }
}

// Function to handle logout
async function logout() {
    try {
        const csrfToken = getCSRFToken();
        await fetch('/admin/logout/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': csrfToken,
            },
            credentials: 'include'
        });
        localStorage.removeItem('userData');
        window.location.href = '/admin-login.html';
    } catch (error) {
        console.error('Logout error:', error);
    }
}

// Function to check if user is authenticated
function isAuthenticated() {
    return localStorage.getItem('userData') !== null;
}

// Function to check if user is admin
function isAdmin() {
    const userData = localStorage.getItem('userData');
    if (!userData) return false;
    try {
        const user = JSON.parse(userData);
        return user.is_admin === true;
    } catch {
        return false;
    }
}

// Function to get students
async function getStudents() {
    try {
        const response = await fetch('/api/students/', {
            credentials: 'include'
        });
        if (!response.ok) throw new Error('Failed to fetch students');
        return await response.json();
    } catch (error) {
        console.error('Error fetching students:', error);
        return [];
    }
}

// Function to get subjects
async function getSubjects() {
    try {
        const response = await fetch('/api/subjects/', {
            credentials: 'include'
        });
        if (!response.ok) throw new Error('Failed to fetch subjects');
        return await response.json();
    } catch (error) {
        console.error('Error fetching subjects:', error);
        return [];
    }
}

// Function to get results
async function getResults() {
    try {
        const response = await fetch('/api/results/', {
            credentials: 'include'
        });
        if (!response.ok) throw new Error('Failed to fetch results');
        return await response.json();
    } catch (error) {
        console.error('Error fetching results:', error);
        return [];
    }
}

// Function to get student results
async function getStudentResults(studentId) {
    try {
        const response = await fetch(`/api/results/student_results/?student_id=${studentId}`, {
            credentials: 'include'
        });
        if (!response.ok) throw new Error('Failed to fetch student results');
        return await response.json();
    } catch (error) {
        console.error('Error fetching student results:', error);
        return [];
    }
}

// Function to add a new result
async function addResult(data) {
    try {
        const response = await fetch('/api/results/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken(),
            },
            body: JSON.stringify(data),
            credentials: 'include'
        });
        if (!response.ok) throw new Error('Failed to add result');
        return await response.json();
    } catch (error) {
        console.error('Error adding result:', error);
        throw error;
    }
}

// Function to update a result
async function updateResult(id, data) {
    try {
        const response = await fetch(`/api/results/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken(),
            },
            body: JSON.stringify(data),
            credentials: 'include'
        });
        if (!response.ok) throw new Error('Failed to update result');
        return await response.json();
    } catch (error) {
        console.error('Error updating result:', error);
        throw error;
    }
}

// Function to delete a result
async function deleteResult(id) {
    try {
        const response = await fetch(`/api/results/${id}/`, {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': getCSRFToken(),
            },
            credentials: 'include'
        });
        if (!response.ok) throw new Error('Failed to delete result');
        return true;
    } catch (error) {
        console.error('Error deleting result:', error);
        throw error;
    }
} 