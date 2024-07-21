// src/utils/storage.js
export const loadProjectFromStorage = () => {
  try {
    const project = localStorage.getItem('project');
    return project ? JSON.parse(project) : [];
  } catch (error) {
    console.error('Error loading project from storage:', error);
    return [];
  }
};

export const saveProject = (elements) => {
  localStorage.setItem('project', JSON.stringify(elements));
};
