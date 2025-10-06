// API Service for external data fetching
class ApiService {
  constructor() {
    this.baseUrls = {
      quotes: 'https://api.quotable.io',
      jsonplaceholder: 'https://jsonplaceholder.typicode.com'
    };
  }

  // Generic fetch method with error handling
  async fetchData(url, options = {}) {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('API Error:', error);
      return { success: false, error: error.message };
    }
  }

  // Quotes API methods
  async getRandomQuote() {
    const url = `${this.baseUrls.quotes}/random`;
    return await this.fetchData(url);
  }

  async getQuotes(limit = 10, page = 1) {
    const url = `${this.baseUrls.quotes}/quotes?limit=${limit}&page=${page}`;
    return await this.fetchData(url);
  }

  async searchQuotes(query, limit = 10) {
    const url = `${this.baseUrls.quotes}/search/quotes?query=${encodeURIComponent(query)}&limit=${limit}`;
    return await this.fetchData(url);
  }

  async getQuoteById(id) {
    const url = `${this.baseUrls.quotes}/quotes/${id}`;
    return await this.fetchData(url);
  }

  // JSONPlaceholder API methods (for demo data)
  async getUsers() {
    const url = `${this.baseUrls.jsonplaceholder}/users`;
    return await this.fetchData(url);
  }

  async getUserById(id) {
    const url = `${this.baseUrls.jsonplaceholder}/users/${id}`;
    return await this.fetchData(url);
  }

  async getPosts(limit = 10) {
    const url = `${this.baseUrls.jsonplaceholder}/posts?_limit=${limit}`;
    return await this.fetchData(url);
  }

  async getPostById(id) {
    const url = `${this.baseUrls.jsonplaceholder}/posts/${id}`;
    return await this.fetchData(url);
  }

  async getComments(postId) {
    const url = `${this.baseUrls.jsonplaceholder}/posts/${postId}/comments`;
    return await this.fetchData(url);
  }

  // Weather API (using OpenWeatherMap as example)
  async getWeather(city, apiKey) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=th`;
    return await this.fetchData(url);
  }

  // News API (using NewsAPI as example)
  async getNews(apiKey, country = 'th', category = 'general') {
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
    return await this.fetchData(url);
  }

  // GitHub API methods
  async getGitHubUser(username) {
    const url = `https://api.github.com/users/${username}`;
    return await this.fetchData(url);
  }

  async getGitHubRepos(username, perPage = 10) {
    const url = `https://api.github.com/users/${username}/repos?per_page=${perPage}&sort=updated`;
    return await this.fetchData(url);
  }

  // Local storage methods for data persistence
  saveToLocalStorage(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return { success: true };
    } catch (error) {
      console.error('LocalStorage Error:', error);
      return { success: false, error: error.message };
    }
  }

  loadFromLocalStorage(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? { success: true, data: JSON.parse(data) } : { success: false, data: null };
    } catch (error) {
      console.error('LocalStorage Error:', error);
      return { success: false, error: error.message };
    }
  }

  removeFromLocalStorage(key) {
    try {
      localStorage.removeItem(key);
      return { success: true };
    } catch (error) {
      console.error('LocalStorage Error:', error);
      return { success: false, error: error.message };
    }
  }

  // Utility methods
  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Batch API calls
  async batchFetch(urls) {
    try {
      const promises = urls.map(url => this.fetchData(url));
      const results = await Promise.allSettled(promises);
      
      return results.map((result, index) => ({
        url: urls[index],
        success: result.status === 'fulfilled',
        data: result.status === 'fulfilled' ? result.value.data : null,
        error: result.status === 'rejected' ? result.reason : null
      }));
    } catch (error) {
      console.error('Batch fetch error:', error);
      return { success: false, error: error.message };
    }
  }

  // Retry mechanism for failed requests
  async fetchWithRetry(url, options = {}, maxRetries = 3) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      const result = await this.fetchData(url, options);
      
      if (result.success) {
        return result;
      }
      
      lastError = result.error;
      
      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
        console.log(`Retry attempt ${attempt} after ${delay}ms`);
        await this.delay(delay);
      }
    }
    
    return { success: false, error: `Failed after ${maxRetries} attempts: ${lastError}` };
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
