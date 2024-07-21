// src/utils/fileHandlers.js
export const saveProjectToFile = (elements) => {
    const dataStr = JSON.stringify(elements);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'project.json';
    a.click();
    URL.revokeObjectURL(url);
  };
  
  export const loadProjectFromFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const project = JSON.parse(event.target.result);
          resolve(project);
        } catch (error) {
          reject(new Error('Invalid project file.'));
        }
      };
      reader.onerror = () => {
        reject(new Error('Failed to read the file.'));
      };
      reader.readAsText(file);
    });
  };
  