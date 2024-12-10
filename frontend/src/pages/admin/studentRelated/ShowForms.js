import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper, Table, TableBody, TableCell, TableHead, TableRow, Button
} from '@mui/material';
import { getAllForms, acceptForm, declineForm } from '../../../redux/formRelated/formHandle';

const ShowForms = () => {
    const dispatch = useDispatch();
    const { formsList, loading, error } = useSelector(state => state.form);
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        if (currentUser?._id) {
            dispatch(getAllForms(currentUser._id, "form"));
        }
    }, [currentUser?._id, dispatch]);

    const handleAccept = async (formId) => {
      await dispatch(acceptForm(formId));
      dispatch(getAllForms(currentUser._id, "form")); 
  };

  const handleDecline = async (formId) => {
      await dispatch(declineForm(formId));
      dispatch(getAllForms(currentUser._id, "form")); 
  };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading forms: {error.toString()}</div>;
    if (!formsList || formsList.length === 0) return <div>No forms available.</div>;

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>User</TableCell>
                        <TableCell>Date Start</TableCell>
                        <TableCell>Date End</TableCell>
                        <TableCell>Reason</TableCell>
                        <TableCell>Images</TableCell>
                        <TableCell>Details</TableCell>
                        <TableCell>Actions</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {formsList.map((form) => (
                        <TableRow key={form._id}>
                            <TableCell>{form.user.name}</TableCell>
                            <TableCell>{new Date(form.startDate).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(form.endDate).toLocaleDateString()}</TableCell>
                            <TableCell>{form.reason}</TableCell>
                            <TableCell>
                                {form.images.map((img, index) => (
                                    <a key={index} href={img} target="_blank" rel="noopener noreferrer">
                                        <img src={img} alt="Uploaded" style={{ width: '100px', height: '100px' }} />
                                    </a>
                                ))}
                            </TableCell>
                            <TableCell>{form.form}</TableCell>
                            <TableCell>
                                {form.status === 'pending' ? (
                                    <>
                                        <Button color="primary" onClick={() => handleAccept(form._id)}>Accept</Button>
                                        <Button color="secondary" onClick={() => handleDecline(form._id)}>Decline</Button>
                                    </>
                                ) : form.status}
                            </TableCell>
                            <TableCell>{form.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default ShowForms;
