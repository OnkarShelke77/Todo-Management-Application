const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const Todo = require('../models/Todo');
const { Octokit } = require("@octokit/rest");
require('dotenv').config();

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

router.post('/:id/export', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('todos');
    const completedTodos = project.todos.filter(todo => todo.status).length;
    const totalTodos = project.todos.length;

    let markdown = `# ${project.title}\n\n`;
    markdown += `Summary: ${completedTodos} / ${totalTodos} completed\n\n`;

    markdown += `## Pending Todos\n`;
    project.todos.forEach(todo => {
      if (!todo.status) {
        markdown += `- [ ] ${todo.description}\n`;
      }
    });

    markdown += `\n## Completed Todos\n`;
    project.todos.forEach(todo => {
      if (todo.status) {
        markdown += `- [x] ${todo.description}\n`;
      }
    });

    const gist = await octokit.gists.create({
      description: `Summary of ${project.title}`,
      files: {
        [`${project.title}.md`]: {
          content: markdown
        }
      },
      public: false
    });

    res.json(gist.data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
