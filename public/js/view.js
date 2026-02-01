class BlogView {
  constructor() {
    // DOM references
    this.postsContainer = null;
    this.formContainer = null;
    this.loadingIndicator = null;
    this.errorContainer = null;

    // State
    this.currentEditId = null;

    // Observers
    this.observers = [];
  }

  // Observer pattern
  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    this.observers = this.observers.filter(o => o !== observer);
  }

  notifyObservers(event, data) {
    this.observers.forEach(observer => {
      if (observer[event]) {
        observer[event](data);
      }
    });
  }

  // Initialization
  initialize() {
    this.setupDOMElements();
    this.notifyObservers('onViewInitialized');
  }

  setupDOMElements() {
    this.postsContainer = document.getElementById('posts-container');
    this.formContainer = document.getElementById('form-container');
    this.loadingIndicator = document.getElementById('loading-indicator');
    this.errorContainer = document.getElementById('error-container');

    if (
      !this.postsContainer ||
      !this.formContainer ||
      !this.loadingIndicator ||
      !this.errorContainer
    ) {
      throw new Error('Required DOM elements not found');
    }
  }
}

window.viewExplanation = viewExplanation;
window.BlogView = BlogView;
