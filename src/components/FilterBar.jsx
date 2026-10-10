import React from 'react';
import { ArrowUpDown } from 'lucide-react';

const filters = [
  { id: 'all', label: 'All' },
  { id: 'pending', label: 'Pending' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'completed', label: 'Completed' },
  { id: 'high', label: 'High Priority' },
  { id: 'medium', label: 'Medium Priority' },
  { id: 'low', label: 'Low Priority' },
];

const sortOptions = [
  { value: 'recent', label: 'Recently Added' },
  { value: 'dueDate', label: 'Due Date' },
  { value: 'priority', label: 'Priority' },
];

const FilterBar = ({ activeFilter, onFilterChange, sortBy, onSortChange }) => {
  return (
    <div className="filter-bar">
      <div className="filter-chips">
        {filters.map((f) => (
          <button
            key={f.id}
            className={`filter-chip ${activeFilter === f.id ? 'filter-chip-active' : ''}`}
            onClick={() => onFilterChange(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="sort-select-wrapper">
        <ArrowUpDown size={15} className="sort-icon" />
        <select
          id="sort-select"
          className="sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          {sortOptions.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
