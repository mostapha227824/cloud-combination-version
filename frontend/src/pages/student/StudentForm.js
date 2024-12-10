import { useEffect, useState } from 'react';
import { Box, CircularProgress, TextField, Typography, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import Popup from '../../components/Popup';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../redux/userRelated/userHandle';


const StudentForm = () => {
    const [form, setForm] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [reason, setReason] = useState("");
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const dispatch = useDispatch();
    const { status, currentUser, error } = useSelector(state => state.user);
    console.log("Status",status, currentUser, error);
    const user = currentUser._id
    const school = currentUser.school._id
    const address = "form"

    const formData = {
        user,
        school,
        startDate,
        endDate,
        reason,
        form,
        images
    };

    const convertToBase64 = file => new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => resolve(fileReader.result);
        fileReader.onerror = error => reject(error);
    });

    const handleFileChange = async (event) => {
        const files = Array.from(event.target.files);
        setLoading(true);
        const imagesBase64 = await Promise.all(files.map(file => convertToBase64(file)));
        setImages(imagesBase64);
        setLoading(false);
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);
        console.log("Form data before dispatch:", formData);
        dispatch(addStuff(formData, address)).then(() => {
            console.log("Dispatch resolved.");
        }).catch(err => {
            console.error("Dispatch error:", err);
        });
    };

    useEffect(() => {
        console.log("Effect fired: Status:", status, "Error:", error);
        if (status === "added") {
            setLoading(false);
            setShowPopup(true);
            setMessage("Done Successfully");
            
            
        } else if (error) {
            setLoading(false);
            setShowPopup(true);
            setMessage("Submission Error: " + error);
            
        }
    }, [status, error]);

    return (
     
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Box sx={{ width: '100%', maxWidth: 500, p: 2 }}>
                <Typography variant="h4" gutterBottom>Absence Form</Typography>
                <form onSubmit={submitHandler}>
                    <TextField
                        fullWidth
                        label="Start Date"
                        type="date"
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                        required
                        InputLabelProps={{ shrink: true }}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="End Date"
                        type="date"
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                        required
                        InputLabelProps={{ shrink: true }}
                        sx={{ mb: 2 }}
                    />
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="reason-label">Reason for Absence</InputLabel>
                        <Select
                            labelId="reason-label"
                            value={reason}
                            onChange={e => setReason(e.target.value)}
                            required
                        >
                            <MenuItem value="Medical">Medical</MenuItem>
                            <MenuItem value="Family Emergencies">Family Emergencies</MenuItem>
                            <MenuItem value="Mental Health Issues">Mental Health Issues</MenuItem>
                            <MenuItem value="Academic Conflict">Academic Conflict</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        label="Additional Information"
                        variant="outlined"
                        value={form}
                        onChange={e => setForm(e.target.value)}
                        required
                        multiline
                        rows={4}
                        sx={{ mb: 2 }}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        style={{ marginBottom: 16 }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Submit'}
                    </Button>
                </form>
                <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
            </Box>
        </Box>
        
     
    );
};

export default StudentForm;
