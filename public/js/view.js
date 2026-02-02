class BlogView {
  constructor() {
    this.postsContainer = null;
    this.formContainer = null;
    this.loadingIndicator = null;
    this.errorContainer = null;
    this.currentEditId = null;
    this.observers = [];
    this.editModal = null;
    this.editFormContainer = null;

    // Bind methods to maintain context
    this.renderPosts = this.renderPosts.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.showEditModal = this.showEditModal.bind(this);
    this.hideEditModal = this.hideEditModal.bind(this);
    this.renderEditForm = this.renderEditForm.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
    this.showLoading = this.showLoading.bind(this);
    this.hideLoading = this.hideLoading.bind(this);
    this.showError = this.showError.bind(this);
    this.hideError = this.hideError.bind(this);
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notifyObservers(event, data) {
    this.observers.forEach((observer) => {
      if (observer[event]) {
        observer[event](data);
      }
    });
  }

  initialize() {
    this.setupDOMElements();
    this.notifyObservers('onViewInitialized');
  }

  setupDOMElements() {
    this.postsContainer = document.getElementById('posts-container');
    this.formContainer = document.getElementById('form-container');
    this.loadingIndicator = document.getElementById('loading-indicator');
    this.errorContainer = document.getElementById('error-container');
    this.editModal = document.getElementById('edit-modal');
    this.editFormContainer = document.getElementById('edit-form-container');

    if (
      !this.postsContainer ||
      !this.formContainer ||
      !this.loadingIndicator ||
      !this.errorContainer ||
      !this.editModal ||
      !this.editFormContainer
    ) {
      throw new Error('Required DOM elements not found. Check HTML structure.');
    }
  }

  renderPosts(posts) {
    if (!posts || posts.length === 0) {
      this.postsContainer.innerHTML = `
        <div class="no-posts">
          <h3>No blog posts yet</h3>
          <p>Be the first to create a blog post!</p>
        </div>
      `;
      return;
    }

    this.postsContainer.innerHTML = posts
      .map((post) => this.renderPostCard(post))
      .join('');

    this.attachPostEventListeners();
  }

  renderPostCard(post) {
    const formattedDate = this.formatDate(post.createdAt);
    const isUpdated = post.updatedAt !== post.createdAt;

    return `
      <article class="post-card" data-post-id="${post.id}">
        <div class="post-header">
          <h2 class="post-title">${this.escapeHtml(post.title)}</h2>
          <div class="post-meta">
            <span class="post-date">${formattedDate}</span>
            ${isUpdated ? '<span class="post-updated">Updated</span>' : ''}
          </div>
        </div>
        <div class="post-content">
          ${this.escapeHtml(post.content)}
        </div>
        <div class="post-actions">
          <button class="btn btn-edit" data-action="edit" data-post-id="${post.id}">
            ✏️ Edit
          </button>
          <button class="btn btn-delete" data-action="delete" data-post-id="${post.id}">
            🗑️ Delete
          </button>
        </div>
      </article>
    `;
  }

  attachPostEventListeners() {
    this.postsContainer.addEventListener('click', (e) => {
      const action = e.target.closest('[data-action]');
      if (!action) return;

      const postId = Number(action.dataset.postId);

      if (action.dataset.action === 'edit') {
        this.handleEdit(postId);
      }

      if (action.dataset.action === 'delete') {
        this.handleDelete(postId);
      }
    });
  }

  attachFormEventListeners() {
    const form = document.getElementById('post-form');
    const cancelEdit = document.getElementById('cancel-edit');

    if (form) {
      form.addEventListener('submit', this.handleSubmit);
    }

    if (cancelEdit) {
      cancelEdit.addEventListener('click', () => this.cancelEdit());
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

    if (this.currentEditId) {
      this.notifyObservers('onPostUpdate', {
        id: this.currentEditId,
        ...postData,
      });
    } else {
      this.notifyObservers('onPostCreate', postData);
    }
  }

  handleEdit(postId) {
    this.notifyObservers('onPostEdit', postId);
  }

  handleDelete(postId) {
    const confirmed = confirm('Are you sure you want to delete this post?');
    if (confirmed) {
      this.notifyObservers('onPostDelete', postId);
    }
  }

  showEditModal(postData) {
    this.currentEditId = postData.id;
    this.renderEditForm(postData);
    this.editModal.style.display = 'block';
  }

  hideEditModal() {
    this.editModal.style.display = 'none';
    this.currentEditId = null;
  }

  renderEditForm(postData) {
    this.editFormContainer.innerHTML = `
      <form id="edit-post-form" class="post-form">
        <div class="form-group">
          <label>Title</label>
          <input id="edit-title" value="${this.escapeHtml(postData.title)}" />
          <div id="edit-title-error" class="error-message"></div>
        </div>

        <div class="form-group">
          <label>Content</label>
          <textarea id="edit-content">${this.escapeHtml(postData.content)}</textarea>
          <div id="edit-content-error" class="error-message"></div>
        </div>

        <button type="submit" class="btn btn-primary">Save</button>
        <button type="button" id="close-edit-modal" class="btn btn-secondary">Cancel</button>
      </form>
    `;

    document
      .getElementById('edit-post-form')
      .addEventListener('submit', this.handleEditSubmit);

    document
      .getElementById('close-edit-modal')
      .addEventListener('click', this.hideEditModal);
  }

  handleEditSubmit(e) {
    e.preventDefault();

    this.clearEditFormErrors();

    const title = document.getElementById('edit-title').value.trim();
    const content = document.getElementById('edit-content').value.trim();

    const postData = { title, content };
    const errors = this.validateForm(postData);

    if (errors.length > 0) {
      this.displayEditFormErrors(errors);
      return;
    }

    this.notifyObservers('onPostUpdate', {
      id: this.currentEditId,
      ...postData,
    });

    this.hideEditModal();
  }

  displayEditFormErrors(errors) {
    errors.forEach((error) => {
      const el = document.getElementById(`edit-${error.field}-error`);
      if (el) el.textContent = error.message;
    });
  }

  clearEditFormErrors() {
    document
      .querySelectorAll('#edit-form-container .error-message')
      .forEach((el) => (el.textContent = ''));
  }

  cancelEdit() {
    this.currentEditId = null;
    // this.renderPostForm(); // هنوز پیاده‌سازی نشده
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
    document.querySelectorAll('.error-message').forEach((el) => (el.textContent = ''));
  }

  showLoading() {
    this.loadingIndicator.style.display = 'block';
    this.hideError();
  }

  hideLoading() {
    this.loadingIndicator.style.display = 'none';
  }

  showError(message) {
    this.errorContainer.innerHTML = `
      <div class="error-message">
        <span class="error-icon">⚠️</span>
        <span class="error-text">${this.escapeHtml(message)}</span>
        <button class="error-close" onclick="this.parentElement.parentElement.style.display='none'">×</button>
      </div>
    `;
    this.errorContainer.style.display = 'block';
  }

  hideError() {
    this.errorContainer.style.display = 'none';
    this.errorContainer.innerHTML = ''; // پاک کردن محتوای قبلی
  }

  showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
      <span class="success-icon">✅</span>
      <span class="success-text">${this.escapeHtml(message)}</span>
    `;

    document.body.appendChild(successDiv);

    setTimeout(() => {
      successDiv.remove();
    }, 3000);
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

window.BlogView = BlogView;