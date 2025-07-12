import { FC, useState, useEffect } from 'react';
import './sharelist.style.css';
import { shareListAPI, ShareItem, CreateShareItemRequest } from '../api/shareListAPI';

const ShareList: FC = () => {
  const [items, setItems] = useState<ShareItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<CreateShareItemRequest>({
    name: '',
    purchaseDate: '',
    expirationDate: '',
    category: 'tool',
    description: ''
  });

  // Load items from API on component mount
  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedItems = await shareListAPI.getItems();
      setItems(fetchedItems);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load items');
      console.error('Error loading items:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.purchaseDate) {
      setError('Name and purchase date are required');
      return;
    }

    try {
      setError(null);
      const newItem = await shareListAPI.createItem({
        ...formData,
        name: formData.name.trim(),
        description: formData.description?.trim() || undefined,
        expirationDate: formData.expirationDate || undefined
      });

      setItems(prev => [newItem, ...prev]);
      setFormData({
        name: '',
        purchaseDate: '',
        expirationDate: '',
        category: 'tool',
        description: ''
      });
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create item');
      console.error('Error creating item:', err);
    }
  };

  const toggleAvailability = async (id: string, currentlyAvailable: boolean) => {
    try {
      setError(null);
      const borrowedBy = currentlyAvailable ? 
        prompt('Who is borrowing this item?') || 'Someone' : 
        undefined;
      
      const updatedItem = await shareListAPI.toggleAvailability(id, borrowedBy);
      
      setItems(prev => prev.map(item => 
        item.id === id ? updatedItem : item
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update availability');
      console.error('Error toggling availability:', err);
    }
  };

  const deleteItem = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      setError(null);
      await shareListAPI.deleteItem(id);
      setItems(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete item');
      console.error('Error deleting item:', err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const isExpired = (expirationDate?: string) => {
    if (!expirationDate) return false;
    return new Date(expirationDate) < new Date();
  };

  if (loading) {
    return (
      <div className="sharelist-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your shared items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="sharelist-container">
      <div className="sharelist-header">
        <h1>ShareList</h1>
        <p>Share your idle tools and furniture with friends</p>
        {error && (
          <div className="error-message">
            <span>⚠️ {error}</span>
            <button onClick={() => setError(null)}>×</button>
          </div>
        )}
        <button 
          className="add-item-btn" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : '+ Add New Item'}
        </button>
      </div>

      {showForm && (
        <div className="add-item-form">
          <h3>Add New Item</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Item Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Electric Drill, Coffee Table"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="tool">Tool</option>
                  <option value="furniture">Furniture</option>
                  <option value="game">Game</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="purchaseDate">Purchase Date *</label>
                <input
                  type="date"
                  id="purchaseDate"
                  name="purchaseDate"
                  value={formData.purchaseDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="expirationDate">Expiration Date</label>
                <input
                  type="date"
                  id="expirationDate"
                  name="expirationDate"
                  value={formData.expirationDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Optional description, condition, notes..."
                rows={3}
              />
            </div>
            
            <div className="form-actions">
              <button type="submit" className="submit-btn">
                Add Item
              </button>
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="items-section">
        <div className="items-header">
          <h2>Shared Items ({items.length})</h2>
          <button className="refresh-btn" onClick={loadItems} title="Refresh items">
            🔄
          </button>
        </div>
        
        {items.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <h3>No items shared yet</h3>
            <p>Add your first item to start sharing with friends!</p>
          </div>
        ) : (
          <div className="items-grid">
            {items.map((item) => (
              <div key={item.id} className={`item-card ${!item.isAvailable ? 'unavailable' : ''} ${isExpired(item.expirationDate) ? 'expired' : ''}`}>
                <div className="item-header">
                  <div className="item-title">
                    <h3>{item.name}</h3>
                    <span className={`category-tag ${item.category}`}>
                      {item.category}
                    </span>
                  </div>
                  <div className="item-actions">
                    <button
                      className={`availability-btn ${item.isAvailable ? 'available' : 'borrowed'}`}
                      onClick={() => toggleAvailability(item.id, item.isAvailable)}
                      title={item.isAvailable ? 'Mark as borrowed' : 'Mark as available'}
                    >
                      {item.isAvailable ? '✅' : '🔒'}
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteItem(item.id)}
                      title="Delete item"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                
                <div className="item-details">
                  <div className="detail-row">
                    <span className="label">Status:</span>
                    <span className={`status ${item.isAvailable ? 'available' : 'borrowed'}`}>
                      {item.isAvailable ? 'Available' : `Borrowed${item.borrowedBy ? ` by ${item.borrowedBy}` : ''}`}
                    </span>
                  </div>
                  
                  <div className="detail-row">
                    <span className="label">Purchased:</span>
                    <span>{formatDate(item.purchaseDate)}</span>
                  </div>
                  
                  {item.expirationDate && (
                    <div className="detail-row">
                      <span className="label">Expires:</span>
                      <span className={isExpired(item.expirationDate) ? 'expired-date' : ''}>
                        {formatDate(item.expirationDate)}
                        {isExpired(item.expirationDate) && ' ⚠️'}
                      </span>
                    </div>
                  )}
                  
                  {item.description && (
                    <div className="detail-row description">
                      <span className="label">Notes:</span>
                      <span>{item.description}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShareList; 