import type { Express } from "express";
import {
  insertAssignmentSchema,
  insertSubmissionSchema,
  insertMessageSchema,
  insertSupportTicketSchema,
  insertTicketReplySchema,
  insertContractSchema,
  insertMilestoneSchema,
  insertKycDocumentSchema,
  insertDisputeSchema,
  insertWalletTransactionSchema,
} from "@shared/schema";
import * as storageExtended from "./storage-extended";
import { requireAuth, requireRole } from "./middleware/auth";
import { asyncHandler, AppError } from "./middleware/errorHandler";

export function registerExtendedRoutes(app: Express) {
  // ===== ASSIGNMENTS ROUTES =====
  
  app.post("/api/assignments", requireRole('tutor', 'admin'), asyncHandler(async (req, res) => {
    const data = insertAssignmentSchema.parse(req.body);
    const assignment = await storageExtended.createAssignment(data);
    res.json(assignment);
  }));

  app.get("/api/assignments/course/:courseId", requireAuth, asyncHandler(async (req, res) => {
    const assignments = await storageExtended.getAssignmentsByCourse(req.params.courseId);
    res.json(assignments);
  }));

  app.get("/api/assignments/:id", requireAuth, asyncHandler(async (req, res) => {
    const assignment = await storageExtended.getAssignment(req.params.id);
    if (!assignment) {
      throw new AppError(404, "Assignment not found");
    }
    res.json(assignment);
  }));

  app.patch("/api/assignments/:id", requireRole('tutor', 'admin'), asyncHandler(async (req, res) => {
    const assignment = await storageExtended.updateAssignment(req.params.id, req.body);
    if (!assignment) {
      throw new AppError(404, "Assignment not found");
    }
    res.json(assignment);
  }));

  // ===== SUBMISSIONS ROUTES =====
  
  app.post("/api/submissions", requireRole('student', 'admin'), asyncHandler(async (req, res) => {
    const data = insertSubmissionSchema.parse(req.body);
    const submission = await storageExtended.createSubmission(data);
    res.json(submission);
  }));

  app.get("/api/submissions/assignment/:assignmentId", requireRole('tutor', 'admin'), asyncHandler(async (req, res) => {
    const submissions = await storageExtended.getSubmissionsByAssignment(req.params.assignmentId);
    res.json(submissions);
  }));

  app.get("/api/submissions/student/:studentId", requireAuth, asyncHandler(async (req, res) => {
    const submissions = await storageExtended.getSubmissionsByStudent(req.params.studentId);
    res.json(submissions);
  }));

  app.patch("/api/submissions/:id/grade", requireRole('tutor', 'admin'), asyncHandler(async (req, res) => {
    const { grade, feedback } = req.body;
    if (grade === undefined || feedback === undefined) {
      throw new AppError(400, "Grade and feedback are required");
    }
    const submission = await storageExtended.gradeSubmission(req.params.id, grade, feedback);
    if (!submission) {
      throw new AppError(404, "Submission not found");
    }
    res.json(submission);
  }));

  // ===== MESSAGES ROUTES =====
  
  app.post("/api/messages", requireAuth, asyncHandler(async (req, res) => {
    const data = insertMessageSchema.parse(req.body);
    const message = await storageExtended.createMessage(data);
    res.json(message);
  }));

  app.get("/api/messages/conversation/:userId1/:userId2", requireAuth, asyncHandler(async (req, res) => {
    const messages = await storageExtended.getConversation(req.params.userId1, req.params.userId2);
    res.json(messages);
  }));

  app.get("/api/messages/user/:userId", requireAuth, asyncHandler(async (req, res) => {
    const conversations = await storageExtended.getUserConversations(req.params.userId);
    res.json(conversations);
  }));

  app.patch("/api/messages/:id/read", requireAuth, asyncHandler(async (req, res) => {
    await storageExtended.markMessageAsRead(req.params.id);
    res.json({ success: true });
  }));

  app.get("/api/messages/unread/:userId", requireAuth, asyncHandler(async (req, res) => {
    const count = await storageExtended.getUnreadMessageCount(req.params.userId);
    res.json({ count });
  }));

  // ===== SUPPORT TICKETS ROUTES =====
  
  app.post("/api/support-tickets", requireAuth, asyncHandler(async (req, res) => {
    const data = insertSupportTicketSchema.parse(req.body);
    const ticket = await storageExtended.createSupportTicket(data);
    res.json(ticket);
  }));

  app.get("/api/support-tickets/user/:userId", requireAuth, asyncHandler(async (req, res) => {
    const tickets = await storageExtended.getSupportTicketsByUser(req.params.userId);
    res.json(tickets);
  }));

  app.get("/api/support-tickets", requireRole('admin'), asyncHandler(async (req, res) => {
    const tickets = await storageExtended.getAllSupportTickets();
    res.json(tickets);
  }));

  app.get("/api/support-tickets/:id", requireAuth, asyncHandler(async (req, res) => {
    const ticket = await storageExtended.getSupportTicket(req.params.id);
    if (!ticket) {
      throw new AppError(404, "Ticket not found");
    }
    res.json(ticket);
  }));

  app.patch("/api/support-tickets/:id", requireAuth, asyncHandler(async (req, res) => {
    const ticket = await storageExtended.updateSupportTicket(req.params.id, req.body);
    if (!ticket) {
      throw new AppError(404, "Ticket not found");
    }
    res.json(ticket);
  }));

  app.post("/api/support-tickets/:ticketId/replies", requireAuth, asyncHandler(async (req, res) => {
    const data = insertTicketReplySchema.parse({
      ...req.body,
      ticketId: req.params.ticketId,
    });
    const reply = await storageExtended.createTicketReply(data);
    res.json(reply);
  }));

  app.get("/api/support-tickets/:ticketId/replies", requireAuth, asyncHandler(async (req, res) => {
    const replies = await storageExtended.getTicketReplies(req.params.ticketId);
    res.json(replies);
  }));

  // ===== CONTRACTS & MILESTONES ROUTES =====
  
  app.post("/api/contracts", requireRole('recruiter', 'admin'), asyncHandler(async (req, res) => {
    const data = insertContractSchema.parse(req.body);
    const contract = await storageExtended.createContract(data);
    res.json(contract);
  }));

  app.get("/api/contracts/freelancer/:freelancerId", requireAuth, asyncHandler(async (req, res) => {
    const contracts = await storageExtended.getContractsByFreelancer(req.params.freelancerId);
    res.json(contracts);
  }));

  app.get("/api/contracts/recruiter/:recruiterId", requireAuth, asyncHandler(async (req, res) => {
    const contracts = await storageExtended.getContractsByRecruiter(req.params.recruiterId);
    res.json(contracts);
  }));

  app.get("/api/contracts/:id", requireAuth, asyncHandler(async (req, res) => {
    const contract = await storageExtended.getContract(req.params.id);
    if (!contract) {
      throw new AppError(404, "Contract not found");
    }
    res.json(contract);
  }));

  app.patch("/api/contracts/:id", requireRole('recruiter', 'freelancer', 'admin'), asyncHandler(async (req, res) => {
    const contract = await storageExtended.updateContract(req.params.id, req.body);
    if (!contract) {
      throw new AppError(404, "Contract not found");
    }
    res.json(contract);
  }));

  app.post("/api/milestones", requireRole('recruiter', 'admin'), asyncHandler(async (req, res) => {
    const data = insertMilestoneSchema.parse(req.body);
    const milestone = await storageExtended.createMilestone(data);
    res.json(milestone);
  }));

  app.get("/api/milestones/contract/:contractId", requireAuth, asyncHandler(async (req, res) => {
    const milestones = await storageExtended.getMilestonesByContract(req.params.contractId);
    res.json(milestones);
  }));

  app.patch("/api/milestones/:id", requireRole('recruiter', 'freelancer', 'admin'), asyncHandler(async (req, res) => {
    const milestone = await storageExtended.updateMilestone(req.params.id, req.body);
    if (!milestone) {
      throw new AppError(404, "Milestone not found");
    }
    res.json(milestone);
  }));

  // ===== KYC DOCUMENTS ROUTES =====
  
  app.post("/api/kyc-documents", requireAuth, asyncHandler(async (req, res) => {
    const data = insertKycDocumentSchema.parse(req.body);
    const document = await storageExtended.createKycDocument(data);
    res.json(document);
  }));

  app.get("/api/kyc-documents/user/:userId", requireAuth, asyncHandler(async (req, res) => {
    const documents = await storageExtended.getKycDocumentsByUser(req.params.userId);
    res.json(documents);
  }));

  app.get("/api/kyc-documents/pending", requireRole('admin'), asyncHandler(async (req, res) => {
    const documents = await storageExtended.getPendingKycDocuments();
    res.json(documents);
  }));

  app.patch("/api/kyc-documents/:id", requireRole('admin'), asyncHandler(async (req, res) => {
    const document = await storageExtended.updateKycDocument(req.params.id, req.body);
    if (!document) {
      throw new AppError(404, "KYC document not found");
    }
    res.json(document);
  }));

  // ===== DISPUTES ROUTES =====
  
  app.post("/api/disputes", requireAuth, asyncHandler(async (req, res) => {
    const data = insertDisputeSchema.parse(req.body);
    const dispute = await storageExtended.createDispute(data);
    res.json(dispute);
  }));

  app.get("/api/disputes/user/:userId", requireAuth, asyncHandler(async (req, res) => {
    const disputes = await storageExtended.getDisputesByUser(req.params.userId);
    res.json(disputes);
  }));

  app.get("/api/disputes", requireRole('admin'), asyncHandler(async (req, res) => {
    const disputes = await storageExtended.getAllDisputes();
    res.json(disputes);
  }));

  app.get("/api/disputes/:id", requireAuth, asyncHandler(async (req, res) => {
    const dispute = await storageExtended.getDispute(req.params.id);
    if (!dispute) {
      throw new AppError(404, "Dispute not found");
    }
    res.json(dispute);
  }));

  app.patch("/api/disputes/:id", requireRole('admin'), asyncHandler(async (req, res) => {
    const dispute = await storageExtended.updateDispute(req.params.id, req.body);
    if (!dispute) {
      throw new AppError(404, "Dispute not found");
    }
    res.json(dispute);
  }));

  // ===== WALLETS ROUTES =====
  
  app.get("/api/wallets/user/:userId", requireAuth, asyncHandler(async (req, res) => {
    let wallet = await storageExtended.getWalletByUser(req.params.userId);
    if (!wallet) {
      wallet = await storageExtended.createWallet({ userId: req.params.userId });
    }
    res.json(wallet);
  }));

  app.get("/api/wallets/:walletId/transactions", requireAuth, asyncHandler(async (req, res) => {
    const transactions = await storageExtended.getWalletTransactions(req.params.walletId);
    res.json(transactions);
  }));

  app.post("/api/wallets/:walletId/transactions", requireAuth, asyncHandler(async (req, res) => {
    const data = insertWalletTransactionSchema.parse({
      ...req.body,
      walletId: req.params.walletId,
    });
    
    const transaction = await storageExtended.createWalletTransaction(data);
    await storageExtended.processWalletTransaction(req.params.walletId, data);
    
    res.json(transaction);
  }));
}
