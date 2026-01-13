import Task from "../models/task.model.js";


export const createTask = async (req, res) => {
    try {
        const {title, description, priority, dueDate, category} = req.body;
        const task = await Task.create({
            title,
            description,
            priority,
            dueDate,
            category,
            author: req.user._id,
        });

        res.status(201).json({
            success: true,
            message: "task created",
            task
        });
    } catch (error) {
        console.error("Create Task Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
          
        });
    }
};

export const getTasks = async (req, res) => {
    try {

        const tasks = await Task.find({
            author: req.user._id
        }).sort({ dueDate: 1 });
       
        res.status(200).json({
            success: true,
         tasks
        });
    } catch (error) {
        console.error("Get Task Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

     export const updateTask = async (req, res) => {
            try {
                console.log("hi")
                const {id} = req.params;
                const { title, description, priority, dueDate, status, category } = req.body;
                const task = await Task.findByIdAndUpdate(
               id,
                {
               title,
               description,
               priority,
               dueDate,
               status,
               category
           },
            { new: true }
        );


        return res.status(200).json({ success: true, message: "Task updated success", task });
    } catch (error) {
        console.error("Update Task Error:", error);
        return res.status(500).json({ success: false, message: "Task updated failed successfully", task });
    }
   
  
};

export const deleteTask = async (req, res) => {
    try {
        const {id} = req.params;
        const task = await Task.findByIdAndDelete(id);
                                                         
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        };

        res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        });
    } catch (error) {
        console.error("Delete Task Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
