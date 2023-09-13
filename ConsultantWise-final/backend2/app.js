const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors=require('cors');
const passport=require('passport');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');
const cookieParser = require("cookie-parser");
const nodemailer=require('nodemailer')


const LocalStrategy = require('passport-local').Strategy;
const secretKey="bduebdjwbdiwbe3y43nb@WVutbfejbfjk"
const app = express();
const port = process.env.PORT || 3001;


// connection to database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sidd@2105',
  database: 'GMT_DB',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

// passport configurations

passport.use(
  new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
    // Check if the user exists in the database
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
      if (err) {
        console.log("We got an error while fetching data");
        return done(err);
      }
      if (results.length === 0) {
        console.log("Can't find username inside the DB");
        return done(null, false, { message: 'Username not found' });
      }

      // Compare the provided password with the hashed password in the database
      const user = results[0];
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.log("Error while comparing passwords");
          return done(err);
        }
        if (!isMatch) {
          console.log("The password does not match with what is stored in DB");
          return done(null, false, { message: 'Incorrect password' });
        }
        console.log("SUCCESS");
        return done(null, user);
      });
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) {
      return done(err);
    }
    const user = results[0];
    done(null, user);
  });
});

// app declarations
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(""));






//Test Query

// db.query('SELECT * FROM test_table', (err, results) => {
//     if (err) {
//       console.error('Error executing query:', err);
//       return;
//     }
//     console.log('Query results:', results);
//   });
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


app.get('/getTestData',(req,res)=>{
    db.query('SELECT * FROM test_table', (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          return;
        }
        console.log('Query results:', results);
        res.send(results);
      });
})

app.post("/login", async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  if (!username || !password) {
      return res.status(400).json({ error: "fill the details" });
  };

  try {

      db.query('SELECT * from users WHERE username=?',[username],async (err,results)=>{
        if (err) {
          console.error('Error executing the query:', err);
          return res.status(400).json("Error finding details in DB");
        }
        if(results.length==1){

        
        const isMatch = await bcrypt.compare(password, results[0].password);
            console.log(isMatch);
            if (!isMatch) {
                return res.status(400).json({ error: "invalid crediential pass" });
            } else {
                const userLogin=results[0];
                console.log(userLogin);
                const token = jwt.sign(userLogin, secretKey, { expiresIn: '1h' });
                console.log(token);
                // Cookies.set('userLoginData', userLogin, { expires: 7 })
                // res.cookie("doctorwise", token, {
                //     expires: new Date(Date.now() + 2589000),
                //     httpOnly: true
                // });
               res.status(201).json(userLogin);
            }
          }
          else{
            return res.status(400).json({error: "User not found in DB"});
          }

      });
    } catch (error) {
      console.log("error the bhai catch ma for login time" + error.message);
      return res.status(400).json({ error: "invalid crediential pass" });
      
  }
});
app.post("/loginDoctor", async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  if (!username || !password) {
      return res.status(400).json({ error: "fill the details" });
  };

  try {

      db.query('SELECT * from doctors WHERE username=?',[username],async (err,results)=>{
        if (err) {
          console.error('Error executing the query:', err);
          return res.status(400).json("Error finding details in DB");
        }
        if(results.length==1){

        
        const isMatch = await bcrypt.compare(password, results[0].password);
            console.log(isMatch);
            if (!isMatch) {
                return res.status(400).json({ error: "invalid crediential pass" });
            } else {
                
              const userLogin=results[0];
              console.log(userLogin);
              const token = jwt.sign(userLogin, secretKey, { expiresIn: '1h' });
              console.log(token);
              res.cookie("doctorwise", token, {
                  expires: new Date(Date.now() + 2589000),
                  httpOnly: true
              });
             res.status(201).json(userLogin);
            }
          }
          else{
            return res.status(400).json("Doctor data not found in DB");
          }

      });
    } catch (error) {
      console.log("error the bhai catch ma for login time" + error.message);
      return res.status(400).json({ error: "invalid crediential pass" });
      
  }
});

app.post("/registerDoctor", async function (req, res) {
  console.log(req.body);
  const {  username, password, fName,lName,contact,email,address,speciality,hospital,age,city,imageUrl} = req.body;
  if (!fName || !username || !email || !password || !lName || !contact || !address || !speciality || !hospital || !age || !city) {
      return res.status(422).json({ error: "filll the all details" });
      console.log("Insufficient Details");
  };
  try {
          const hashedPassword = await bcrypt.hash(password, 10);
          const uniqueUserId=uuidv4();
          db.query('INSERT INTO doctors (id,username, password,fName,lName,contact,email,address,speciality,hospital,age,city,imageUrl) VALUES (?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?)', [uniqueUserId,username, hashedPassword,fName,lName,contact,email,address,speciality,hospital,age,city,imageUrl], (err) => {
            if (err) {
              console.error(err);
              return res.status(500).send('Registration failed');
            }
            return res.status(201).json('User registered successfully');
          });
  } catch (error) {
      console.log("Error" + error.message);
      return res.status(422).send(error);
  }
});

app.post("/register", async function (req, res) {
  console.log(req.body);
  const {  username, password, fName,lName,contact,email,address} = req.body;
  if (!fName || !username || !email || !password || !lName || !contact || !address) {
      return res.status(422).json({ error: "filll the all details" });
      console.log("Insufficient Details");
  };
  try {
          const hashedPassword = await bcrypt.hash(password, 10);
          const uniqueUserId=uuidv4();
          db.query('INSERT INTO users (id,username, password,fName,lName,contact,email,address) VALUES (?, ?, ?, ?, ?, ?, ?,?)', [uniqueUserId,username, hashedPassword,fName,lName,contact,email,address], (err) => {
            if (err) {
              console.error(err);
              return res.status(500).send('Registration failed');
            }
            return res.status(201).json('User registered successfully');
          });
  } catch (error) {
      console.log("Error" + error.message);
      return res.status(422).send(error);
  }
});

app.post('/addSlot',async (req,res)=>{
// console.log();
  const {  id,date_appointment,startTime,endTime} = req.body;
  if(!id || !startTime || !endTime || !date_appointment){
    console.log("Insufficient time slot details received");
    return res.status(400).json("Insufficient details");
  }
  try {
    
   
    
     
    
    const uniqueAppointmentId=uuidv4();
    db.query('INSERT INTO appointments (id,D_id,date_appointment, startTime,endTime) VALUES (?, ?, ?, ?,?)', [uniqueAppointmentId,id, date_appointment,startTime,endTime], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Registration failed');
      }
      return res.status(201).json('User registered successfully');
    });
  
} catch (error) {
console.log("Error" + error.message);
return res.status(422).send(error);
}
  

})

app.get("/validuser",(req, res) => {
  console.log(req.id);
      db.query('SELECT * from users WHERE id=?',[req.id],(err,results)=>{
        if(err){
          return res.status(400).json("Error fetching data from DB")
        }
        return res.status(201).json(results);
      })
 
});

app.get("/logout", async (req, res) => {
  try {
      req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
          return curelem.token !== req.token
      });

      // res.clearCookie("doctorwise", { path: "/" });
      // req.rootUser.save();
      Cookies.remove('userLoginData');
      res.status(201).json(req.rootUser.tokens);
      console.log("user logout");

  } catch (error) {
      console.log(error + "jwt provide then logout");
  }
});

app.get('/getSlots/:dateToSearch/:id',async (req,res)=>{
  // const {id,dateToSearch}=req.body;
  const {dateToSearch,id}=req.params;
  console.log(dateToSearch);
  
  const nayiDate=new Date(dateToSearch)
  // console.log(nayiDate);
  const year = nayiDate.getFullYear();
  
    const month = String(nayiDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(nayiDate.getDate()).padStart(2, "0");
    const dateToBeSearched=`${year}-${month}-${day}`;
    console.log(dateToBeSearched);
  // const id=Cookies.get('userLoginData');
  if(!id || !dateToSearch){
    console.log("Insufficient time slot details received");
    return res.status(400).json("Insufficient details");
  }
 
  try{
    db.query('SELECT startTime,endTime FROM appointments WHERE D_id=? AND date_appointment=?',[id,dateToBeSearched],(err,results)=>{
      if(err){
        console.log(err);
        return res.status(400).json("We got an error");
      }
      else{
        console.log(results);
        return res.status(200).json(results);
      }
    })
  }
  catch{
    res.status(401).json("Error catched");

  }

})
app.get('/getDoctorDetails/:speciality/:date',(req,res)=>{
  console.log("Query invoked");
  const {speciality,date}=req.params;
  console.log(date);
  const nayiDate= new Date(date);
  const year = nayiDate.getFullYear();
  
    const month = String(nayiDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(nayiDate.getDate()).padStart(2, "0");
  const formattedDate=`${year}-${month}-${day}`;
  const queryGiven="SELECT * FROM doctors WHERE speciality=? AND id IN ( SELECT D_id from appointments WHERE date_appointment=? AND isBooked=?)";
  db.query(queryGiven,[speciality,formattedDate,0],(err,results)=>{
    if(err){
      console.log("Cant fetch doctor details");
      return res.json("Error fetching doctor details");
    }
    else{
      console.log(results);
      console.log("Successfully fetched doctor details");
      return res.json(results);
    }
  })
  
})
app.get('/getDoctorFreeSlotDetails/:id/:date',(req,res)=>{
  // console.log("Query invoked");
  const {id,date}=req.params;
  const nayiDate= new Date(date);
  const year = nayiDate.getFullYear();
  
    const month = String(nayiDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(nayiDate.getDate()).padStart(2, "0");
  const formattedDate=`${year}-${month}-${day}`;

  // console.log(id);
  db.query('SELECT * FROM appointments WHERE D_id=? AND isBooked=? AND date_appointment=?' ,[id,0,formattedDate],(err,results)=>{
    if(err){
      console.log("Cant fetch All Slot details",err);
      return res.json("Error fetching All slot details");
    }
    else{
      // console.log(results);
      console.log("Successfully fetched All slot details");
      return res.json(results);
    }
  })
  
})
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "siddharth.goel2105@gmail.com", // generated ethereal user
    pass: "wepf behb vvxh vvef", // generated ethereal password
  },
});
const sendEmail=async (reciptent,sub,messageToBeSent)=>{
  // const { email, subject, message } = req.body;

  const email=reciptent;
  const subject = sub
  const message=messageToBeSent
console.log(email, subject, message);

const mailOptions = {
  from:"siddharth.goel2105@gmail.com",
  to: reciptent,
  subject: subject,
  text: messageToBeSent,
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent successfully!");
  }
})
}
app.post('/bookASlot',(req,res)=>{
  console.log(req.body);
  const {user_id,app_id}=req.body;
  // console.log(userid,app_id);
  if(!user_id || !app_id){
    console.log("Incomplete details");
    return res.json("Incomplete details received");

  }
  const mailDetails={
    recipent:"",
    startTime:"",
    endTime:""
  }
  try{
    db.query('SELECT email from users WHERE id=?',[user_id],(err,results)=>{
      if(err){
        console.log("bhaad mei jaaye error");
      }
      else{
        mailDetails.recipent=results[0].email;
        
      }
    })
    db.query('SELECT startTime,endTime from appointments WHERE id=?',[app_id],(err,results)=>{
      if(err){
        console.log("bhaad mei jaaye error apointment ka");
      }
      else{
        mailDetails.startTime=results[0].startTime;
        mailDetails.endTime=results[0].endTime;
        
      }
    })
    db.query('INSERT INTO booked_appointments(patient_id,appointment_id) VALUES(?,?)',[user_id,app_id],(err,results)=>{
      if(err){
        console.log(err);
        return res.json(err);
      }
      else{
        console.log("Data added to apponintment booking table successfully");
        // return res.json("Data inserted successfully");
      }
    });
    db.query('UPDATE appointments SET isBooked=? WHERE id=? ',[1,app_id],(err,results)=>{
      if(err){
        console.log("Cant update data",err);
        return res.json("Data updation error");

      }
      else{
        console.log("Data updated successfully");
        const reciptent=mailDetails.recipent;
        const sub="Appointment confirmation mail form ConsultantWise"
        const message=`Your appointment is confirmed from ConsultantWise for the time slot ${mailDetails.startTime} to ${mailDetails.endTime}
        Please dont reply to this mail ,
        this is a test email`;

        sendEmail(reciptent,sub,message);
        return res.json("Data updated and added successfully");
      }
    })

  }catch(e){
    console.log("Exception caught",err);
    return res.json(err);

  }

})