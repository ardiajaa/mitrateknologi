const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/projectManagement', { useNewUrlParser: true, useUnifiedTopology: true });

// Project Schema
const projectSchema = new mongoose.Schema({
    name: String,
    status: String,
    deadline: String
});

const Project = mongoose.model('Project', projectSchema);

// API Endpoints
app.get('/api/projects', async (req, res) => {
    const projects = await Project.find();
    res.json(projects);
});

app.post('/api/projects', async (req, res) => {
    const newProject = new Project(req.body);
    await newProject.save();
    res.json(newProject);
});

app.put('/api/projects/:id', async (req, res) => {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProject);
});

app.delete('/api/projects/:id', async (req, res) => {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});