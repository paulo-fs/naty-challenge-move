import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { MoreVert } from '@mui/icons-material';

interface Column {
  label: string
  minWidth?: number
}

interface MyTableProps {
  tableHead: Column[]
  data: any[]
  renderActions?: IRenderAction[]
  setRowId?: React.Dispatch<React.SetStateAction<string>>
  rowId?: string
}

interface IRenderAction {
  label: string
  action: (id: string) => void
}

export function MyTable(props: MyTableProps) {
  const { tableHead, data, renderActions, setRowId, rowId} = props
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const hasActions = Boolean(renderActions)

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (data.length === 0) {
    return(
      <Paper variant='outlined' elevation={0} sx={{
        width: '100%',
        overflow: 'hidden',
        padding: 8
      }}>
        <Typography variant='h6' textAlign='center'>
          Não existem resultados para serem exibidos.
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper variant='outlined' elevation={0} sx={{
      width: '100%',
      overflow: 'hidden',
    }}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead >
            <TableRow>
              {tableHead.map((column, i) => (
                <TableCell
                  key={i}
                  style={{ minWidth: column.minWidth }}
                >
                  <Typography variant='overline' color='primary'>
                    {column.label}
                  </Typography>
                </TableCell>
              ))}
              {hasActions && (
              <TableCell>
                <Typography variant='overline' color='primary'>
                    Ações
                  </Typography>
              </TableCell>
            )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={JSON.stringify(row)}>
                  {Object.values(row).map((value: any, i) => {
                    return (
                        <TableCell key={i}>
                          {value}
                        </TableCell>
                    )
                  }
                )}
                {hasActions && (
                  <TableCell>
                    <IconButton
                      id='action-button'
                      aria-controls={isMenuOpen ? 'table-actions-menu' : undefined}
                      aria-haspopup='true'
                      aria-expanded={isMenuOpen ? 'true' : undefined}
                      onClick={(event) => {
                        handleOpenMenu(event)
                        setRowId && setRowId(row.id)
                      }}
                    >
                      <MoreVert />
                    </IconButton>
                  </TableCell>
                )}
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Menu
        id='table-actions-menu'
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleCloseMenu}
        MenuListProps={{
          'aria-labelledby': 'action-button'
        }}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right'
        }}
      >
        {renderActions?.map((action, i) => {
          return (
            <MenuItem key={i} onClick={() => {
              handleCloseMenu()
              action.action(rowId!)
            }}>
              {action.label}
            </MenuItem>
          )
        })}
      </Menu>
    </Paper>
  )
}
