const Student = require("../models/student_model");

const getStudent = async (req, res) => {
  try {
    var students;
    if (req.params.id != null) {
      students = await Student.findById(req.params.id);
    } else {
      if (req.query.name != null) {
        students = await Student.find({ name: req.query.name });
      } else {
        students = await Student.find();
      }
    }
    res.status(200).send(students);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const postStudent = async (req, res) => {
  const student = req.body;
  try {
    const newStudent = await Student.create(student);
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const putStudent = async (req, res) => {
  const student = req.body;
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      student._id,
      student,
      { new: true }
    );
    res.status(200).json(updatedStudent);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteStudent = async (req, res) => {
  const student = req.body;
  try {
    const rc = await Student.findByIdAndDelete(student._id);
    res.status(200).send();
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  getStudent,
  postStudent,
  putStudent,
  deleteStudent,
};
