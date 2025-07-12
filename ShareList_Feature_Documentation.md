# ShareList Feature Documentation

## Overview
ShareList is a feature added to your portfolio website that allows you to share idle tools and furniture with friends. It provides a simple interface to post items, track their availability, and manage borrowing status.

## Implementation Details

### Files Created/Modified
1. **New Files:**
   - `src/routes/sharelist.component.tsx` - Main ShareList component
   - `src/routes/sharelist.style.css` - Styling for ShareList component

2. **Modified Files:**
   - `src/routes/navigation.component.tsx` - Added ShareList tab to navigation
   - `src/App.tsx` - Added ShareList route

### Component Structure
```typescript
interface ShareItem {
  id: string;
  name: string;
  isAvailable: boolean;
  purchaseDate: string;
  expirationDate?: string;
  category: 'tool' | 'furniture' | 'game' | 'other';
  description?: string;
  borrowedBy?: string;
}
```

### Current Features
- ✅ Add new items with form validation
- ✅ Display items in responsive card grid
- ✅ Toggle availability status (Available/Borrowed)
- ✅ Delete items
- ✅ Category system (Tool/Furniture/Other)
- ✅ Optional expiration dates
- ✅ Item descriptions
- ✅ Purchase date tracking
- ✅ Responsive design for mobile/desktop

### Sample Data
The component includes two sample items:
- Electric Drill (Available)
- Coffee Table (Borrowed by Sarah)

## How to Use

### Adding Items
1. Click "Add New Item" button
2. Fill in required fields:
   - Item Name (required)
   - Purchase Date (required)
3. Optional fields:
   - Category (Tool/Furniture/Other)
   - Expiration Date
   - Description
4. Click "Add Item" to save

### Managing Items
- **Mark as Borrowed**: Click the yellow button to mark item as borrowed
- **Mark as Available**: Click the green button to mark item as available
- **Delete**: Click the red "Delete" button to remove item permanently

### Visual Indicators
- **Available items**: Normal white background
- **Borrowed items**: Red left border and light red background tint
- **Category badges**: Color-coded (Blue=Tool, Purple=Furniture, Green=Other)

## Technical Implementation

### State Management
- Uses React `useState` for local state management
- No external state management library required
- Data persists only during session (resets on page refresh)

### Styling Approach
- CSS Grid for responsive layout
- Modern gradient backgrounds
- Hover effects and transitions
- Mobile-first responsive design
- Card-based UI pattern

### Form Handling
- Controlled components with React state
- Form validation for required fields
- Date inputs for purchase/expiration dates
- Textarea for descriptions

## Future Enhancement Ideas

### High Priority Improvements
1. **Data Persistence**
   - Add localStorage to persist data between sessions
   - Consider database integration for multi-user scenarios

2. **Search & Filter**
   - Search by item name
   - Filter by category
   - Filter by availability status

3. **Enhanced Borrowing System**
   - Borrower contact information
   - Expected return dates
   - Overdue item notifications

### Medium Priority Improvements
4. **Photo Upload**
   - Add image upload for items
   - Display thumbnails in item cards

5. **Item Condition Tracking**
   - Condition field (New/Good/Fair/Poor)
   - Condition history tracking

6. **Export/Import**
   - Export list to CSV/JSON
   - Import from spreadsheet

### Low Priority / Advanced Features
7. **User Authentication**
   - Multi-user support
   - Separate lists per user
   - Shared family/group lists

8. **QR Code Generation**
   - Generate QR codes for items
   - Quick scanning for status updates

9. **Location Tracking**
   - Storage location field
   - Location-based filtering

10. **Social Features**
    - Request system for borrowing
    - Item reviews/ratings
    - Borrowing history

## Code Snippets for Common Modifications

### Adding a New Field to Items
1. Update the `ShareItem` interface:
```typescript
interface ShareItem {
  // ... existing fields
  newField?: string; // Add new optional field
}
```

2. Update the form state:
```typescript
const [formData, setFormData] = useState({
  // ... existing fields
  newField: ''
});
```

3. Add form input in JSX:
```tsx
<div className="form-group">
  <label htmlFor="newField">New Field</label>
  <input
    type="text"
    id="newField"
    value={formData.newField}
    onChange={(e) => setFormData({...formData, newField: e.target.value})}
  />
</div>
```

4. Update the item creation logic:
```typescript
const newItem: ShareItem = {
  // ... existing fields
  ...(formData.newField && { newField: formData.newField })
};
```

### Adding Local Storage Persistence
```