import {
  Box,
  CircularProgress,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
export function Table({ columns, data, loading, align, notFoundMessage }) {
  return (
    <Box
      width="100%"
      sx={{
        '& .MuiTable-root': {
          borderRadius: 4,
        },
      }}
    >
      <MuiTable>
        <TableHead
          style={{
            backgroundColor: '#EFEFEF',
            height: '30px',
            overflow: 'hidden',
          }}
        >
          <TableRow data-testid="thead">
            {columns?.map((column: any, index: number) => (
              <TableCell
                data-testid={`table-header-${index}`}
                key={column?.id}
                align={column?.align ?? 'left'}
                style={{
                  minWidth: column?.minWidth,
                  maxWidth: column?.maxWidth ?? '100%',
                  fontWeight: 600,
                  border: 'none',
                  borderRadius:
                    index === 0
                      ? '5px 0 0 5px'
                      : index === columns?.length - 1
                      ? '0 5px 5px 0'
                      : '0',
                  padding: column?.padding,
                }}
              >
                <Typography
                  variant="body2"
                  fontSize={16}
                  color="#717171!important"
                  fontWeight={600}
                >
                  {column?.label}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody sx={{ border: 'none' }}>
          {loading && (
            <TableRow>
              <TableCell colSpan={12} align={align}>
                <Box
                  sx={{
                    textAlign: 'center',
                    width: '100%',
                    height: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CircularProgress sx={{ color: '#F58B3C' }} />
                </Box>
              </TableCell>
            </TableRow>
          )}

          {!loading &&
            data?.length > 0 &&
            data?.map((row: any, rowIndex: number) => (
              <TableRow data-testid={`trow-${rowIndex}`} key={rowIndex}>
                {columns?.map((column: any) => (
                  <TableCell
                    data-testid={`table-cell-${rowIndex}`}
                    key={column?.id}
                    align={column?.align ?? 'left'}
                    sx={{
                      background: rowIndex % 2 === 0 ? '#fff' : '#FAFAFC',
                      border: 'none',
                      padding: column?.padding,
                      maxWidth: column?.maxWidth ?? '100%',
                    }}
                  >
                    {column?.render ? column.render(row) : '-'}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          {loading ||
            (data?.length < 1 && (
              <TableRow>
                <TableCell colSpan={12}>
                  <Box
                    data-testid="not-found-message"
                    sx={{
                      textAlign: 'center',
                      width: '100%',
                      height: '100px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {notFoundMessage}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </MuiTable>
    </Box>
  );
}
