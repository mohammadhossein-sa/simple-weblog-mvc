class BlogModel {
  constructor() {
    this.posts = [];
    this.observers = [];
    this.apiBaseUrl = 'http://localhost:3001/api/posts';
    this.isLoading = false;
  }
}

window.BlogModel = BlogModel;
