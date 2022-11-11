const fetchRequest = async (url: string, data?: RequestInit) => {
  const response = await fetch(url, data);
  return await response.json();
};

export default fetchRequest;
