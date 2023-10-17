const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const { JobDetails, Jobs} = require("./models/jobs");
const port = 4444 || process.env.PORT ;

app.use(express.json());
app.use(cors());

//mongodb initailization 
mongoose.connect("mongodb+srv://ajayjoji1723:Ajay123@cluster0.xs7ouo1.mongodb.net/jobbyApp?retryWrites=true&w=majority")
.then(()=>console.log("DB connected"))
.catch((error)=>console.log(error))



// sending data to db 

// const addJobs = async () => {
//   try {
//     const jobDetail = new JobDetails({
//       title: "Frontend Engineer",
//       companyLogoUrl:   "https://assets.ccbp.in/frontend/react-js/jobby-app/facebook-img.png",
//       companyWebsiteUrl:   "https://about.facebook.com/",
//       rating: 4,
//       location: "Delhi",
//       packagePerAnnum: "15 LPA",
//       jobDescription:"The Experimentation Platform team builds internal tools with a big impact across the company. We are looking to add a UI engineer to our team to continue to improve our experiment analysis workflow and tools. Ideal candidates will be excited by direct contact with our users, fast feedback, and quick iteration.",
//       skills: [
//         {
//             name: "HTML 5",
//             imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/html-img.png"
//             },
//             {
//             name: "CSS 3",
//             imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/css-img.png"
//             },
//             {
//             name: "Javascript",
//             imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/javascript-img.png"
//             },
//             {
//             name: "React JS",
//             imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/reactjs-img.png"
//             },
//             {
//             name: "Redux",
//             imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/redux-img.png"
//         }
//       ],

//       lifeAtCompany: {
//         description: "Our core philosophy is people over process. Our culture has been instrumental to our success. It has helped us attract and retain stunning colleagues, making work here more satisfying. Entertainment, like friendship, is a fundamental human need, and it changes how we feel and gives us common ground. We want to entertain the world.",
//         imageUrl:  "https://assets.ccbp.in/frontend/react-js/jobby-app/life-facebook-img.png"
//       },
//       employmentType: "Part Time",
//     });

//     const savedJobDetail = await jobDetail.save();
//     // Create and save a Job document that uses the same _id as the JobDetail

//     const job = new Jobs({
//       _id: savedJobDetail._id, // Use the same _id as the JobDetail
//       title: "Frontend Engineer",
//       companyLogoUrl:  "https://assets.ccbp.in/frontend/react-js/jobby-app/facebook-img.png",
//       rating: 4,
//       location: "Delhi",
//       packagePerAnnum: "15 LPA",
//       jobDescription:"The Experimentation Platform team builds internal tools with a big impact across the company. We are looking to add a UI engineer to our team to continue to improve our experiment analysis workflow and tools. Ideal candidates will be excited by direct contact with our users, fast feedback, and quick iteration.",
//       employmentType: "Part Time",
//     });


//     await job.save();
//     await mongoose.disconnect();
//   } catch (e) {
//     console.log(e);
//   }
// };

// addJobs()






app.use("/auth", require('./routes/authRoutes')) //auth routes
app.use("/api", require('./routes/apiRoutes')) //api routes


app.listen(port, ()=>{
    console.log(`Server Running at ${port}`)
})