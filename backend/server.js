const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Simple and reliable CORS configuration
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3001'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
}));

// Debug middleware to log requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path} from origin: ${req.get('Origin') || 'no-origin'}`);
  next();
});

app.use(express.json());

// Database setup
const dbPath = process.env.NODE_ENV === 'production' 
  ? '/tmp/sharelist.db' // Railway uses /tmp for writable storage
  : path.join(__dirname, 'sharelist.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

// Initialize database schema
function initializeDatabase() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS share_items (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      isAvailable INTEGER NOT NULL DEFAULT 1,
      purchaseDate TEXT NOT NULL,
      expirationDate TEXT,
      category TEXT NOT NULL,
      description TEXT,
      borrowedBy TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.run(createTableQuery, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('ShareItems table ready');
      insertDefaultData();
    }
  });
}

// Insert default data if table is empty
function insertDefaultData() {
  db.get('SELECT COUNT(*) as count FROM share_items', (err, row) => {
    if (err) {
      console.error('Error checking table:', err.message);
      return;
    }

    if (row.count === 0) {
      const defaultItems = [
        {
          id: '1',
          name: 'Electric Drill',
          isAvailable: 1,
          purchaseDate: '2023-06-15',
          category: 'tool',
          description: 'Cordless drill with battery pack'
        },
        {
          id: '2',
          name: 'Coffee Table',
          isAvailable: 0,
          purchaseDate: '2022-03-20',
          category: 'furniture',
          description: 'Wooden coffee table, good condition',
          borrowedBy: 'Sarah'
        },
        {
          id: '3',
          name: 'Monopoly Board Game',
          isAvailable: 1,
          purchaseDate: '2023-12-01',
          category: 'game',
          description: 'Classic Monopoly game, all pieces included'
        }
      ];

      const insertQuery = `
        INSERT INTO share_items (id, name, isAvailable, purchaseDate, category, description, borrowedBy)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      defaultItems.forEach(item => {
        db.run(insertQuery, [
          item.id,
          item.name,
          item.isAvailable,
          item.purchaseDate,
          item.category,
          item.description || null,
          item.borrowedBy || null
        ], (err) => {
          if (err) {
            console.error('Error inserting default item:', err.message);
          }
        });
      });

      console.log('Default items inserted');
    }
  });
}

// Helper function to convert database row to API format
function formatItem(row) {
  return {
    id: row.id,
    name: row.name,
    isAvailable: Boolean(row.isAvailable),
    purchaseDate: row.purchaseDate,
    expirationDate: row.expirationDate || undefined,
    category: row.category,
    description: row.description || undefined,
    borrowedBy: row.borrowedBy || undefined
  };
}

// API Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'ShareList API is running' });
});

// Get all items
app.get('/api/items', (req, res) => {
  db.all('SELECT * FROM share_items ORDER BY createdAt DESC', (err, rows) => {
    if (err) {
      console.error('Error fetching items:', err.message);
      res.status(500).json({ error: 'Failed to fetch items' });
      return;
    }

    const items = rows.map(formatItem);
    res.json(items);
  });
});

// Get single item
app.get('/api/items/:id', (req, res) => {
  const { id } = req.params;
  
  db.get('SELECT * FROM share_items WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error('Error fetching item:', err.message);
      res.status(500).json({ error: 'Failed to fetch item' });
      return;
    }

    if (!row) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }

    res.json(formatItem(row));
  });
});

// Create new item
app.post('/api/items', (req, res) => {
  const { name, purchaseDate, expirationDate, category, description } = req.body;

  // Validation
  if (!name || !purchaseDate || !category) {
    res.status(400).json({ error: 'Name, purchase date, and category are required' });
    return;
  }

  const id = Date.now().toString();
  const insertQuery = `
    INSERT INTO share_items (id, name, isAvailable, purchaseDate, expirationDate, category, description)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(insertQuery, [
    id,
    name,
    1, // isAvailable = true
    purchaseDate,
    expirationDate || null,
    category,
    description || null
  ], function(err) {
    if (err) {
      console.error('Error creating item:', err.message);
      res.status(500).json({ error: 'Failed to create item' });
      return;
    }

    // Return the created item
    db.get('SELECT * FROM share_items WHERE id = ?', [id], (err, row) => {
      if (err) {
        res.status(500).json({ error: 'Item created but failed to fetch' });
        return;
      }
      res.status(201).json(formatItem(row));
    });
  });
});

// Update item
app.put('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const { name, isAvailable, purchaseDate, expirationDate, category, description, borrowedBy } = req.body;

  const updateQuery = `
    UPDATE share_items 
    SET name = ?, isAvailable = ?, purchaseDate = ?, expirationDate = ?, 
        category = ?, description = ?, borrowedBy = ?, updatedAt = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  db.run(updateQuery, [
    name,
    isAvailable ? 1 : 0,
    purchaseDate,
    expirationDate || null,
    category,
    description || null,
    borrowedBy || null,
    id
  ], function(err) {
    if (err) {
      console.error('Error updating item:', err.message);
      res.status(500).json({ error: 'Failed to update item' });
      return;
    }

    if (this.changes === 0) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }

    // Return the updated item
    db.get('SELECT * FROM share_items WHERE id = ?', [id], (err, row) => {
      if (err) {
        res.status(500).json({ error: 'Item updated but failed to fetch' });
        return;
      }
      res.json(formatItem(row));
    });
  });
});

// Delete item
app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM share_items WHERE id = ?', [id], function(err) {
    if (err) {
      console.error('Error deleting item:', err.message);
      res.status(500).json({ error: 'Failed to delete item' });
      return;
    }

    if (this.changes === 0) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }

    res.status(204).send();
  });
});

// Toggle item availability (convenience endpoint)
app.patch('/api/items/:id/toggle', (req, res) => {
  const { id } = req.params;
  const { borrowedBy } = req.body;

  // First get current state
  db.get('SELECT * FROM share_items WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error('Error fetching item:', err.message);
      res.status(500).json({ error: 'Failed to fetch item' });
      return;
    }

    if (!row) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }

    const newAvailability = !Boolean(row.isAvailable);
    const newBorrowedBy = newAvailability ? null : (borrowedBy || 'Someone');

    const updateQuery = `
      UPDATE share_items 
      SET isAvailable = ?, borrowedBy = ?, updatedAt = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    db.run(updateQuery, [newAvailability ? 1 : 0, newBorrowedBy, id], function(err) {
      if (err) {
        console.error('Error toggling availability:', err.message);
        res.status(500).json({ error: 'Failed to toggle availability' });
        return;
      }

      // Return the updated item
      db.get('SELECT * FROM share_items WHERE id = ?', [id], (err, row) => {
        if (err) {
          res.status(500).json({ error: 'Item updated but failed to fetch' });
          return;
        }
        res.json(formatItem(row));
      });
    });
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down server...');
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database connection closed');
    }
    process.exit(0);
  });
});

app.listen(PORT, () => {
  console.log(`🚀 ShareList API server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📝 Items API: http://localhost:${PORT}/api/items`);
}); 