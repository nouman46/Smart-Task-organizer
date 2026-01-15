// frontend/src/TaskControls.js
import { 
  Box, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  ToggleButtonGroup, 
  ToggleButton 
} from "@mui/material";
import SortIcon from '@mui/icons-material/Sort';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import EventIcon from '@mui/icons-material/Event';

export default function TaskControls({ 
  sortBy, 
  onSortChange, 
  categories, 
  filterCategory, 
  onFilterChange 
}) {

  const handleSortChange = (event, newSortBy) => {
    if (newSortBy !== null) {
      onSortChange(newSortBy);
    }
  };

  const handleFilterChange = (event) => {
    onFilterChange(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 2 }}>
      {/* Filter Dropdown */}
      <FormControl sx={{ minWidth: 200 }} size="small">
        <InputLabel id="category-filter-label">Filter by Category</InputLabel>
        <Select
          labelId="category-filter-label"
          id="category-filter"
          value={filterCategory}
          label="Filter by Category"
          onChange={handleFilterChange}
        >
          {categories.map(cat => (
            <MenuItem key={cat} value={cat} sx={{ textTransform: 'capitalize' }}>
              {cat === 'all' ? 'Show All' : cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Sort Buttons */}
      <ToggleButtonGroup
        value={sortBy}
        exclusive
        onChange={handleSortChange}
        aria-label="task sort order"
        size="small"
      >
        <ToggleButton value="newest" aria-label="sort by newest">
          <SortIcon sx={{ mr: 0.5 }} />
          Newest
        </ToggleButton>
        <ToggleButton value="priority" aria-label="sort by priority">
          <PriorityHighIcon sx={{ mr: 0.5 }} />
          Priority
        </ToggleButton>
        <ToggleButton value="dueDate" aria-label="sort by due date">
          <EventIcon sx={{ mr: 0.5 }} />
          Due Date
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}