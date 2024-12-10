const Form = require('../models/absenceSchema.js');
const Student = require('../models/studentSchema.js');

const formCreate = async (req, res) => {
    try {
        const { user, startDate, endDate, reason, form, school, images } = req.body;
        const newForm = new Form({
            user,
            startDate,
            endDate,
            reason,
            form,
            school,
            images: images || []
        });
        await newForm.save();
        res.status(201).send({ message: "Form submitted successfully", data: newForm });
    } catch (err) {
        console.error('Error during form submission:', err);
        res.status(500).json({ message: 'Failed to submit form', error: err.message });
    }
};

const formList = async (req, res) => {
    try {
        let forms = await Form.find({ school: req.params.id }).populate("user", "name");
        if (forms.length > 0) {
            res.send(forms);
        } else {
            res.send({ message: "No forms found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const acceptForm = async (req, res) => {
    try {
        const form = await Form.findById(req.params.formId);
        if (!form) {
            return res.status(404).json({ message: "Form not found" });
        }

        const startDate = new Date(form.startDate);
        const endDate = new Date(form.endDate);

        const student = await Student.findById(form.user);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        student.attendance.forEach(att => {
            const attDate = new Date(att.date);
            if (attDate >= startDate && attDate <= endDate && att.status === 'Absent') {
                att.status = 'Present'; 
            }
        });

        await student.save();

        form.status = 'accepted';
        await form.save();

        res.status(200).json({ message: "Form accepted and attendance updated", form, student: student._id });
    } catch (err) {
        console.error('Error during form acceptance:', err);
        res.status(500).json({ message: 'Failed to accept form', error: err.message });
    }
};


const declineForm = async (req, res) => {
    try {
        const form = await Form.findByIdAndUpdate(
            req.params.formId,
            { status: 'declined' },
            { new: true }
        );
        if (!form) return res.status(404).json({ message: "Form not found" });

        res.status(200).json({ message: "Form declined", form });
    } catch (err) {
        res.status(500).json({ message: 'Failed to decline form', error: err.message });
    }
};

module.exports = { formCreate, formList, acceptForm, declineForm };
