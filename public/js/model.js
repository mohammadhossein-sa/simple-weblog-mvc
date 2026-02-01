class BlogModel {
  constructor() {
    this.posts = [];
    this.observers = [];
    this.apiBaseUrl = 'http://localhost:3001/api/posts';
    this.isLoading = false;
  }

  // Observer pattern implementation
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
}

window.BlogModel = BlogModel;
