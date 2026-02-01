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
        <input id="title" name="title" placeholder="Title" />
        <textarea id="content" name="content" placeholder="Content"></textarea>
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

    const data = new FormData(e.target);
    this.notifyObservers('onPostCreate', {
      title: data.get('title').trim(),
      content: data.get('content').trim(),
    });
  }

  // Posts rendering
  renderPosts(posts) {
    if (!posts || posts.length === 0) {
      this.postsContainer.innerHTML = '<p>No posts yet</p>';
      return;
    }

    this.postsContainer.innerHTML = posts
      .map((post) => this.renderPostCard(post))
      .join('');

    this.attachPostEventListeners();
  }

  renderPostCard(post) {
    return `
      <article class="post-card" data-post-id="${post.id}">
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <button data-action="edit" data-post-id="${post.id}">Edit</button>
        <button data-action="delete" data-post-id="${post.id}">Delete</button>
      </article>
    `;
  }

  attachPostEventListeners() {
    this.postsContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;

      const postId = Number(btn.dataset.postId);
      const action = btn.dataset.action;

      if (action === 'edit') {
        this.notifyObservers('onPostEdit', postId);
      }

      if (action === 'delete') {
        this.notifyObservers('onPostDelete', postId);
      }
    });
  }
}

window.viewExplanation = viewExplanation;
window.BlogView = BlogView;
