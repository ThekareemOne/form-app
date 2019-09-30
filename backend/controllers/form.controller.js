const Form = require('../models/form.model');

//Create new FOrm
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        return res.status(400).send({
            message: "Form content can not be empty"
        });
    }

    // Create a Form
    const form = new Form({
        name: req.body.name,
        description: req.body.description,
        email: req.body.email, 
        form: req.body.form
    });

    // Save FOrm in the database
    form.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the form."
        });
    });
};

// Retrieve all forms from the database.
exports.findAll = (req, res) => {
    Form.find()
    .then(forms => {
        res.send(forms);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving forms."
        });
    });
};

// Find a single form with a productId
exports.findOne = (req, res) => {
    Form.findById(req.params.formId)
    .then(form => {
        if(!form) {
            return res.status(404).send({
                message: "Form not found with id " + req.params.formId
            });            
        }
        res.send(form);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Form not found with id " + req.params.formId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving form with id " + req.params.formId
        });
    });
};

// Update a form
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Form content can not be empty"
        });
    }

    // Find and update form with the request body
    Form.findByIdAndUpdate(req.params.formId, {
        email: req.body.email,
        form: req.body.form,
    }, {new: true})
    .then(form => {
        if(!form) {
            return res.status(404).send({
                message: "FOrm not found with id " + req.params.formId
            });
        }
        res.send(form);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Form not found with id " + req.params.formId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.formId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Form.findByIdAndRemove(req.params.formId)
    .then(form => {
        if(!form) {
            return res.status(404).send({
                message: "Form not found with id " + req.params.formId
            });
        }
        res.send({message: "Form deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Form not found with id " + req.params.formId
            });                
        }
        return res.status(500).send({
            message: "Could not delete form with id " + req.params.formId
        });
    });
};