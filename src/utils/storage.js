// src/utils/storage.js
export const saveProject = (elements) => {
    localStorage.setItem('project', JSON.stringify(elements));
  };
  
  export const loadProject = () => {
    const project = localStorage.getItem('project');
    return project ? JSON.parse(project) : [];
  };
  