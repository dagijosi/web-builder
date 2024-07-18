export const saveProject = (elements) => {
  localStorage.setItem('project', JSON.stringify(elements));
};

export const loadProjectFromStorage = () => {
  const project = localStorage.getItem('project');
  return project ? JSON.parse(project) : [];
};