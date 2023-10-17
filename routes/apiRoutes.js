const express = require("express");
const { JobDetails, Jobs} = require("../models/jobs");
const router = express.Router(); 
const jwtAuth = require("../middleware/jwtAuth");

router.get("/", (req,res)=>{
    res.send("api router")
})


//to gell all Jobs
router.get('/jobs',jwtAuth, async(req,res)=>{
    try{
        const allJobs = await Jobs.find({});//all jobs will return in jobs model
        res.json({jobs:allJobs})

    }catch(e){
        console.log(e.message);
        return res.status(500).json({message:"Internal Server Error"})
    }
})

//specific job based on jobId 
router.get("/jobs/:id", jwtAuth, async(req,res)=>{
    try{
        const {id} = req.params;
        const jobDetails = await JobDetails.findOne({_id: id});
        

        if(!jobDetails){
            return res.status(404).json({message:"Job Not Found"})
        }
        const jobTitle = jobDetails.title;

        const similarJobs = await Jobs.find({
            title:{$regex:jobTitle, $options:'i'}, //case insentitive title matching
            _id: {$ne: id} //exclude the current job 
        })
        

        res.status(200).json({jobDetails: jobDetails, similarJobs:similarJobs})

    }catch(e){
        console.log(e.message);
        return res.status(500).json({message:"Internal Server Error"})
    }
})


//filters API
router.get('/filterjobs', jwtAuth, async (req, res) => {
    try {
      const { employement_type, minimum_package, search } = req.query;
      console.log(employement_type)
  
      // Construct a query to filter jobs based on the provided parameters
      const query = {};
  
      if (employement_type) {
        // Split the employment_type string into an array using commas as the delimiter
        const employmentTypesArray = employement_type.split(',');
  
        // Use $in operator to match any of the selected employment types
        query.employmentType = { $in: employmentTypesArray.map(type => new RegExp(type, 'i')) };
        
      }
  
      if (minimum_package) {
        // Parse the minimum_package value and convert it to a numeric value (remove non-numeric characters)
        const minPackageValue = parseFloat(minimum_package.replace(/\D+/g, ''));
  
        if (!isNaN(minPackageValue)) {
          query.packagePerAnnum = { $gte: minPackageValue };
        }
      }
  
      if (search) {
        query.title = { $regex: search, $options: 'i' }; // Case-insensitive title matching
      }
  
      // Find jobs that match the query
      const filteredJobs = await Jobs.find(query);
      if (filteredJobs.length === 0) {
        return res.status(404).json({ message: 'No Jobs found' });
      }
  
      return res.json(filteredJobs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  
module.exports = router;