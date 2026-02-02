// Application configuration
const CONFIG = {
  API_BASE_URL: 'http://localhost:3001',
  DEBUG_MODE: true,
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000
};

// Global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  if (CONFIG.DEBUG_MODE) {
    showDebugError(event.error);
  }
});

// Debug utilities
function showDebugError(error) {
  const debugDiv = document.createElement('div');
  debugDiv.className = 'debug-error';
  debugDiv.innerHTML = `
    <strong>Debug Error:</strong> ${error.message}<br>
    <small>${error.stack}</small>
  `;
  document.body.appendChild(debugDiv);
  
  setTimeout(() => debugDiv.remove(), 5000);
}

function log(message, data = null) {
  if (CONFIG.DEBUG_MODE) {
    console.log(`[BlogMVC] ${message}`, data);
  }
}

// Educational content
function showEducationalModal() {
  const modal = document.getElementById('educational-modal');
  const modalBody = document.getElementById('modal-body');
  
  modalBody.innerHTML = `
    <div class="educational-content">
      <div class="mvc-diagram">
        <div class="mvc-component model">
          <h3>🏗️ Model</h3>
          <p>Manages data and business logic</p>
          <ul>
            <li>API communications</li>
            <li>Data validation</li>
            <li>State management</li>
            <li>Observer pattern</li>
          </ul>
        </div>
        <div class="mvc-component view">
          <h3>👁️ View</h3>
          <p>Handles UI and user interactions</p>
          <ul>
            <li>HTML rendering</li>
            <li>Form validation</li>
            <li>Event handling</li>
            <li>User feedback</li>
          </ul>
        </div>
        <div class="mvc-component controller">
          <h3>🎮 Controller</h3>
          <p>Coordinates Model and View</p>
          <ul>
            <li>User action handling</li>
            <li>Data coordination</li>
            <li>Flow management</li>
            <li>Error handling</li>
          </ul>
        </div>
      </div>
      
      <div class="api-info">
        <h3>🌐 RESTful API Endpoints</h3>
        <div class="api-endpoints">
          <div class="endpoint">
            <span class="method get">GET</span>
            <span class="path">/api/posts</span>
            <span class="description">Get all blog posts</span>
          </div>
          <div class="endpoint">
            <span class="method get">GET</span>
            <span class="path">/api/posts/:id</span>
            <span class="description">Get single post by ID</span>
          </div>
          <div class="endpoint">
            <span class="method post">POST</span>
            <span class="path">/api/posts</span>
            <span class="description">Create new post</span>
          </div>
          <div class="endpoint">
            <span class="method put">PUT</span>
            <span class="path">/api/posts/:id</span>
            <span class="description">Update existing post</span>
          </div>
          <div class="endpoint">
            <span class="method delete">DELETE</span>
            <span class="path">/api/posts/:id</span>
            <span class="description">Delete post</span>
          </div>
        </div>
      </div>
      
      <div class="features">
        <h3>✨ Features</h3>
        <ul>
          <li>Lightweight JSON data storage</li>
          <li>Full CRUD operations</li>
          <li>Form validation</li>
          <li>Error handling</li>
          <li>Loading states</li>
          <li>Responsive design</li>
        </ul>
      </div>
    </div>
  `;
  
  modal.style.display = 'block';
}

// Initialize application
async function initializeApp() {
  log('Initializing Blog MVC application...');
  
  try {
    if (!window.BlogModel || !window.BlogView || !window.BlogController) {
      throw new Error('Required MVC components not found');
    }
    
    const model = new BlogModel();
    const view = new BlogView();
    const controller = new BlogController(model, view);
    
    window.blogApp = {
      model,
      view,
      controller,
      config: CONFIG
    };
    
    const educationalBtn = document.getElementById('educational-btn');
    const modal = document.getElementById('educational-modal');
    const closeModal = document.getElementById('close-modal');
    const closeBtn = modal.querySelector('.close');
    
    educationalBtn.addEventListener('click', showEducationalModal);
    closeModal.addEventListener('click', () => modal.style.display = 'none');
    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
    
    await controller.initialize();
    
    log('Application initialized successfully');
    
    if (!localStorage.getItem('blogMVC_visited')) {
      setTimeout(() => {
        showEducationalModal();
        localStorage.setItem('blogMVC_visited', 'true');
      }, 1000);
    }
    
  } catch (error) {
    console.error('Failed to initialize application:', error);
    
    const errorContainer = document.getElementById('error-container');
    if (errorContainer) {
      errorContainer.innerHTML = `
        <div class="error-message">
          <h3>🚨 Application Error</h3>
          <p>Failed to initialize the blog application.</p>
          <p><strong>Error:</strong> ${error.message}</p>
          <button onclick="location.reload()" class="btn btn-primary">Reload Page</button>
        </div>
      `;
      errorContainer.style.display = 'block';
    }
    
    throw error;
  }
}

// Performance monitoring
function measurePerformance() {
  if (CONFIG.DEBUG_MODE && window.performance) {
    const navigation = performance.getEntriesByType('navigation')[0];
    if (navigation) {
      log(`Page load time: ${navigation.loadEventEnd - navigation.loadEventStart}ms`);
    }
  }
}

// Network status monitoring
function setupNetworkMonitoring() {
  window.addEventListener('online', () => {
    log('Network: Online');
    if (window.blogApp && window.blogApp.controller) {
      window.blogApp.controller.loadPosts();
    }
  });
  
  window.addEventListener('offline', () => {
    log('Network: Offline');
    if (window.blogApp && window.blogApp.view) {
      window.blogApp.view.showError('You are offline. Some features may not work.');
    }
  });
}

// Start the application
document.addEventListener('DOMContentLoaded', async () => {
  log('DOM content loaded');
  
  try {
    measurePerformance();
    setupNetworkMonitoring();
    await initializeApp();
  } catch (error) {
    console.error('Application startup failed:', error);
  }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === '/') {
    e.preventDefault();
    showEducationalModal();
  }
  
  if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
    e.preventDefault();
    if (window.blogApp && window.blogApp.controller) {
      window.blogApp.controller.loadPosts();
    }
  }
});

log('Application script loaded');