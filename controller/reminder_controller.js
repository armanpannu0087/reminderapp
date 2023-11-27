let database = require("../database");

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: req.user.reminders, user: req.user });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: req.user.reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: req.user.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    req.user.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  // update: (req, res) => {
  //   // implementation here 👈
    
  // },

  update: (req, res) => {
    let reminderToUpdate = req.params.id;
    let index = req.user.reminders.findIndex(function (reminder) {
      return reminder.id == reminderToUpdate;
    });
  
    if (index !== -1) {
      req.user.reminders[index].title = req.body.title;
      req.user.reminders[index].description = req.body.description;
      req.user.reminders[index].completed = req.body.completed === 'true'; // assuming the completed value comes as a string
  
      res.redirect("/reminders");
    } else {
      res.render("reminder/index", { reminders: req.user.reminders });
    }
  },
  


  // delete: (req, res) => {
  //   // implementation here 👈
  // },

  delete: (req, res) => {
    let reminderToDelete = req.params.id;
    let index = database.cindy.reminders.findIndex(function (reminder) {
      return reminder.id == reminderToDelete;
    });
  
    if (index !== -1) {
      req.user.reminders.splice(index, 1);
      res.redirect("/reminders");
    } else {
      res.render("reminder/index", { reminders: req.user.reminders });
    }
  },
  
};

module.exports = remindersController;
