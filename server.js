const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

function initializeDatabase() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        console.error('Error opening database:', err);
        reject(err);
      } else {
        console.log('📊 Connected to SQLite database');
        
        // Create posts table if it doesn't exist
        db.run(`
          CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            author TEXT DEFAULT 'Anonymous',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
          )
        `, (err) => {
          if (err) {
            console.error('Error creating table:', err);
            reject(err);
          } else {
            console.log('📋 Posts table ready');
            
            // Check if we need to add initial data
            db.get('SELECT COUNT(*) as count FROM posts', (err, row) => {
              if (err) {
                console.error('Error counting posts:', err);
                reject(err);
              } else if (row.count === 0) {
                // Add initial data
                const initialPost = {
                  title: 'Welcome to My Blog',
                  content: 'This is my first blog post! I\'m excited to share my thoughts and experiences with you.',
                  author: 'Blog Owner'
                };
                
                db.run(`
                  INSERT INTO posts (title, content, author, created_at, updated_at)
                  VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
                `, [initialPost.title, initialPost.content, initialPost.author], (err) => {
                  if (err) {
                    console.error('Error inserting initial data:', err);
                    reject(err);
                  } else {
                    console.log('📝 Added initial blog post');
                    resolve(db);
                  }
                });
              } else {
                resolve(db);
              }
            });
          }
        });
      }
    });
  });
}

// DB Instance
let db;