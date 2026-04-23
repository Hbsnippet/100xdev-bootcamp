const express = require("express");
const jwt = require('jsonwebtoken');
const JWT_SECRET = "shhhhhh";
const app = express();
const authMiddleware = require("./middlewares/middleware");
const {User, Organization, Board, Issue} = require('./db')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const validate = require('./middlewares/validate')

const { 
  signupSchema, 
  loginSchema,
  createOrgSchema,
  addMemberSchema,
  createBoardSchema,
  createIssueSchema,
  updateIssueSchema
} = require('./validator/schema')



app.use(express.json());
app.use(cookieParser())



app.post("/signup", validate(signupSchema), async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userExist = await User.findOne({username: username});

    if (userExist) {
        return res.status(401).json({ message: "user with this username already exists" });
    }

    const hashPass = await bcrypt.hash(password, 10);

    const newUser = await User.create ({
        username: username,
        password: hashPass
    });


    res.status(201).json({ 
        message: "user created successfully",
        userId: newUser._id 
    });
});

app.post("/signin", validate(loginSchema),async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userExist = await User.findOne ({username: username});

    if (!userExist) {
        return res.status(404).json({ message: "invalid password or username" });
    }

    const correctPass = await bcrypt.compare(password, userExist.password)
     
    if(correctPass){
        const token = jwt.sign({
        userId: userExist._id
    }, JWT_SECRET);

    res.cookie('token', token)
    res.json({message: "Login successfully"})
    }

    else {
        res.json({message: "pass in invalid"})
    }

});



app.post("/organisation",validate(createOrgSchema), authMiddleware, async (req,res) => {
    const userId = req.userId;
    // console.log(userId);

    const title = req.body.title;
    const description = req.body.description;

    const newOrg = await Organization.create({
        title: title,
        description: description,
        admin: userId,
        members: []
    })

    res.json({
        message: "organisation created successfully",
        organizationId : newOrg._id
    })
})

app.post("/add-member-to-organisation",validate(addMemberSchema),authMiddleware, async (req,res) => {
    const userId = req.userId;
    const {organisationId} = req.body;
    const memberUsername = req.body.memberUsername;

    const org = await Organization.findById(organisationId);

    if(!org){
        return res.status(404).json({message: "organisation not found"})
    };

    if(org.admin.toString() !== userId){
        return res.status(404).json({message : "only admin can add member"})
    };

    const memberUser = await User.findOne({username: memberUsername})
    if(!memberUser){
        return res.status(404).json({message: "user not found"})
    }

    if(org.members.includes(memberUser._id)){
        return res.status(400).json({message: "User already a member"})
    }

    await Organization.updateOne(
       { _id: organisationId},
       { $push: {members: memberUser._id}}
    )

    res.json({
        message: "Member Added successfully"
    });
});


app.post("/board",validate(createBoardSchema),authMiddleware, async (req,res) => {
    const userId = req.userId;
    const organisationId = req.body.organisationId;
    const title = req.body.title;

    const org = await Organization.findById(organisationId);

    if(!org){
        return res.status(404).json({message: "Organiszation not found"});
    }

    const isAdminOrMember = org.admin.equals(userId) || org.members.some(m => m.equals(userId))

    if(!isAdminOrMember){
        return res.status(403).json({message: "You do not have permission to create board in this org"})
    }

    const newBoard = await Board.create({
        title: title,
        organizationId: organisationId
    })
   

    res.json({
        message: "Board created successfully",
        boardId: newBoard._id,
        boardTitle: newBoard.title
    })
})


app.post("/issue",validate(createIssueSchema),authMiddleware, async (req,res) => {
    const userId = req.userId;
    const boardId = req.body.boardId;
    const title = req.body.title;

    const board = await Board.findById(boardId)

    if(!board){
        return res.status(404).json({ message: "Board not found" });
    }

    const org = await Organization.findById(board.organizationId);

    if(!org){
        return res.status(404).json({message: "Organization not found"})
    }

    const hasAccess = org.admin.equals(userId) || org.members.some(m => m.equals(userId));

    if(!hasAccess){
        return res.status(403).json({ message: "You don't have access to this board" });
    }

    const newIssue = await Issue.create({
        title: title,
        boardId: board.id
    });

    res.json({
        message: "Issue created successfully",
        issueId: newIssue._id
    })
})


app.get("/boards",authMiddleware, async (req, res) => {
    const userId = req.userId
    const {organisationId} = req.query;

    if(!organisationId){
        return res.status(400).json({message: "OrganizationId required"})
    }

    const org = await Organization.findById(organisationId);

    if(!org){
        return res.status(404).json({message: "Organization not find"})
    }

    const hasAccess = org.admin.equals(userId) || org.members.some(m => m.equals(userId));

    if(!hasAccess){
        return res.status(403).json({message: "you don't have access nigga"})
    }

    const boards = await Board.find({organizationId: organisationId})

    res.json({
        boards: boards
    })
})

app.get("/issues", authMiddleware, async (req, res) => {
    const userId = req.userId;
    const boardId = req.query.boardId;

    if (!boardId) {
        return res.status(400).json({ message: "boardId required" });
    }

    const board = await Board.findById(boardId)

    if (!board) {
        return res.status(404).json({ message: "Board not found" });
    }

    const org = await Organization.findById(board.organizationId)

    if (!org) {
        return res.status(404).json({ message: "Organization not found" });
    }

    const hasAccess = org.admin.equals(userId) || org.members.some(m => m.equals(userId));
    
    if(!hasAccess){
        return res.status(403).json({
            message: "you have no access gigantic vagina"
        })
    }

    const issue = await Issue.find({boardId})

    res.json({
        issue
    })
})



app.get("/members", authMiddleware, async (req, res) => {
    const userId = req.userId;
    const organisationId = req.query.organisationId

    if(!organisationId){
        return res.status(400).json({message: "organizationId missing"})
    }

    const org = await Organization.findById(organisationId)
    .populate("admin", "username")
    .populate("members", "username")

    if(!org){
        return res.status(404).json({message: "Organisation not found"})
    }

    const hasAccess = org.admin._id.equals(userId) || org.members.some(m => m._id.equals(userId));
    if(!hasAccess){
        return res.status(403).json({message: "YOU DON'T HAVE ACCESS TO THIS VAGINA"})
    }


    res.json({
        admin: {
            id: org.admin._id,
            username: org.admin.username,
            role: "admin"
        },
        members: org.members
    })
})

app.put("/issues",validate(updateIssueSchema), authMiddleware, async (req, res) => {
    const userId = req.userId;
    const title = req.body.title;
    const issueId = req.body.issueId;


    if(!issueId){
        return res.status(400).json({message: "IssueId is missing"})
    }

    const issue = await Issue.findById(issueId)
    if(!issue){
        return res.status(404).json({message: "Issue not found"})
    }

    const board = await Board.findById(issue.boardId)
    if(!board){
        return res.status(404).json({message: "Board not found"})
    }

    const org = await Organization.findById(board.organizationId)
    if(!org){
        return res.status(404).json({message: "organization not found"})
    }

    const hasAccess = org.admin.equals(userId) || org.members.some(m => m.equals(userId))
    if(!hasAccess){
        return res.status(403).json({message: "you don't have access nigga"})
    }

    const updatedIssue = await Issue.findByIdAndUpdate(issueId,{
        title: title,
        new: true
    })

    res.json({
        message: "issue updated successfully",
        issue: updatedIssue
    })
})

app.delete("/member",authMiddleware, async (req, res) => {
    const userId = req.userId;
    const organisationId = req.body.organisationId;
    const memberUsername = req.body.member;

    const org = await Organization.findById(organisationId)
    if (!org) {
        return res.status(404).json({ message: "Organization not found" });
    }

    const memberUser = await User.findOne({username: memberUsername})
    if (!memberUser) {
        return res.status(404).json({ message: "User not found" });
    }

    if(!org.admin.equals(userId)){
        return res.status(400).json({message: "you do not have access"})
    }

   await Organization.updateOne(
    {_id: organisationId},
    { $pull: { members: memberUser._id}}
   )
    

    res.json({
        message: "member removed successfully"
    })
})

app.listen(3001, () => {
    console.log("Server running on port 3001");
});




// -------------------------------------------------------------------------------------------

/**
 * 📝 THE "WALL OF SHAME" - COMMON BUGS FIXED TODAY:
 * * 1. THE MISSING AWAIT:
 * - WRONG: const org = Organization.findById(id); 
 * - RIGHT: const org = await Organization.findById(id);
 * - FIX: Database calls are asynchronous. Without 'await', you get a Promise, not data.
 * * 2. OBJECT VS STRING (The findById Trap):
 * - WRONG: findById({ organisationId }); -> Passing an object { organisationId: "123" }
 * - RIGHT: findById(organisationId); -> Passing just the string "123"
 * - FIX: findById expects a raw ID string. Wrapping it in {} makes Mongoose crash (CastError).
 * * 3. PARSEINT ON MONGODB IDS:
 * - WRONG: const id = parseInt(req.query.id);
 * - RIGHT: const id = req.query.id;
 * - FIX: MongoDB IDs are Hexadecimal (contain letters). parseInt destroys them. Keep them as strings!
 * * 4. LOGIC FLIPS (Admin Checks):
 * - WRONG: if (org.admin.equals(userId)) { return error } -> This blocks the admin!
 * - RIGHT: if (!org.admin.equals(userId)) { return error } -> This blocks everyone EXCEPT admin.
 * * 5. GET REQUEST BODY:
 * - WRONG: Sending JSON in the 'Body' tab of a GET request in Postman.
 * - RIGHT: Using the 'Params' tab (req.query) for GET requests.
 * - FIX: Many servers ignore the body on GET. Use Query Parameters instead.
 * * 6. ID COMPARISON:
 * - WRONG: if (id1 === id2)
 * - RIGHT: if (id1.equals(id2))
 * - FIX: MongoDB IDs are Objects. '===' compares memory location; '.equals()' compares the actual value.
 * * 7. FIND vs FINDBYID:
 * - WRONG: Issue.findById(boardId); -> Looking for an Issue with a Board's ID.
 * - RIGHT: Issue.find({ boardId: boardId }); -> Searching for all Issues that belong to that Board.
 */