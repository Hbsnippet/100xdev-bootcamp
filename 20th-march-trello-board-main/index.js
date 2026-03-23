const express = require("express");
const jwt = require('jsonwebtoken');
const JWT_SECRET = "shhhhhh";
const app = express();
const authMiddleware = require("./middleware");

app.use(express.json());


const USERS = [{
    id: 1,
    username: "harkirat", 
    password: "123123"
}, {
    id: 2,
    username: "raman",
    password: "123123"
}];

const ORGANIZATIONS = [{
    id: 1,
    title: "100xdevs",
    description: "Learning coding platform",
    admin: 1,
    members: [2]
}, {
    id: 2,
    title: "ramans org",
    description: "Experimenting",
    admin: 1,
    members: []
}];

const BOARDS = [{
    id: 1,
    title: "100xschool website (frontend",
    organizationId: 1
}];

const ISSUES = [{
    id: 1,
    title: "Add dark mode",
    boardId: 1
}, {
    id: 2,
    title: "Allow admins to create more courses",
    boardId: 1
}];

let USER_ID = 3;

app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userExist = USERS.find(t => t.username === username);

    if (userExist) {
        return res.status(401).json({ message: "user with this username already exists" });
    }

    const newUser = {
        id: USER_ID++,
        username: username,
        password: password
    };

    USERS.push(newUser);

    res.status(201).json({ 
        message: "user created successfully",
        userId: newUser.id 
    });
});

app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userExist = USERS.find(t => t.username === username && t.password === password);

    if (!userExist) {
        return res.status(404).json({ message: "invalid password or username" });
    }

    const token = jwt.sign({
        userId: userExist.id
    }, JWT_SECRET);

    res.json({ token });
});


let organisation_Id = 3;

app.post("/organisation", authMiddleware, (req,res) => {
    console.log("=== ORGANISATION ROUTE HIT ===");  
    console.log("userId:", req.userId); 
    const userId = req.userId;

    const title = req.body.title;
    const description = req.body.description;

    const newOrg = {
        id: organisation_Id++,
        title: title,
        description: description,
        admin: userId,
        members: []
    }

    ORGANIZATIONS.push(newOrg)

    res.json({
        message: "organisation created successfully",
        organizationId : newOrg.id
    })
})

app.post("/add-member-to-organisation",authMiddleware, (req,res) => {
    const userId = req.userId;
    const organisationId = req.body.organisationId;
    const memberUsername = req.body.memberUsername;

    const org = ORGANIZATIONS.find(t => t.id === organisationId);

    if(!org){
        return res.status(404).json({message: "organisation not found"})
    };

    if(org.admin !== userId){
        return res.status(404).json({message : "only admin can add member"})
    };

    const memberUser = USERS.find(m => m.username === memberUsername)
    if(!memberUser){
        return res.status(404).json({message: "user not found"})
    }

    if(org.members.includes(memberUser.id)){
        return res.status(400).json({message: "User already a member"})
    }

    org.members.push(memberUser.id);

    res.json({
        message: "Member Added successfully"
    });
});

let board_Id = 2

app.post("/board",authMiddleware, (req,res) => {
    const userId = req.userId;
    const organisationId = req.body.organisationId;
    const title = req.body.title;

    const org = ORGANIZATIONS.find(t => t.id === organisationId);

    if(!org){
        return res.status(404).json({message: "Organiszation not found"});
    }

    const isAdminOrMember = org.admin === userId || org.members.includes(userId)

    if(!isAdminOrMember){
        return res.status(403).json({message: "You do not have permission to create board in this org"})
    }

    const newBoard = {
        id: board_Id++,
        title: title,
        organisationId: organisationId
    }

    BOARDS.push(newBoard)

    res.json({
        message: "Board created successfully",
        boardId: newBoard.id
    })
})

let issue_Id = 3

app.post("/issue",authMiddleware, (req,res) => {
    const userId = req.userId;
    const boardId = req.body.boardId;
    const title = req.body.title;

    const board = BOARDS.find(t => t.id === boardId)

    if(!board){
        return res.status(404).json({ message: "Board not found" });
    }

    const org = ORGANIZATIONS.find(t => t.id === board.organizationId);

    if(!org){
        return res.status(404).json({message: "Organization not found"})
    }

    const hasAccess = org.admin === userId || org.members.includes(userId);

    if(!hasAccess){
        return res.status(403).json({ message: "You don't have access to this board" });
    }

    const newIssue = {
        id: issue_Id++,
        title: title,
        boardId: board.id
    };

    ISSUES.push(newIssue);

    res.json({
        message: "Issue created successfully",
        issueId: newIssue.id
    })
})


app.get("/boards",authMiddleware, (req, res) => {
    const userId = req.userId
    const organizationId = parseInt(req.query.organisationId);

    if(!organizationId){
        return res.status(400).json({message: "OrganizationId required"})
    }

    const org = ORGANIZATIONS.find(t => t.id === organizationId);

    if(!org){
        return res.status(404).json({message: "Organization not find"})
    }

    const hasAccess = org.admin === userId || org.members.includes(userId);

    if(!hasAccess){
        return res.status(403).json({message: "ypu don't have access nigga"})
    }

    const boards = BOARDS.filter(t => t.organizationId === organizationId)

    res.json({
        boards: boards
    })
})

app.get("/issues", authMiddleware, (req, res) => {
    const userId = req.userId;
    const boardId = parseInt(req.query.boardId);

    if (!boardId) {
        return res.status(400).json({ message: "boardId required" });
    }

    const board = BOARDS.find(b => b.id === boardId)

    if (!board) {
        return res.status(404).json({ message: "Board not found" });
    }

    const org = ORGANIZATIONS.find(t => t.id === board.organizationId)

    if (!org) {
        return res.status(404).json({ message: "Organization not found" });
    }

    const hasAccess = org.admin === userId || org.members.includes(userId);
    
    if(!hasAccess){
        return res.status(403).json({
            message: "you have no access gigantic vagina"
        })
    }

    const isssue = ISSUES.filter(i => i.boardId === boardId)

    res.json({
        isssue
    })
})



app.get("/members", authMiddleware, (req, res) => {
    const userId = req.userId;
    const organisationId = parseInt(req.query.organisationId)

    if(!organisationId){
        return res.status(400).json({message: "organizationId missing"})
    }

    const org = ORGANIZATIONS.find(o => o.id === organisationId)

    if(!org){
        return res.status(404).json({message: "Organisation not found"})
    }

    const hasAccess = org.admin === userId || org.members.includes(userId)
    if(!hasAccess){
        return res.status(403).json({message: "YOU DON'T HAVE ACCESS TO THIS VAGINA"})
    }

    const adminUser = USERS.find(u => u.id === org.admin)

    const members = org.members.map(memberId => {
        const user = USERS.find(u => u.id === memberId)
        return {
            id: user.id,
            username: user.username,
            role: "member"
        }
    });

    res.json({
        admin: {
            id: adminUser.id,
            username: adminUser.username,
            role: "admin"
        },
        members: members
    })
})

app.put("/issues", authMiddleware, (req, res) => {
    const userId = req.userId;
    const title = req.body.title;
    const issueId = req.body.issueId;


    if(!issueId){
        return res.status(400).json({message: "IssueId is missing"})
    }

    const issue = ISSUES.find(u => u.id ===  issueId)
    if(!issue){
        return res.status(404).json({message: "Issue not found"})
    }

    const board = BOARDS.find(b => b.id === issue.boardId)
    if(!board){
        return res.status(404).json({message: "Board not found"})
    }

    const org = ORGANIZATIONS.find(o => o.id === board.organizationId)
    if(!org){
        return res.status(404).json({message: "organization not found"})
    }

    const hasAccess = org.admin === userId || org.members.includes(userId)
    if(!hasAccess){
        return res.status(403).json({message: "you don't have access nigga"})
    }

    issue.title = title;

    res.json({
        message: "issue updated successfully",
        issue: issue
    })
})

app.delete("/member",authMiddleware, (req, res) => {
    const userId = req.userId;
    const organisationId = req.body.organisationId;
    const memberUsername = req.body.member;

    const org = ORGANIZATIONS.find(o => o.id === organisationId)
    if (!org) {
        return res.status(404).json({ message: "Organization not found" });
    }

    const memberUser = USERS.find(u => u.username === memberUsername)
    if (!memberUser) {
        return res.status(404).json({ message: "User not found" });
    }

    if(org.admin !== userId){
        return res.status(400).json({message: "you do not have access"})
    }

    if (!org.members.includes(memberUser.id)) {
        return res.status(400).json({ 
            message: "User is not a member of this organization" 
        });
    }
    org.members = org.members.filter(memberId => memberId !== memberUser.id)

    res.json({
        message: "member removed successfully"
    })
})

app.listen(3001, () => {
    console.log("Server running on port 3001");
});