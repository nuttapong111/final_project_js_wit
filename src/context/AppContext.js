import React, { createContext, useContext, useReducer, useEffect } from 'react';
import apiService from '../services/api';

// Initial state
const initialState = {
  tasks: [],
  quotes: [],
  user: {
    name: 'ผู้ใช้',
    email: 'user@example.com',
    avatar: 'https://i.pravatar.cc/150?u=user'
  },
  searchQuery: '',
  isLoading: false,
  error: null,
  currentView: 'dashboard'
};

// Action types
export const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_TASKS: 'SET_TASKS',
  ADD_TASK: 'ADD_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
  DELETE_TASK: 'DELETE_TASK',
  SET_QUOTES: 'SET_QUOTES',
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  SET_CURRENT_VIEW: 'SET_CURRENT_VIEW',
  UPDATE_USER: 'UPDATE_USER'
};

// Reducer function
function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };
    
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    
    case ACTIONS.SET_TASKS:
      return { ...state, tasks: action.payload, isLoading: false };
    
    case ACTIONS.ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };
    
    case ACTIONS.UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        )
      };
    
    case ACTIONS.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    
    case ACTIONS.SET_QUOTES:
      return { ...state, quotes: action.payload, isLoading: false };
    
    case ACTIONS.SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };
    
    case ACTIONS.SET_CURRENT_VIEW:
      return { ...state, currentView: action.payload };
    
    case ACTIONS.UPDATE_USER:
      return { ...state, user: { ...state.user, ...action.payload } };
    
    default:
      return state;
  }
}

// Create context
const AppContext = createContext();

// Context provider component
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      
      // Load tasks from localStorage
      const savedTasks = localStorage.getItem('dreamAppTasks');
      if (savedTasks) {
        dispatch({ type: ACTIONS.SET_TASKS, payload: JSON.parse(savedTasks) });
      }
      
      // Load quotes from API
      await loadQuotes();
      
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
    }
  };

  const loadQuotes = async () => {
    try {
      const result = await apiService.getQuotes(10);
      if (result.success) {
        dispatch({ type: ACTIONS.SET_QUOTES, payload: result.data.results });
      } else {
        console.error('Error loading quotes:', result.error);
      }
    } catch (error) {
      console.error('Error loading quotes:', error);
    }
  };

  const addTask = (task) => {
    const newTask = {
      id: Date.now(),
      ...task,
      createdAt: new Date().toISOString(),
      completed: false
    };
    dispatch({ type: ACTIONS.ADD_TASK, payload: newTask });
    
    // Save to localStorage
    const updatedTasks = [...state.tasks, newTask];
    localStorage.setItem('dreamAppTasks', JSON.stringify(updatedTasks));
  };

  const updateTask = (taskId, updates) => {
    const updatedTask = state.tasks.find(task => task.id === taskId);
    if (updatedTask) {
      const newTask = { ...updatedTask, ...updates };
      dispatch({ type: ACTIONS.UPDATE_TASK, payload: newTask });
      
      // Save to localStorage
      const updatedTasks = state.tasks.map(task =>
        task.id === taskId ? newTask : task
      );
      localStorage.setItem('dreamAppTasks', JSON.stringify(updatedTasks));
    }
  };

  const deleteTask = (taskId) => {
    dispatch({ type: ACTIONS.DELETE_TASK, payload: taskId });
    
    // Save to localStorage
    const updatedTasks = state.tasks.filter(task => task.id !== taskId);
    localStorage.setItem('dreamAppTasks', JSON.stringify(updatedTasks));
  };

  const setSearchQuery = (query) => {
    dispatch({ type: ACTIONS.SET_SEARCH_QUERY, payload: query });
  };

  const setCurrentView = (view) => {
    dispatch({ type: ACTIONS.SET_CURRENT_VIEW, payload: view });
  };

  const updateUser = (userData) => {
    dispatch({ type: ACTIONS.UPDATE_USER, payload: userData });
  };

  const value = {
    ...state,
    addTask,
    updateTask,
    deleteTask,
    setSearchQuery,
    setCurrentView,
    updateUser,
    loadQuotes
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use context
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
