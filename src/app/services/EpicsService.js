const { response } = require('../../utils/response');
const QueryFuctions = require('../middlewares/QueryFunctions');
const Epics = new QueryFuctions('epics');
const Projects = new QueryFuctions('project');
const Project_has_User = new QueryFuctions('project_has_user');
const Stories = new QueryFuctions('stories');

exports.NewEpicsService = async (newEpic, res) => {

  const epicHasProject = await Projects.findById(newEpic.project);
  if (!epicHasProject) return response(`The project you're assigning the epic doesn't exist`, res, 200);

  Epics.save(newEpic, (err, result) => {
    if (err) return response(`Epic creation failed`, res, 200, err);
    return response(`Epic created succesfully`, res, 200, result);
  });
}

exports.AllEpicsService = async (userId, res) => {

  const projects = await Project_has_User.find({ User_id: userId });
  const ids = projects.map(project => project.Project_id);
  await Epics.findInSet('project', ids, (err, result) => {
    if (err) return response(`Error finding epic list`, res, 200, err);
    return response(`Epic list`, res, 200, result);
  });
}

exports.EpicsServiceById = async (id, res) => {

  Epics.findById(id, (err, result) => {
    if (err) return response(`Error finding epic ${id}`, res, 200, err);
    return response(`Epic ${id}`, res, 200, result);
  });
}

exports.EpicsServiceByIdAllStories = async (id, res) => {

  const epicId = await Epics.findById(id);
  if (!epicId) return response(`Epic ${id} doesn't exist`, res, 200);

  Stories.find({ epic: id }, (err, result) => {
    if (err) return response(`There're no stories for epic ${id}`, res, 200, err);
    return response(`Stories for epic ${id}`, res, 200, result);
  });
}

exports.EpicDeleteByIdService = async (id, res) => {

  const epic = await Epics.find({ id: id });
  if (epic.length === 0) return response(`Epic ${id} doesn't exist`, res, 200, {});
  const epicById = await Epics.deleteOne(id);
  if (epicById.affectedRows > 0) return response(`Epic ${id} deleted`, res, 200, epic);

  return response(`Epic ${id} failed to delete`, res, 500, {});
}