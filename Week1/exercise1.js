import express from "express";
import mysql from "mysql";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "meetup",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySql is Connected...");
});

app.get("/createdb", (req, res) => {
  const sql = "CREATE DATABASE meetup";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Database meetup created...");
  });
});

app.get("/create-invitee-table", (req, res) => {
  const sql =
    "CREATE TABLE invitee(invitee_no INT, invitee_name VARCHAR(255), invited_by VARCHAR(255), PRIMARY KEY (invitee_no))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Invitee table is created...");
  });
});

app.get("/create-room-table", (req, res) => {
  const sql =
    "CREATE TABLE room(room_no INT, room_name VARCHAR(255), floor_number INT, PRIMARY KEY (room_no))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Room table is created...");
  });
});

app.get("/create-meeting-table", (req, res) => {
  const sql =
    "CREATE TABLE meeting(meeting_no INT, meeting_title VARCHAR(255), starting_time DATETIME, ending_time DATETIME, room_no INT, PRIMARY KEY (meeting_no))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Meeting table is created...");
  });
});

app.get("/insert-rows-to-invitee", (req, res) => {
  let invitees = [
    { invitee_no: 1, invitee_name: "Joe", invited_by: "Mars" },
    { invitee_no: 2, invitee_name: "John", invited_by: "Mars" },
    { invitee_no: 3, invitee_name: "James", invited_by: "Mars" },
    { invitee_no: 4, invitee_name: "Jeremy", invited_by: "Mars" },
    { invitee_no: 5, invitee_name: "Joffrey", invited_by: "Mars" },
  ];
  let sql =
    "INSERT INTO invitee (invitee_no, invitee_name, invited_by) VALUES ?";
  const values = invitees.map((invitee) => [
    invitee.invitee_no,
    invitee.invitee_name,
    invitee.invited_by,
  ]);
  const query = db.query(sql, [values], (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("rows added");
  });
});

app.get("/insert-rows-to-room", (req, res) => {
  let rooms = [
    { room_no: 1, room_name: "Cozy", floor_number: 1 },
    { room_no: 2, room_name: "Golden", floor_number: 1 },
    { room_no: 3, room_name: "Blue", floor_number: 1 },
    { room_no: 4, room_name: "Paradise", floor_number: 2 },
    { room_no: 5, room_name: "Ember", floor_number: 2 },
  ];
  let sql = "INSERT INTO room (room_no, room_name, floor_number) VALUES ?";
  const values = rooms.map((room) => [
    room.room_no,
    room.room_name,
    room.floor_number,
  ]);
  const query = db.query(sql, [values], (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("rows added");
  });
});

app.get("/insert-rows-to-meeting", (req, res) => {
  let meetings = [
    {
      meeting_no: 1,
      meeting_title: "Project Kickoff",
      starting_time: "2023-04-10 10:00:00",
      ending_time: "2023-04-10 12:00:00",
      room_no: "101",
    },
    {
      meeting_no: 2,
      meeting_title: "Marketing Strategy Review",
      starting_time: "2023-04-11 14:00:00",
      ending_time: "2023-04-11 16:00:00",
      room_no: "306",
    },
    {
      meeting_no: 3,
      meeting_title: "Team Building Event",
      starting_time: "2023-04-13 13:30:00",
      ending_time: "2023-04-13 17:00:00",
      room_no: "101",
    },
    {
      meeting_no: 4,
      meeting_title: "Product Development Status Update",
      starting_time: "2023-04-14 11:00:00",
      ending_time: "2023-04-14 12:30:00",
      room_no: "205",
    },
    {
      meeting_no: 5,
      meeting_title: "Budget Planning Meeting",
      starting_time: "2023-04-15 09:00:00",
      ending_time: "2023-04-15 11:00:00",
      room_no: "102",
    },
  ];
  let sql =
    "INSERT INTO meeting (meeting_no, meeting_title, starting_time, ending_time, room_no) VALUES ?";
  const values = meetings.map((meeting) => [
    meeting.meeting_no,
    meeting.meeting_title,
    meeting.starting_time,
    meeting.ending_time,
    meeting.room_no,
  ]);
  const query = db.query(sql, [values], (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("rows added");
  });
});
app.listen("2001", () => {
  console.log("Server is running....");
});
//