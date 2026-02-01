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

  validatePostData(postData) {
    const errors = [];

    if (!postData.title || postData.title.trim().length < 3) {
      errors.push('Title must be at least 3 characters long');
    }

    if (!postData.content || postData.content.trim().length < 10) {
      errors.push('Content must be at least 10 characters long');
    }

    return errors;
  }

  async createPost(postData) {
    this.setLoading(true);

    try {
      const validationErrors = this.validatePostData(postData);
      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join('. '));
      }

      const response = await fetch(this.apiBaseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newPost = await response.json();
      this.posts.unshift(newPost);
      this.notifyObservers('onPostCreated', newPost);
      return newPost;
    } catch (error) {
      this.notifyObservers('onError', error.message);
      throw error;
    } finally {
      this.setLoading(false);
    }
  }

  async updatePost(postId, postData) {
    this.setLoading(true);

    try {
      const validationErrors = this.validatePostData(postData);
      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join('. '));
      }

      const response = await fetch(`${this.apiBaseUrl}/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedPost = await response.json();
      this.posts = this.posts.map(post =>
        post.id === postId ? updatedPost : post
      );

      this.notifyObservers('onPostUpdated', updatedPost);
      return updatedPost;
    } catch (error) {
      this.notifyObservers('onError', error.message);
      throw error;
    } finally {
      this.setLoading(false);
    }
  }

  async deletePost(postId) {
    this.setLoading(true);

    try {
      const response = await fetch(`${this.apiBaseUrl}/${postId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      this.posts = this.posts.filter(post => post.id !== postId);
      this.notifyObservers('onPostDeleted', postId);
    } catch (error) {
      this.notifyObservers('onError', error.message);
      throw error;
    } finally {
      this.setLoading(false);
    }
  }

  getPostById(postId) {
    return this.posts.find(post => post.id === postId);
  }
}

window.BlogModel = BlogModel;
