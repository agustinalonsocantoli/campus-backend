import Jobs from "../models/jobs.model.js";

const jobsController = {

    getAllJobs: async (req, res, next) => {
        
        try {
            
            const jobs = await Jobs.find()
            .exec()
            .catch((e) => next(e));

            res.json({
                message: "Jobs obtained successfully", 
                data: jobs
            });

        } catch(error) {
            next(error);
            res.json({
                messages: 'Error en el Servidor',
                error: error
            });
        }
    },
    getJobs: async (req, res, next) => {
        
        try {    

            const job = await Jobs.findOne({_id: req.params.id})
            .exec()
            .catch((e) => next(e));
    
            res.json({
                message: "Job obtained successfully",
                data: job
            });

        } catch(error) {
            next(error);
            res.json({
                messages: 'Error en el Servidor',
                error: error
            });
        }
    },
    newJobs: async (req, res, next) => {

        try {
    
            const newJob = {
                job: req.body.job,
                company: req.body.company,
                avatar: req.body.avatar,
                description: req.body.description,
                modality: req.body.modality,
                workday: req.body.workday,
                country: req.body.country,
                city: req.body.city,
                salary: req.body.salary
            }
    
            await Jobs.create(newJob)
            .catch((e) => next(e));
    
            res.json({
                message: "Job created successfully",
                data: newJob
            })

        } catch(error) {
            next(error);
            res.json({
                messages: 'Error en el Servidor',
                error: error
            });
        }
    },
    updateJobs: async (req, res, next) => {

        try {

            const editJob = {
                job: req.body.job,
                company: req.body.company,
                avatar: req.body.avatar,
                description: req.body.description,
                modality: req.body.modality,
                workday: req.body.workday,
                country: req.body.country,
                city: req.body.city,
                salary: req.body.salary
            }

            await Jobs.findOneAndUpdate({_id: req.params.id}, editJob)
            .catch((e) => next(e));

            res.json({
                message: `Job update successfully`,
                data: editJob
            })
        
        } catch(error) {
            res.json({
                messages: 'Error en el Servidor',
                error: error
            });
        }
    },
    deleteJobs: async (req, res, next) => {

        try {
            await Jobs.findOneAndDelete({_id: req.params.id})
            .exec()
            .catch((e) => next(e));

            res.json({
                message: `Job deleted successfully`,
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

export default jobsController;