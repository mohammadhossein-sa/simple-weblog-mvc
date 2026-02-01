class BlogView {
  constructor() {
    this.postsContainer = null;
    this.formContainer = null;
    this.loadingIndicator = null;
    this.errorContainer = null;
    this.currentEditId = null;
    this.observers = [];

    // Bind methods
    this.renderPostForm = this.renderPostForm.bind(this);
    this.renderPosts = this.renderPosts.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Observer pattern
  addObserver(observer) {
    this.observers.push(observer);
  }

  notifyObservers(event, data) {
    this.observers.forEach((observer) => {
      if (observer[event]) {
        observer[event](data);
      }
    });
  }

  // Initialization
  initialize() {
    this.setupDOMElements();
    this.renderPostForm();
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

  // Form rendering
  renderPostForm() {
    this.formContainer.innerHTML = `
      <form id="post-form">
        <div>
          <label>Title</label>
          <input id="title" name="title" />
          <div id="title-error" class="error-message"></div>
        </div>

        <div>
          <label>Content</label>
          <textarea id="content" name="content"></textarea>
          <div id="content-error" class="error-message"></div>
        </div>

        <button type="submit">Create Post</button>
      </form>
    `;

    this.attachFormEventListeners();
  }

  attachFormEventListeners() {
    const form = document.getElementById('post-form');
    if (form) {
      form.addEventListener('submit', this.handleSubmit);
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const postData = {
      title: formData.get('title').trim(),
      content: formData.get('content').trim(),
    };

    this.clearFormErrors();

    const errors = this.validateForm(postData);
    if (errors.length > 0) {
      this.displayFormErrors(errors);
      return;
    }

    this.notifyObservers('onPostCreate', postData);
  }

  validateForm(postData) {
    const errors = [];

    if (!postData.title || postData.title.length < 3) {
      errors.push({ field: 'title', message: 'Title must be at least 3 characters long' });
    }

    if (!postData.content || postData.content.length < 10) {
      errors.push({ field: 'content', message: 'Content must be at least 10 characters long' });
    }

    return errors;
  }

  displayFormErrors(errors) {
    errors.forEach((error) => {
      const el = document.getElementById(`${error.field}-error`);
      if (el) el.textContent = error.message;
    });
  }

  clearFormErrors() {
    document
      .querySelectorAll('.error-message')
      .forEach((el) => (el.textContent = ''));
  }

  // Posts rendering (placeholder)
  renderPosts(posts) {}
}

window.viewExplanation = viewExplanation;
window.BlogView = BlogView;
