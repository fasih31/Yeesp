import { db } from "./db";
import {
  assignments,
  submissions,
  messages,
  supportTickets,
  ticketReplies,
  contracts,
  milestones,
  kycDocuments,
  disputes,
  wallets,
  walletTransactions,
  type InsertAssignment,
  type InsertSubmission,
  type InsertMessage,
  type InsertSupportTicket,
  type InsertTicketReply,
  type InsertContract,
  type InsertMilestone,
  type InsertKycDocument,
  type InsertDispute,
  type InsertWallet,
  type InsertWalletTransaction,
} from "@shared/schema";
import { eq, and, or, desc } from "drizzle-orm";

// ===== ASSIGNMENTS =====
export async function createAssignment(data: InsertAssignment) {
  const [assignment] = await db.insert(assignments).values(data).returning();
  return assignment;
}

export async function getAssignmentsByCourse(courseId: string) {
  return await db.select().from(assignments).where(eq(assignments.courseId, courseId));
}

export async function getAssignment(id: string) {
  const [assignment] = await db.select().from(assignments).where(eq(assignments.id, id));
  return assignment;
}

export async function updateAssignment(id: string, data: Partial<InsertAssignment>) {
  const result = await db.update(assignments).set(data).where(eq(assignments.id, id)).returning();
  if (result.length === 0) {
    return null;
  }
  return result[0];
}

// ===== SUBMISSIONS =====
export async function createSubmission(data: InsertSubmission) {
  const [submission] = await db.insert(submissions).values(data).returning();
  return submission;
}

export async function getSubmissionsByAssignment(assignmentId: string) {
  return await db.select().from(submissions).where(eq(submissions.assignmentId, assignmentId));
}

export async function getSubmissionsByStudent(studentId: string) {
  return await db.select().from(submissions).where(eq(submissions.studentId, studentId));
}

export async function getSubmission(id: string) {
  const [submission] = await db.select().from(submissions).where(eq(submissions.id, id));
  return submission;
}

export async function gradeSubmission(id: string, grade: number, feedback: string) {
  const result = await db.update(submissions)
    .set({ grade, feedback, status: 'graded', gradedAt: new Date() })
    .where(eq(submissions.id, id))
    .returning();
  if (result.length === 0) {
    return null;
  }
  return result[0];
}

// ===== MESSAGES =====
export async function createMessage(data: InsertMessage) {
  const [message] = await db.insert(messages).values(data).returning();
  return message;
}

export async function getConversation(userId1: string, userId2: string) {
  return await db.select().from(messages)
    .where(
      or(
        and(eq(messages.senderId, userId1), eq(messages.receiverId, userId2)),
        and(eq(messages.senderId, userId2), eq(messages.receiverId, userId1))
      )
    )
    .orderBy(messages.createdAt);
}

export async function getUserConversations(userId: string) {
  return await db.select().from(messages)
    .where(or(eq(messages.senderId, userId), eq(messages.receiverId, userId)))
    .orderBy(desc(messages.createdAt));
}

export async function markMessageAsRead(id: string) {
  await db.update(messages).set({ read: true }).where(eq(messages.id, id));
}

export async function getUnreadMessageCount(userId: string) {
  const unread = await db.select().from(messages)
    .where(and(eq(messages.receiverId, userId), eq(messages.read, false)));
  return unread.length;
}

// ===== SUPPORT TICKETS =====
export async function createSupportTicket(data: InsertSupportTicket) {
  const [ticket] = await db.insert(supportTickets).values(data).returning();
  return ticket;
}

export async function getSupportTicketsByUser(userId: string) {
  return await db.select().from(supportTickets)
    .where(eq(supportTickets.userId, userId))
    .orderBy(desc(supportTickets.createdAt));
}

export async function getAllSupportTickets() {
  return await db.select().from(supportTickets).orderBy(desc(supportTickets.createdAt));
}

export async function getSupportTicket(id: string) {
  const [ticket] = await db.select().from(supportTickets).where(eq(supportTickets.id, id));
  return ticket;
}

export async function updateSupportTicket(id: string, data: Partial<InsertSupportTicket>) {
  const result = await db.update(supportTickets)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(supportTickets.id, id))
    .returning();
  if (result.length === 0) {
    return null;
  }
  return result[0];
}

export async function createTicketReply(data: InsertTicketReply) {
  const [reply] = await db.insert(ticketReplies).values(data).returning();
  await db.update(supportTickets)
    .set({ updatedAt: new Date() })
    .where(eq(supportTickets.id, data.ticketId));
  return reply;
}

export async function getTicketReplies(ticketId: string) {
  return await db.select().from(ticketReplies)
    .where(eq(ticketReplies.ticketId, ticketId))
    .orderBy(ticketReplies.createdAt);
}

// ===== CONTRACTS & MILESTONES =====
export async function createContract(data: InsertContract) {
  const [contract] = await db.insert(contracts).values(data).returning();
  return contract;
}

export async function getContractsByFreelancer(freelancerId: string) {
  return await db.select().from(contracts).where(eq(contracts.freelancerId, freelancerId));
}

export async function getContractsByRecruiter(recruiterId: string) {
  return await db.select().from(contracts).where(eq(contracts.recruiterId, recruiterId));
}

export async function getContract(id: string) {
  const [contract] = await db.select().from(contracts).where(eq(contracts.id, id));
  return contract;
}

export async function updateContract(id: string, data: Partial<InsertContract>) {
  const result = await db.update(contracts).set(data).where(eq(contracts.id, id)).returning();
  if (result.length === 0) {
    return null;
  }
  return result[0];
}

export async function createMilestone(data: InsertMilestone) {
  const [milestone] = await db.insert(milestones).values(data).returning();
  return milestone;
}

export async function getMilestonesByContract(contractId: string) {
  return await db.select().from(milestones).where(eq(milestones.contractId, contractId));
}

export async function updateMilestone(id: string, data: Partial<InsertMilestone>) {
  const result = await db.update(milestones).set(data).where(eq(milestones.id, id)).returning();
  if (result.length === 0) {
    return null;
  }
  return result[0];
}

// ===== KYC DOCUMENTS =====
export async function createKycDocument(data: InsertKycDocument) {
  const [document] = await db.insert(kycDocuments).values(data).returning();
  return document;
}

export async function getKycDocumentsByUser(userId: string) {
  return await db.select().from(kycDocuments).where(eq(kycDocuments.userId, userId));
}

export async function getPendingKycDocuments() {
  return await db.select().from(kycDocuments).where(eq(kycDocuments.status, 'pending'));
}

export async function updateKycDocument(id: string, data: Partial<InsertKycDocument>) {
  const result = await db.update(kycDocuments).set(data).where(eq(kycDocuments.id, id)).returning();
  if (result.length === 0) {
    return null;
  }
  return result[0];
}

// ===== DISPUTES =====
export async function createDispute(data: InsertDispute) {
  const [dispute] = await db.insert(disputes).values(data).returning();
  return dispute;
}

export async function getDisputesByUser(userId: string) {
  return await db.select().from(disputes).where(eq(disputes.raisedBy, userId));
}

export async function getAllDisputes() {
  return await db.select().from(disputes).orderBy(desc(disputes.createdAt));
}

export async function getDispute(id: string) {
  const [dispute] = await db.select().from(disputes).where(eq(disputes.id, id));
  return dispute;
}

export async function updateDispute(id: string, data: Partial<InsertDispute>) {
  const result = await db.update(disputes).set(data).where(eq(disputes.id, id)).returning();
  if (result.length === 0) {
    return null;
  }
  return result[0];
}

// ===== WALLETS =====
export async function createWallet(data: InsertWallet) {
  const [wallet] = await db.insert(wallets).values(data).returning();
  return wallet;
}

export async function getWalletByUser(userId: string) {
  const [wallet] = await db.select().from(wallets).where(eq(wallets.userId, userId));
  return wallet;
}

export async function createWalletTransaction(data: InsertWalletTransaction) {
  const [transaction] = await db.insert(walletTransactions).values(data).returning();
  return transaction;
}

export async function getWalletTransactions(walletId: string) {
  return await db.select().from(walletTransactions)
    .where(eq(walletTransactions.walletId, walletId))
    .orderBy(desc(walletTransactions.createdAt));
}

export async function processWalletTransaction(walletId: string, data: InsertWalletTransaction) {
  const [wallet] = await db.select().from(wallets).where(eq(wallets.id, walletId));
  if (!wallet) {
    throw new Error('Wallet not found');
  }

  const amount = parseFloat(data.amount);
  let newBalance = parseFloat(wallet.balance);
  let newEscrow = parseFloat(wallet.escrowBalance);

  if (data.type === 'deposit' || data.type === 'earning') {
    newBalance += amount;
  } else if (data.type === 'withdrawal' || data.type === 'payout') {
    if (newBalance < amount) {
      throw new Error('Insufficient balance');
    }
    newBalance -= amount;
  } else if (data.type === 'escrow_hold') {
    if (newBalance < amount) {
      throw new Error('Insufficient balance for escrow hold');
    }
    newBalance -= amount;
    newEscrow += amount;
  } else if (data.type === 'escrow_release') {
    if (newEscrow < amount) {
      throw new Error('Insufficient escrow balance');
    }
    newEscrow -= amount;
  }

  await db.update(wallets)
    .set({
      balance: newBalance.toString(),
      escrowBalance: newEscrow.toString(),
      updatedAt: new Date(),
    })
    .where(eq(wallets.id, walletId));
}
