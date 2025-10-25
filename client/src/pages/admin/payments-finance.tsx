import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, TrendingUp, Users, CreditCard, Download } from "lucide-react";

export default function PaymentsFinance() {
  const stats = [
    { title: "Total Revenue", value: "$124,530", change: "+12.5%", icon: DollarSign },
    { title: "Platform Fees", value: "$8,717", change: "+8.2%", icon: TrendingUp },
    { title: "Pending Payouts", value: "$15,240", change: "-5.1%", icon: CreditCard },
    { title: "Active Transactions", value: "1,234", change: "+18.2%", icon: Users },
  ];

  const pendingPayouts = [
    { id: 1, user: "Dr. Sarah Johnson", type: "Tutor", amount: "$2,450", date: "2024-01-10" },
    { id: 2, user: "Mike Chen", type: "Freelancer", amount: "$1,890", date: "2024-01-10" },
  ];

  const recentTransactions = [
    { id: 1, user: "John Doe", type: "Course Enrollment", amount: "$49.99", status: "completed", date: "2024-01-12" },
    { id: 2, user: "Jane Smith", type: "Tutoring Session", amount: "$75.00", status: "completed", date: "2024-01-12" },
    { id: 3, user: "Alex Brown", type: "Project Payment", amount: "$500.00", status: "pending", date: "2024-01-11" },
  ];

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Payments & Finance</h1>
          <p className="text-muted-foreground">Manage platform payments and payouts</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className={stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                    {stat.change}
                  </span>
                  {' '}from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="payouts" className="space-y-6">
        <TabsList>
          <TabsTrigger value="payouts">Pending Payouts</TabsTrigger>
          <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
          <TabsTrigger value="refunds">Refunds & Disputes</TabsTrigger>
        </TabsList>

        <TabsContent value="payouts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payouts Queue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingPayouts.map((payout) => (
                  <div key={payout.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{payout.user}</h3>
                      <p className="text-sm text-muted-foreground">{payout.type} • {payout.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-bold">{payout.amount}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm">Approve</Button>
                        <Button size="sm" variant="outline">Review</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{transaction.user}</h3>
                      <p className="text-sm text-muted-foreground">{transaction.type} • {transaction.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-bold">{transaction.amount}</p>
                      <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="refunds">
          <Card>
            <CardHeader>
              <CardTitle>Refunds & Disputes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                No active refund requests or disputes
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
