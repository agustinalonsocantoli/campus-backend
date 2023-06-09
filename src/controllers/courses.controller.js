import Courses from "../models/courses.model.js";

const coursesController = {

    getAllCourses: async (req, res, next) => {
        
        try {
            
            const courses = await Courses.find()
            .exec()
            .catch((e) => next(e));

            res.json({
                message: "Courses obtained successfully", 
                data: courses
            });

        } catch(error) {
            next(error);
            res.json({
                messages: 'Error en el Servidor',
                error: error
            });
        }
    },
    getCourses: async (req, res, next) => {
        
        try {    

            const course = await Courses.findOne({_id: req.params.id})
            .exec()
            .catch((e) => next(e));
    
            res.json({
                message: "Course obtained successfully",
                data: course
            });

        } catch(error) {
            next(error);
            res.json({
                messages: 'Error en el Servidor',
                error: error
            });
        }
    },
    newCourses: async (req, res, next) => {

        try {
    
            const newCourse = {
                name: req.body.name,
                modules: [{
                    moduleName: req.body.moduleName,
                    lesson: [{
                        lessonName: req.body.lessonName,
                        lessonTime: req.body.lessonTime
                    }]
                }],
                duration: req.body.duration,
                imgUrl: req.body.imgUrl,
                type: req.body.type,
                description: req.body.description,
                prominent: req.body.prominent
            }
    
            await Courses.create(newCourse)
            .catch((e) => next(e));
    
            res.json({
                message: "Course created successfully",
                data: newCourse
            })

        } catch(error) {
            next(error);
            res.json({
                messages: 'Error en el Servidor',
                error: error
            });
        }
    },
    updateCourses: async (req, res, next) => {

        try {

            const editCourse = {
                name: req.body.name,
                modules: [{
                    moduleName: req.body.moduleName,
                    lesson: [{
                        lessonName: req.body.lessonName,
                        lessonTime: req.body.lessonTime
                    }]
                }],
                duration: req.body.duration,
                imgUrl: req.body.imgUrl,
                type: req.body.type,
                description: req.body.description,
                prominent: req.body.prominent
            }

            await Courses.findOneAndUpdate({_id: req.params.id}, editCourse)
            .catch((e) => next(e));

            res.json({
                message: `Course update successfully`,
                data: editCourse
            })
        
        } catch(error) {
            res.json({
                messages: 'Error en el Servidor',
                error: error
            });
        }
    },
    deleteCourses: async (req, res, next) => {

        try {
            await Courses.findOneAndDelete({_id: req.params.id})
            .exec()
            .catch((e) => next(e));

            res.json({
                message: `Course deleted successfully`,
                data: req.params.id
            })

        } catch(error) {
            next(error);
            res.json({
                messages: 'Error en el Servidor',
                error: error
            });
        }
    },
}

export default coursesController;