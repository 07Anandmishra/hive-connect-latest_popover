// FilterPopover.tsx

import React from 'react';
import { Popover, Select, MenuItem, TextField, Button, Autocomplete, DialogActions } from '@mui/material';

interface FilterPopoverProps {
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
  selectedColumn: string;
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
  filters: any;
  setFilters: React.Dispatch<React.SetStateAction<any>>;
  data: any[];
  applyFilter: () => void;
}

const FilterPopover: React.FC<FilterPopoverProps> = ({
  anchorEl,
  onClose,
  selectedColumn,
  selectedOption,
  setSelectedOption,
  filters,
  setFilters,
  data,
  applyFilter
}) => {
  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <div style={{ padding: '10px', width: '250px', height: '160px' }}>
        <Select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          fullWidth
          style={{ marginTop: '20px' }}
        >
          <MenuItem value="start with">Starts With</MenuItem>
          <MenuItem value="ends with">Ends With</MenuItem>
          <MenuItem value="contains">Contains</MenuItem>
          <MenuItem value="equals">Equals</MenuItem>
        </Select>

        <Autocomplete
          options={
            [...new Set(data.map((option) => option[selectedColumn]))].filter(
              (option) => option !== undefined && option !== null
            )
          }
          getOptionLabel={(option) => option.toString()}
          renderInput={(params) => (
            <TextField {...params} autoFocus margin="dense" label={`Filter by ${selectedColumn}`} fullWidth />
          )}
          value={filters[selectedColumn] || ''}
          onChange={(e, newValue) =>
            setFilters({ ...filters, [selectedColumn]: newValue })
          }
        />
      </div>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={applyFilter}>Apply</Button>
      </DialogActions>
    </Popover>
  );
};

export default FilterPopover;
