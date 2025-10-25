
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Zap, Star } from 'lucide-react';

export default function Subscription() {
  const plans = [
    {
      name: 'Free',
      price: 0,
      icon: Star,
      features: [
        'Access to free courses',
        'Basic community support',
        'Course certificates',
        'Limited AI assistance',
      ],
      limits: [
        'Max 3 courses at once',
        'Standard video quality',
      ],
    },
    {
      name: 'Premium',
      price: 9.99,
      icon: Zap,
      popular: true,
      features: [
        'Everything in Free',
        'Access to all premium courses',
        'Priority support',
        'Unlimited AI study assistant',
        'Download course materials',
        'Ad-free experience',
        '1-on-1 monthly tutoring session',
      ],
      limits: [],
    },
    {
      name: 'Enterprise',
      price: 29.99,
      icon: Crown,
      features: [
        'Everything in Premium',
        'Unlimited tutoring sessions',
        'Career coaching',
        'Job placement assistance',
        'Custom learning paths',
        'Team collaboration tools',
        'Advanced analytics',
        'Early access to new features',
      ],
      limits: [],
    },
  ];

  return (
    <div className="container py-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-xl text-muted-foreground">
          Unlock your full learning potential
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => {
          const Icon = plan.icon;
          return (
            <Card
              key={plan.name}
              className={`relative ${
                plan.popular ? 'border-primary shadow-lg scale-105' : ''
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Most Popular
                </Badge>
              )}
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>
                  <span className="text-3xl font-bold text-foreground">
                    ${plan.price}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-muted-foreground">/month</span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                {plan.limits.length > 0 && (
                  <div className="pt-4 border-t">
                    <p className="text-xs text-muted-foreground">Limitations:</p>
                    <ul className="space-y-1 mt-2">
                      {plan.limits.map((limit, index) => (
                        <li key={index} className="text-xs text-muted-foreground">
                          • {limit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.price === 0 ? 'Current Plan' : 'Upgrade Now'}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
