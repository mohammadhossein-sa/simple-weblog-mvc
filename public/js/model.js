class BlogModel {
  constructor() {
    this.posts = [];
    this.observers = [];
    // آدرس API داینامیک - برای لوکال و هاست زنده کار می‌کند
    this.apiBaseUrl = `${window.location.origin}/api/posts`;
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
      console.log('[MODEL] Loading posts from:', this.apiBaseUrl);
      const response = await fetch(this.apiBaseUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      this.posts = await response.json();
      console.log('[MODEL] Posts loaded successfully:', this.posts.length);
      this.notifyObservers('onPostsLoaded', this.posts);
      return this.posts;
    } catch (error) {
      console.error('[MODEL] Load posts failed:', error.message);
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
      errors.push('عنوان باید حداقل ۳ کاراکتر باشد');
    }

    if (!postData.content || postData.content.trim().length < 10) {
      errors.push('محتوا باید حداقل ۱۰ کاراکتر باشد');
    }

    return errors;
  }

  async createPost(postData) {
    this.setLoading(true);

    try {
      const validationErrors = this.validatePostData(postData);
      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join(' و '));
      }

      console.log('[MODEL] Creating post at:', this.apiBaseUrl);
      const response = await fetch(this.apiBaseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newPost = await response.json();
      console.log('[MODEL] Post created successfully:', newPost);
      this.posts.unshift(newPost);
      this.notifyObservers('onPostCreated', newPost);
      return newPost;
    } catch (error) {
      console.error('[MODEL] Create post failed:', error.message);
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
        throw new Error(validationErrors.join(' و '));
      }

      console.log('[MODEL] Updating post ID:', postId);
      const response = await fetch(`${this.apiBaseUrl}/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedPost = {
        ...this.getPostById(postId),
        ...postData,
        updatedAt: new Date().toISOString()
      };

      this.posts = this.posts.map(post =>
        post.id === postId ? updatedPost : post
      );

      this.notifyObservers('onPostUpdated', updatedPost);
      return updatedPost;
    } catch (error) {
      console.error('[MODEL] Update post failed:', error.message);
      this.notifyObservers('onError', error.message);
      throw error;
    } finally {
      this.setLoading(false);
    }
  }

  async deletePost(postId) {
    this.setLoading(true);

    try {
      console.log('[MODEL] Deleting post ID:', postId);
      const response = await fetch(`${this.apiBaseUrl}/${postId}`, {
        method: 'DELETE'
      });

      console.log('[MODEL] DELETE response status:', response.status);

      if (!response.ok) {
        if (response.status === 404) {
          console.warn('[MODEL] Post not found on server (404), removing locally');
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }

      this.posts = this.posts.filter(post => post.id !== postId);
      this.notifyObservers('onPostDeleted', postId);
    } catch (error) {
      console.error('[MODEL] Delete post failed:', error.message);
      this.notifyObservers('onError', error.message);
      // حتی اگر خطا بده، سمت کلاینت حذف می‌کنیم تا UI آپدیت بشه
      this.posts = this.posts.filter(post => post.id !== postId);
      this.notifyObservers('onPostDeleted', postId);
    } finally {
      this.setLoading(false);
    }
  }

  getPostById(postId) {
    return this.posts.find(post => post.id === postId);
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
}

window.BlogModel = BlogModel;