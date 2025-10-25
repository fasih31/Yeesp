import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Calendar, Download } from "lucide-react";
import type { Payment, WalletTransaction, Wallet } from "@shared/schema";

export default function FreelancerEarnings() {
  const { data: wallet } = useQuery<Wallet>({
    queryKey: ["/api/wallets/my"],
    queryFn: async () => {
      const response = await fetch("/api/wallets/my", { credentials: "include" });
      if (!response.ok) throw new Error("Failed to fetch wallet");
      return response.json();
    },
  });

  const { data: transactions, isLoading } = useQuery<WalletTransaction[]>({
    queryKey: ["/api/wallet-transactions"],
    queryFn: async () => {
      const response = await fetch("/api/wallet-transactions", { credentials: "include" });
      if (!response.ok) return [];
      return response.json();
    },
  });

  const { data: payments } = useQuery<Payment[]>({
    queryKey: ["/api/payments/my"],
  });

  const totalEarned = payments?.reduce((sum, p) => sum + parseFloat(String(p.amount)), 0) || 0;
  const thisMonth = payments?.filter(p => {
    const paymentDate = new Date(p.createdAt);
    const now = new Date();
    return paymentDate.getMonth() === now.getMonth() && paymentDate.getFullYear() === now.getFullYear();
  }).reduce((sum, p) => sum + parseFloat(String(p.amount)), 0) || 0;

  const completedProjects = payments?.filter(p => p.status === "completed").length || 0;

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Earnings & Wallet</h1>
        <p className="text-muted-foreground">Track your freelance income</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${totalEarned.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${thisMonth.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Current month earnings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${wallet?.balance || 0}</div>
            <p className="text-xs text-muted-foreground">Ready to withdraw</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projects</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{completedProjects}</div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Transaction History</CardTitle>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <div className="text-center py-12">Loading transactions...</div>
          ) : transactions && transactions.length > 0 ? (
            transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-semibold">{transaction.description || "Payment"}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${transaction.type === "credit" ? "text-green-600" : "text-red-600"}`}>
                    {transaction.type === "credit" ? "+" : "-"}${transaction.amount}
                  </p>
                  <Badge variant={transaction.type === "credit" ? "default" : "secondary"}>
                    {transaction.type}
                  </Badge>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No transactions yet</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
