const { handleScheduledTask } = require('./schedule.task');
const { generateCompletedTasksReport } = require('./generate.report');

const jobHandlers = {
    task: handleScheduledTask,
    report: generateCompletedTasksReport
};

module.exports = { jobHandlers };
