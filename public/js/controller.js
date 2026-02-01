class BlogController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.isInitialized = false;

    this.initialize = this.initialize.bind(this);
    this.handlePostCreate = this.handlePostCreate.bind(this);
    this.handlePostUpdate = this.handlePostUpdate.bind(this);
    this.handlePostDelete = this.handlePostDelete.bind(this);
    this.handlePostEdit = this.handlePostEdit.bind(this);
    this.handleLoadingStart = this.handleLoadingStart.bind(this);
    this.handleLoadingEnd = this.handleLoadingEnd.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handlePostsLoaded = this.handlePostsLoaded.bind(this);
    this.handlePostCreated = this.handlePostCreated.bind(this);
    this.handlePostUpdated = this.handlePostUpdated.bind(this);
    this.handlePostDeleted = this.handlePostDeleted.bind(this);
  }

  async initialize() {
    if (this.isInitialized) return;

    this.setupModelObservers();
    this.setupViewObservers();

    await this.view.initialize();
    await this.loadPosts();

    this.isInitialized = true;
  }

  setupModelObservers() {
    this.model.addObserver({
      onPostsLoaded: this.handlePostsLoaded,
      onPostCreated: this.handlePostCreated,
      onPostUpdated: this.handlePostUpdated,
      onPostDeleted: this.handlePostDeleted,
      onError: this.handleError,
      onLoadingStart: this.handleLoadingStart,
      onLoadingEnd: this.handleLoadingEnd,
    });
  }

  setupViewObservers() {
    this.view.addObserver({
      onViewInitialized: this.handleViewInitialized,
      onPostCreate: this.handlePostCreate,
      onPostUpdate: this.handlePostUpdate,
      onPostDelete: this.handlePostDelete,
      onPostEdit: this.handlePostEdit,
    });
  }

  async loadPosts() {
    await this.model.loadPosts();
  }

  async handlePostCreate(postData) {
    await this.model.createPost(postData);
    this.view.showSuccess('Post created successfully');
  }

  handleViewInitialized() {}

  handlePostsLoaded(posts) {
    this.view.renderPosts(posts);
  }

  handlePostCreated() {
    this.view.clearForm();
    this.loadPosts();
  }

  handleLoadingStart() {
    this.view.showLoading();
  }

  handleLoadingEnd() {
    this.view.hideLoading();
  }

  handleError(message) {
    this.view.showError(message);
  }
}

window.BlogController = BlogController;
