import Project from "./project.model.js";

/* Create Project */
export const createProject = async (req, res) => {
  const { title, location, description } = req.body;

  const project = await Project.create({
    title,
    location,
    description,
    image: req.file ? `/uploads/${req.file.filename}` : null,
  });

  res.status(201).json(project);
};

/* Get All Projects (Public) */
export const getProjects = async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
};

/* Update Project */
export const updateProject = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  project.title = req.body.title || project.title;
  project.location = req.body.location || project.location;
  project.description = req.body.description || project.description;

  if (req.file) {
    project.image = `/uploads/${req.file.filename}`;
  }

  const updatedProject = await project.save();
  res.json(updatedProject);
};

/* Delete Project */
export const deleteProject = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  await project.deleteOne();
  res.json({ message: "Project removed" });
};
