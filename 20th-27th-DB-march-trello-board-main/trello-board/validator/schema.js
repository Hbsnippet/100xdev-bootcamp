// validators/schemas.js

const { z } = require('zod');

// ========================
// AUTH SCHEMAS
// ========================
const signupSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(6).regex(/\d/)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

// ========================
// ORGANIZATION SCHEMAS
// ========================
const createOrgSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(500).optional()
});

const addMemberSchema = z.object({
  organisationId: z.string().min(1),
  memberUsername: z.string().min(1)
});

// ========================
// BOARD SCHEMAS
// ========================
const createBoardSchema = z.object({
  organisationId: z.string().min(1),
  title: z.string().min(1).max(100)
});

// ========================
// ISSUE SCHEMAS
// ========================
const createIssueSchema = z.object({
  boardId: z.string().min(1),
  title: z.string().min(1).max(200)
});

const updateIssueSchema = z.object({
  issueId: z.string().min(1),
  title: z.string().min(1).max(200)
});

// ========================
// EXPORT ALL SCHEMAS
// ========================
module.exports = {
  signupSchema,
  loginSchema,
  createOrgSchema,
  addMemberSchema,
  createBoardSchema,
  createIssueSchema,
  updateIssueSchema
};