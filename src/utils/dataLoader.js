// Data loading utility functions
export const loadData = async (dataPath) => {
  try {
    const response = await fetch(dataPath);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading data:', error);
    throw error;
  }
};

export default {
  loadData
};
