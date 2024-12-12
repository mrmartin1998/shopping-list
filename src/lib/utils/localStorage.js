// Local Storage Keys
const LISTS_KEY = 'shopping_lists';

// Get all lists from localStorage
export const getStoredLists = () => {
  if (typeof window === 'undefined') return [];
  
  try {
    const lists = localStorage.getItem(LISTS_KEY);
    return lists ? JSON.parse(lists) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

// Save lists to localStorage
export const saveStoredLists = (lists) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(LISTS_KEY, JSON.stringify(lists));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

// Add a new list
export const addStoredList = (list) => {
  const lists = getStoredLists();
  lists.push({
    ...list,
    items: [],
    createdAt: new Date().toISOString()
  });
  saveStoredLists(lists);
};

// Add item to a list
export const addItemToList = (listId, item) => {
  const lists = getStoredLists();
  const listIndex = lists.findIndex(l => l.id === listId);
  if (listIndex !== -1) {
    if (!lists[listIndex].items) lists[listIndex].items = [];
    lists[listIndex].items.push({
      ...item,
      id: Date.now().toString(),
      completed: false
    });
    saveStoredLists(lists);
  }
};

// Update an item in a list
export const updateListItem = (listId, updatedItem) => {
  const lists = getStoredLists();
  const listIndex = lists.findIndex(l => l.id === listId);
  if (listIndex !== -1) {
    const itemIndex = lists[listIndex].items.findIndex(i => i.id === updatedItem.id);
    if (itemIndex !== -1) {
      lists[listIndex].items[itemIndex] = updatedItem;
      saveStoredLists(lists);
    }
  }
};

// Delete an item from a list
export const deleteListItem = (listId, itemId) => {
  const lists = getStoredLists();
  const listIndex = lists.findIndex(l => l.id === listId);
  if (listIndex !== -1) {
    lists[listIndex].items = lists[listIndex].items.filter(i => i.id !== itemId);
    saveStoredLists(lists);
  }
};

// Update an existing list
export const updateStoredList = (updatedList) => {
  const lists = getStoredLists();
  const index = lists.findIndex(l => l.id === updatedList.id);
  if (index !== -1) {
    lists[index] = {
      ...lists[index],
      ...updatedList,
      items: updatedList.items || lists[index].items
    };
    saveStoredLists(lists);
  }
};

// Delete a list
export const deleteStoredList = (listId) => {
  const lists = getStoredLists();
  const filteredLists = lists.filter(l => l.id !== listId);
  saveStoredLists(filteredLists);
};
