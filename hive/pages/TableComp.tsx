'use client';
import React, { useEffect, useState ,useRef} from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  MenuItem,
  Select,
  Stack,
  Autocomplete,
  Popover,
} from '@mui/material';

import SearchBox from './SearchBox';
import axios from 'axios';
import Pagination from '../../components/Pagination/Pagination';
import { BiSort } from 'react-icons/bi';
// import "re-resizable/css/styles.css";

import Datepickercomponent from './Datepickercomponent';

import KeepMountedModal from './CustomModal';
import '../styles/appbar.scss';
import '../styles/global.css';

import CustomButton from '../../components/CustomButton/CustomButton';
import ListComp from './ListComp';
import { GiSettingsKnobs } from 'react-icons/gi';
import { BiSortDown, BiSortUp } from 'react-icons/bi';
import { BsFunnel } from 'react-icons/bs';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';

// import { FaSnowflake, FaSun } from 'react-icons/fa';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

// import { Resizable } from "re-resizable";


import 'react-resizable/css/styles.css';

import FilterPopover from '../../components/Popupfilter/FilterPopover'

interface DataItem {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  designation: string;
  pincode: string;
  startDate: string;
  [key: string]: any;
}


const TableComp = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);

  const [filters, setFilters] = useState<Record<string, string>>({});

  const [selectedColumn, setSelectedColumn] = useState<string>('');
  const [sort, setSort] = useState({ field: '', order: '' });
  const [selectedOption, setSelectedOption] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  
  const [pinnedColumn, setPinnedColumn] = useState(null);
  const [ShowGlobalHeader, setShowGlobalHeader] = useState<boolean>(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [open, setOpen] = useState(false);
  const [frozenColumns, setFrozenColumns] = useState<string[]>([]);
  const [editingRowId, setEditingRowId] = useState<number | null>(null);
  const [editingData, setEditingData] = useState<any>({}); // Change 'any' to the

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingRowId, setDeletingRowId] = useState<number | null>(null);

  const [selectedUser, setSelectedUser] = useState<DataItem | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

    const [columnWidths, setColumnWidths] = useState<Record<string, number>>({
        name: 250,
        email: 250,
        phone: 250,
        address:250,
        designation:250,
        pincode:250
    });

 

    const MIN_WIDTHS: {
      [key: string]: number;
  } = {
      name: 200,
      email: 200,
      phone: 200,
      address: 200,
      designation: 200,
      pincode: 200
  };
  
    const resizingColumn = useRef<string | null>(null);
    const prevX = useRef<number | null>(null);

    const handleMouseDown = (columnName: string | null, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        resizingColumn.current = columnName;
        prevX.current = e.clientX;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

//     const handleMouseMove = (e:any) => {
//         if (resizingColumn.current) {
//             // const diffX = e.clientX - prevX.current;

//             const diffX = e.clientX - (prevX.current ?? 0);

//             // setColumnWidths((prevWidths) => ({
//             //     ...prevWidths,
//             //     [resizingColumn.current]: prevWidths[resizingColumn.current] + diffX
//             // }));
            
//             setColumnWidths((prevWidths) => {
//     const currentColumn = resizingColumn.current;
//     if (currentColumn && prevWidths[currentColumn] !== undefined) {
//         return {
//             ...prevWidths,
//             [currentColumn]: prevWidths[currentColumn] + diffX
//         };
//     }
//     return prevWidths;
// });
//             prevX.current = e.clientX;
//         }
//     };


const handleMouseMove = (e:any) => {
  if (resizingColumn.current) {
      // const diffX = e.clientX - prevX.current;
      const diffX = e.clientX - (prevX.current ?? 0);

      
      // setColumnWidths((prevWidths) => {
      //     const newWidth = prevWidths[resizingColumn.current] + diffX;
        
      //     if (newWidth >= MIN_WIDTHS[resizingColumn.current]) {
      //         return {
      //             ...prevWidths,
      //             [resizingColumn.current]: newWidth
      //         };
      //     } else {
      //         return prevWidths;
      //     }
      // });
      setColumnWidths((prevWidths) => {
        const currentColumn = resizingColumn.current as keyof typeof prevWidths;
        const newWidth = prevWidths[currentColumn] + diffX;
    
        if (newWidth >= MIN_WIDTHS[currentColumn]) {
            return {
                ...prevWidths,
                [currentColumn]: newWidth
            };
        } else {
            return prevWidths;
        }
    });
      prevX.current = e.clientX;
  }
};


    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        resizingColumn.current = null;
        prevX.current = null;
    };



  const [column2, setColumn2] = useState([
    { id: 'id', name: 'Id', isSort: false, isFilter: true ,isFrozen:true},
    { id: 'name', name: 'Name', isSort: true, isFilter: true, isFrozen: false },
    {
      id: 'email',
      name: 'Email',
      isSort: true,
      isFilter: true,
      isFrozen: false,
    },
    {
      id: 'phone',
      name: 'Phone',
      isSort: true,
      isFilter: true,
      isFrozen: false,
    },
    {
      id: 'address',
      name: 'Address',
      isSort: true,
      isFilter: true,
      isFrozen: false,
    },
    {
      id: 'designation',
      name: 'Designation',
      isSort: true,
      isFilter: true,
      isFrozen: false,
    },
    {
      id: 'pincode',
      name: 'pincode',
      isSort: true,
      isFilter: true,
      isFrozen: false,
    },
    { id: 'actions', name: 'Actions', isSort: true, isFilter: true },
  ]);
  

  const [checked, setChecked] = useState<string[]>([]);




  


  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (checked.includes(value)) {
      newChecked.splice(currentIndex, 1);
    } else {
      newChecked.push(value);
    }
    setChecked(newChecked);
    setVisibleColumns(newChecked);

    // console.log('checked', value)
    console.log('checked', newChecked);
  };

  console.log('564', column2);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const columns = [
    { id: 'id', name: 'Id' },
    { id: 'name', name: 'Name' },
    { id: 'email', name: 'Email' },
    { id: 'phone', name: 'Phone' },
    { id: 'address', name: 'Address' },
    { id: 'designation', name: 'Designation' },
    { id: 'pincode', name: 'pincode' },
    { id: 'actions', name: 'Actions' },
  ];

  const getData = async () => {
    await axios
      .get('http://localhost:8000/employee')
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSearch = (searchTerm: string) => {
    setSearchInput(searchTerm);
    if (searchTerm) {
      const filteredData = data.filter((item) =>
        columns.some((column) => {
          const value = item[column.id];
          return (
            value &&
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
          );
        })
      );
      setData(filteredData);
    } else {
      getData(); // Reset to the original data if the search term is empty.
    }
  };

  const applyFilter = () => {
    if (filters[selectedColumn]) {
      const filteredData = data.filter((item) =>
        String(item[selectedColumn])
          .toLowerCase()
          .includes(String(filters[selectedColumn]).toLowerCase())
      );
      setData(filteredData);
    } else {
      getData();
    }
    // setFilterDialogOpen(false);
    setAnchorEl(null)
  };

  // const clearAll = () => {
  //   setFilters({});
  //   setSort({ field: '', order: '' });
  //   setShowFilter(false);
  //   setShowSort(false);
  //   setSearchInput('');
  //   getData(); // To fetch the original unfiltered and unsorted data
  // };

  const openFilterDialog = (columnId: React.SetStateAction<string>) => {
    setSelectedColumn(columnId);
    setFilterDialogOpen(true);
  };

  const handleSort = (columnId: string) => {
    const newData = [...data];
    const order =
      sort.field === columnId && sort.order === 'asc' ? 'desc' : 'asc';

    newData.sort((a, b) => {
      if (a[columnId] < b[columnId]) return order === 'asc' ? -1 : 1;
      if (a[columnId] > b[columnId]) return order === 'asc' ? 1 : -1;
      return 0;
    });

    setSort({ field: columnId, order });
    setData(newData);
  };

  const handleClick = () => {
    setShowGlobalHeader(!ShowGlobalHeader);
  };

  // const name = [{name:'Sort', icon: 'S'}, {name:'Filter', icon: 'F'}]

  console.log('sorted column', visibleColumns);

  const handleDateSearch = (fromDate: Date | null, toDate: Date | null) => {
    if (fromDate && toDate) {
      const filteredData = data.filter((item) => {
        const startDate = new Date(item.startDate); // No error here after adding the DataItem interface
        return startDate >= fromDate && startDate <= toDate;
      });
      setData(filteredData);
    } else {
      getData(); // If dates are not selected properly, reset to original data
    }
  };

  const handleColumnSort = (value: { id: string; isSort: boolean }) => {
    const updatedData = column2.map((item) => {
      if (item.id === value.id) {
        return {
          ...item,
          isSort: !value.isSort,
        };
      }
      return item;
    });
    setColumn2(updatedData);
  };

  const handleColumnFilter = (value: { id: string; isFilter: unknown }) => {
    const updatedData = column2.map((item) => {
      if (item.id === value.id) {
        return {
          ...item,
          isFilter: !value.isFilter,
        };
      }
      console.log('item', item);
      return item;
    });
    setColumn2(updatedData);
    console.log(column2);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(column2);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setColumn2(items);
  };

  const startEditing = (id: number, currentData: DataItem) => {
    setEditingRowId(id);
    setEditingData(currentData);
  };

  const cancelEditing = () => {
    setEditingRowId(null);
    setEditingData({});
  };

  const saveEditing = (id: number) => {
    // Update the data with the edited values
    const newData = [...data];
    const index = newData.findIndex((item) => item.id === id);
    newData[index] = editingData;
    setData(newData);

    // Clear the editing state
    setEditingRowId(null);
    setEditingData({});
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    setEditingData({
      ...editingData,
      [id]: e.target.value,
    });
  };

  const deleteRow = (id: number) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  };



  const toggleFrozen = (columnId: string) => {
    setFrozenColumns((prev) =>
      prev.includes(columnId)
        ? prev.filter((id) => id !== columnId)
        : [...prev, columnId]
    );
  };


  const toggleFrozenn = (columnId:any) => {
    if (frozenColumns.includes(columnId)) {
      // Column is currently frozen, unpin it
      setFrozenColumns(frozenColumns.filter((id) => id !== columnId));
      setPinnedColumn(null);
    } else {
      // Column is not frozen, ask for pinning options
      setPinnedColumn(columnId);
    }
  };
  const handlePinToLeft = () => {
    if (pinnedColumn) {
      const updatedColumn2 = [...column2];
      const index = updatedColumn2.findIndex((column) => column.id === pinnedColumn);
      if (index !== -1) {
        // Remove the pinned column from its current position
        updatedColumn2.splice(index, 1);
        // Insert the pinned column at the beginning (extreme left)
        updatedColumn2.splice(1, 0, { ...column2[index] }); // Assuming '1' is the index of 'Actions' column
        setColumn2(updatedColumn2);
        setPinnedColumn(null);
      }
    }
  };
  
  const handlePinToRight = () => {
    if (pinnedColumn) {
      const updatedColumn2 = [...column2];
      const index = updatedColumn2.findIndex((column) => column.id === pinnedColumn);
      if (index !== -1) {
        // Remove the pinned column from its current position
        const pinnedColumnData = updatedColumn2.splice(index, 1)[0];
  
        // Find the index of the "Actions" column
        const actionsIndex = updatedColumn2.findIndex((column) => column.id === 'actions');
  
        // Insert the pinned column just before the "Actions" column
        if (actionsIndex !== -1) {
          updatedColumn2.splice(actionsIndex, 0, { ...pinnedColumnData, isFrozen: true });
        } else {
          // If "Actions" column is not found, add the pinned column to the end
          updatedColumn2.push({ ...pinnedColumnData, isFrozen: true });
        }
  
        setColumn2(updatedColumn2);
        setPinnedColumn(null);
      }
    }
  };

  const openFilterPopover = (event: React.MouseEvent<HTMLButtonElement>, columnId: string) => {
    setSelectedColumn(columnId);
    setAnchorEl(event.currentTarget);
    console.log('458',event.currentTarget)
  };

  // const closeFilterPopover = () => {
  //   setAnchorEl(null);
  // };




  return (
    <>
      {/* Header Section */}

      <div>
        <Datepickercomponent
          onSearch={handleDateSearch}
          disabled={ShowGlobalHeader}
        />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <SearchBox onSearch={handleSearch} isdisabled={ShowGlobalHeader} />
        <div>
          <IconButton onClick={() => setOpen(true)} disabled={ShowGlobalHeader}>
            {/* <FcDataConfiguration /> */}
            <GiSettingsKnobs />
          </IconButton>
          <CustomButton
            onClick={handleClick}
            variant="contained"
            sx={{ height: '40px', marginLeft: '20px' }}
          >
            {ShowGlobalHeader ? 'Show' : 'Hide'}
          </CustomButton>
        </div>
      </div>

      {/* Grid Section */}

      <div
        style={{ textAlign: 'center', overflowX: 'auto', marginTop: '10px' }}
      >
        <Paper>
          <TableContainer
            style={{ maxWidth: '100%', height: '500px', overflowY: 'auto' ,overflowX:'auto'}}
          >
            <Table style={{ minWidth: 'max-content',tableLayout: 'auto' }}>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="columns" direction="horizontal">
                  {(provided) => (
                  
                    <TableHead
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      <TableRow>
                        {column2.map((column, index) =>
                          visibleColumns.includes(column.id) ? (
                           
                            !frozenColumns.includes(column.id) &&
                            column.id !== 'id' &&
                            column.id !== 'actions' ? (
                              
                              <Draggable
                                key={column.id}
                                draggableId={column.id}
                                index={index}
                              >
                                {(provided) => (


                              
                                  <TableCell
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                    //  style={{ fontWeight: "bold", textAlign: 'center', fontSize: "17px", color: "rgba(0, 0, 0, 0.54)" }}
                                    
                                    key={column.id}
                                    className={
                                      column.id === 'actions'
                                        ? 'actionsColumn'
                                        : column.id === 'id'
                                        ? 'idColumn'
                                        : ''
                                    }
                                    style={{
                                      ...provided.draggableProps.style, 
                                      // spread the styles to keep the existing styles
                                    width: columnWidths.name ,
                                    minWidth: MIN_WIDTHS.name ,
                                      fontWeight: 'bold',
                                      textAlign: 'center',
                                      fontSize: '17px',
                                      color: 'rgba(0, 0, 0, 0.54)',
                                      position:
                                        column.id === 'id' ||
                                        column.id === 'actions'
                                          ? 'sticky'
                                          : 'unset',
                                      top: 0,
                                      zIndex: 1,
                                      backgroundColor: '#fff', 
                                     
                                      // To cover the content when scrolling
                                    }}
                                    
                                  >
                                  
   {column.isSort && column.id !== 'actions' && (
                            <IconButton onClick={() => handleSort(column.id)}>
                                {sort.field === column.id ? (
                                    sort.order === 'asc' ? (
                                        <BiSortUp style={{fontSize:'16px'}}/>
                                    ) : (
                                        <BiSortDown style={{fontSize:'16px'}}/>
                                    )
                                ) : (
                                    <BiSort style={{fontSize:'16px'}}/>
                                )}
                            </IconButton>
                        )}
                        {column.name}
                        {column.isFilter && column.id !== 'actions' && (
                            <IconButton onClick={(e) => openFilterPopover(e, column.id)} >
                                <BsFunnel style={{fontSize:'16px'}}/>
                            </IconButton>
                        )}     

            <div onMouseDown={(e) => handleMouseDown('name', e)} style={{ cursor: 'col-resize', float: 'right', userSelect: 'none',marginTop:'5px' }} >|</div>
                        
                                  </TableCell>
                                
                                )}
                              </Draggable>
                            
                            ) : (

                              <TableCell
                                key={column.id}
                                style={{
                                  fontWeight: 'bold',
                                  textAlign: 'center',
                                  fontSize: '17px',
                                  color: 'rgba(0, 0, 0, 0.54)',
                                  position: 'sticky',
                                  zIndex: 1,
                                  left: column.id === 'id' ? 0 : 'auto',
                                  right: column.id === 'actions' ? 0 : 'auto',
                                  backgroundColor: '#fff',
                                }}
                              >

{(column.isSort || column.id === 'id') && column.id !== 'actions' && (
        <IconButton onClick={() => handleSort(column.id)}>
            {sort.field === column.id ? (
                sort.order === 'asc' ? (
                    <BiSortUp />
                ) : (
                    <BiSortDown style={{fontSize:'16px'}}/>
                )
            ) : (
                <BiSort style={{fontSize:'16px'}}/>
            )}
        </IconButton>
    )}
    {column.name}
    {(column.isFilter || column.id === 'id') && column.id !== 'actions' && (
        <IconButton onClick={() => openFilterDialog(column.id)}>
            <BsFunnel style={{fontSize:'15px'}}/>
        </IconButton>
    )}
                              </TableCell>
                             
                            )
                          
                          ) : null
                        )}
                        {provided.placeholder}
                      </TableRow>
                    </TableHead>
                  
                  )}
                </Droppable>

                <TableBody>
                  {(rowsPerPage > 0
                    ? data.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : data
                  ).map((row, index) => (
                    <TableRow key={index}>
                      {column2.map((column) =>
                        visibleColumns.includes(column.id) ? (
                          <TableCell
                            key={column.id}
                            style={{
                              position:
                                column.id === 'id' || column.id === 'actions'
                                  ? 'sticky'
                                  : 'unset',
                              zIndex: 1,
                              left: column.id === 'id' ? 0 : 'auto',
                              right: column.id === 'actions' ? 0 : 'auto',
                              backgroundColor: '#fff',
                            }}
                          >
                            {editingRowId === row.id ? (
                              column.id === 'actions' ? (
                                <>
                                  <IconButton
                                    onClick={() => saveEditing(row.id)}
                                  >
                                    <SaveIcon />
                                  </IconButton>
                                  <IconButton onClick={cancelEditing}>
                                    <CancelIcon />
                                  </IconButton>
                                </>
                              ) : (
                                <input
                                  type="text"
                                  defaultValue={row[column.id]}
                                  onChange={(e) =>
                                    handleInputChange(e, column.id)
                                  }
                                  style={{
                                    width: '100%', // Make input take full width of cell
                                    padding: '8px', // Add some padding
                                    boxSizing: 'border-box', // Ensure padding doesn't affect width
                                  }}
                                />
                              )

                            ) : column.id === 'actions' ? (
                              <>                              
                                <IconButton
                                  className="edit-button"
                                  onClick={() => startEditing(row.id, row)}
                                >
                                  <EditIcon style={{fontSize:'16px'}}/>
                                </IconButton>
                                <IconButton
                                  className="view-button"
                                  onClick={() => {
                                    setSelectedUser(row);
                                    setViewModalOpen(true);
                                  }}
                                >
                                  <VisibilityIcon style={{fontSize:'16px'}}/>
                                </IconButton>

                                <IconButton
                                  className="delete-button"
                                  onClick={() => {
                                    setDeletingRowId(row.id);
                                    setDeleteDialogOpen(true);
                                  }}
                                >
                                  <DeleteIcon style={{fontSize:'16px'}}/>
                                </IconButton>
                              </>
                            ) : (
                              row[column.id]
                            )}  
                          </TableCell>
                        ) : null
                      )}
                    </TableRow>
                  ))}
                </TableBody>

                <Dialog
                  className="user-modal"
                  open={viewModalOpen}
                  onClose={() => setViewModalOpen(false)}
                >
                  <DialogTitle className="centered-title">
                    User Information
                  </DialogTitle>

                  <DialogContent>
                    {selectedUser ? (
                      <div>
                        <p>
                          <strong>ID:</strong> {selectedUser.id}
                        </p>
                        <p>
                          <strong>Name:</strong> {selectedUser.name}
                        </p>
                        <p>
                          <strong>Email:</strong> {selectedUser.email}
                        </p>
                        <p>
                          <strong>Phone:</strong> {selectedUser.phone}
                        </p>
                        <p>
                          <strong>Address:</strong> {selectedUser.address}
                        </p>
                        <p>
                          <strong>Designation:</strong>{' '}
                          {selectedUser.designation}
                        </p>
                        <p>
                          <strong>Pincode:</strong> {selectedUser.pincode}
                        </p>
                        {/* Add more fields as needed */}
                      </div>
                    ) : null}
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => setViewModalOpen(false)}
                      color="primary"
                    >
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>

                <Dialog
                  open={deleteDialogOpen}
                  onClose={() => setDeleteDialogOpen(false)}
                >
                  <DialogTitle>Confirm Delete</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Are you sure you want to delete this row?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => setDeleteDialogOpen(false)}
                      color="primary"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        if (deletingRowId !== null) {
                          deleteRow(deletingRowId);
                          setDeleteDialogOpen(false);
                        }
                      }}
                      color="primary"
                    >
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
              </DragDropContext>
            </Table>
            <Pagination
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              totalCount={data.length}
            />
          </TableContainer>
        </Paper>

        <Dialog open={pinnedColumn !== null} onClose={() => setPinnedColumn(null)}>
  <DialogContent >
  
    <p><strong>Pin Column: </strong></p>
    <Stack direction="row" spacing={2} marginTop={2}>
    <Button variant="outlined" onClick={handlePinToLeft}>Pin to Left</Button>
    <Button variant="outlined" onClick={handlePinToRight}>Pin to Right</Button>
    </Stack>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setPinnedColumn(null)}>Cancel</Button>
  </DialogActions>

</Dialog>

{/* olde new */}

{/* <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={closeFilterPopover}
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
            <Button onClick={ closeFilterPopover}>Cancel</Button>
            <Button onClick={applyFilter}>Apply</Button>
          </DialogActions>
        </Popover> */}

<FilterPopover 
  anchorEl={anchorEl}
  onClose={() => setAnchorEl(null)}
  selectedColumn={selectedColumn}
  selectedOption={selectedOption}
  setSelectedOption={setSelectedOption}
  filters={filters}
  setFilters={setFilters}
  data={data}
  applyFilter={applyFilter}
/>
        {/* List Modal */}

        <KeepMountedModal open={open} setOpen={setOpen}>
        <ListComp
            ListArr={column2}
            handleColumnSort={handleColumnSort}
            handleColumnFilter={handleColumnFilter}
            handleToggle={handleToggle}
            checked={checked}
            frozenColumns={frozenColumns}
            toggleFrozen={toggleFrozen}
            toggleFrozenn={toggleFrozenn} 
          />
        </KeepMountedModal>
      </div>
    </>
  );
};

export default TableComp;