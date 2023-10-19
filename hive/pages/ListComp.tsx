import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import { Checkbox, IconButton } from '@mui/material';
import { BiSort } from 'react-icons/bi';
import { FaFilter, FaSnowflake, FaSun } from 'react-icons/fa';

export interface ListCompProps {
  ListArr: any[];
  handleToggle: (value: string) => any;
  checked: string[];
  handleColumnSort: (value: any) => void;
  handleColumnFilter: (value: any) => void;
  toggleFrozen: (columnId: string) => void;
  toggleFrozenn: (columnId: string) => void; // Assuming columnId is of type string, adjust as needed
  frozenColumns: string[];
}

const ListComp: React.FC<ListCompProps> = ({
  ListArr,
  frozenColumns,
  toggleFrozen,
  toggleFrozenn,
  handleToggle,
  handleColumnSort,
  handleColumnFilter,
  checked,
}) => {
  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        maxHeight: 300,
        overflow: 'auto',
      }}
    >
      {ListArr.map((value) => {
        const labelId = `checkbox-list-label-${value.id}`;

        // Check if the column is 'ID' or 'Action'
        const isIdOrActionColumn = value.name === 'Id' ;
      
        
        const isIdOrActionColumnn=value.name==="Actions"

        return (
          <ListItem
            key={value.id}
            secondaryAction={ !isIdOrActionColumnn && (   
              // Only render secondary actions for non-ID and non-Action columns
                <div>
               
                  <IconButton
                    edge="end"
                    aria-label="comments"
                    onClick={() => handleColumnSort(value)}
                    sx={{ color: value.isSort ? 'none' : 'lightblue' }}
                    disabled={isIdOrActionColumn}
                  >
                    <BiSort />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="comments"
                    sx={{
                      marginLeft: '20px',
                      color: value.isFilter ? 'none' : 'lightblue',
                    }}
                    onClick={() => handleColumnFilter(value)}
                    disabled={isIdOrActionColumn}
                  >
                    <FaFilter />
                  </IconButton>

                
                    <IconButton
                      edge="end"
                      aria-label="freeze"
                      sx={{ marginLeft: '20px' }}
                      onClick={() => {
                        toggleFrozen(value.id);
                        toggleFrozenn(value.id);
                      }} // Toggle freeze state
                      disabled={isIdOrActionColumn}
                    >
                      {frozenColumns.includes(value.id) ? (
                        <FaSnowflake />
                      ) : (
                        <FaSun />
                      )}
                    </IconButton>
                  
                </div>
            )
            }
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(value.id)}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={value.name}
                style={{
                  fontWeight: 600,
                  fontSize: '17px',
                  color: 'rgba(0, 0, 0, 0.54)',
                }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default ListComp;
