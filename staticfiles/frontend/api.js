// API base URL
const API_BASE_URL = 'http://localhost:8000/api';

// Authentication functions
function getAuthHeaders() {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Token ${token}` : '',
  };
}

// Login function
async function login(username, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    
    if (!response.ok) {
      throw new Error('Login failed');
    }
    
    const data = await response.json();
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('userRole', data.is_admin ? 'admin' : 'student');
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

// Logout function
function logout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userRole');
  window.location.href = '/admin-login.html';
}

// Check if user is authenticated
function isAuthenticated() {
  return !!localStorage.getItem('authToken');
}

// Check if user is admin
function isAdmin() {
  return localStorage.getItem('userRole') === 'admin';
}

// API functions for Students
async function getStudents() {
  try {
    const response = await fetch(`${API_BASE_URL}/students/`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch students');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
}

async function createStudent(studentData) {
  try {
    const response = await fetch(`${API_BASE_URL}/students/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(studentData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create student');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating student:', error);
    throw error;
  }
}

async function updateStudent(id, studentData) {
  try {
    const response = await fetch(`${API_BASE_URL}/students/${id}/`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(studentData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update student');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating student:', error);
    throw error;
  }
}

async function deleteStudent(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/students/${id}/`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete student');
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting student:', error);
    throw error;
  }
}

// API functions for Subjects
async function getSubjects() {
  try {
    const response = await fetch(`${API_BASE_URL}/subjects/`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch subjects');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching subjects:', error);
    throw error;
  }
}

async function createSubject(subjectData) {
  try {
    const response = await fetch(`${API_BASE_URL}/subjects/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(subjectData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create subject');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating subject:', error);
    throw error;
  }
}

async function updateSubject(id, subjectData) {
  try {
    const response = await fetch(`${API_BASE_URL}/subjects/${id}/`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(subjectData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update subject');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating subject:', error);
    throw error;
  }
}

async function deleteSubject(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/subjects/${id}/`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete subject');
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting subject:', error);
    throw error;
  }
}

// API functions for Results
async function getResults() {
  try {
    const response = await fetch(`${API_BASE_URL}/results/`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch results');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching results:', error);
    throw error;
  }
}

async function getStudentResults(studentId) {
  try {
    const response = await fetch(`${API_BASE_URL}/results/student_results/?student_id=${studentId}`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch student results');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching student results:', error);
    throw error;
  }
}

async function createResult(resultData) {
  try {
    const response = await fetch(`${API_BASE_URL}/results/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(resultData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create result');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating result:', error);
    throw error;
  }
}

async function updateResult(id, resultData) {
  try {
    const response = await fetch(`${API_BASE_URL}/results/${id}/`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(resultData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update result');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating result:', error);
    throw error;
  }
}

async function deleteResult(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/results/${id}/`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete result');
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting result:', error);
    throw error;
  }
} 