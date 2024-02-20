import React from 'react'
import { Table, TableBody, Typography, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

const TableTasks = (props) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Done</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.tableData.map((item) => (
                        <TableRow key={item._id}>
                            <TableCell>
                                <Typography variant="subtitle1" style={{ cursor: 'pointer' }} onClick={props.openTaskDetails ? () => props.openTaskDetails(item._id) : null}>
                                    {item.title}
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography className='short-description'>
                                    {item.description}
                                </Typography>
                            </TableCell>

                            <TableCell>
                                {item.done ? 'Yes' : 'No'}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TableTasks
