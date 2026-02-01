class BlogModel {
  constructor() {
    this.posts = [];
    this.observers = [];
    this.apiBaseUrl = 'http://localhost:3001/api/posts';
    this.isLoading = false;
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notifyObservers(event, data) {
    this.observers.forEach(observer => {
      if (observer[event]) {
        observer[event](data);
      }
    });
  }

  setLoading(loading) {
    this.isLoading = loading;
    this.notifyObservers('onLoadingChange', loading);
  }

  async loadPosts() {
    this.setLoading(true);
    this.notifyObservers('onLoadingStart');

    try {
      const response = await fetch(this.apiBaseUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      this.posts = await response.json();
      this.notifyObservers('onPostsLoaded', this.posts);
      return this.posts;
    } catch (error) {
      this.notifyObservers('onError', error.message);
      throw error;
    } finally {
      this.setLoading(false);
      this.notifyObservers('onLoadingEnd');
    }
  }
}

window.BlogModel = BlogModel;
