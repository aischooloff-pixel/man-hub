import { useState } from 'react';
import { X, Crown, Zap, Share2, Bot, BookOpen, Infinity, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PremiumModal({ isOpen, onClose }: PremiumModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');

  if (!isOpen) return null;

  const features = [
    { icon: Crown, text: 'Продажа своего продукта', desc: 'Зарабатывай деньги прямо через профиль' },
    { icon: Share2, text: 'Соц сети в профиле', desc: 'Развивайся как автор и привлекай аудиторию' },
    { icon: Bot, text: 'ИИ ассистент', desc: 'Ответ на любой вопрос по темам хаба' },
    { icon: BookOpen, text: 'Премиум материалы', desc: 'Чек-листы, гайды и лимитированная информация' },
    { icon: Infinity, text: 'Безлимит публикаций', desc: 'Публикуй сколько хочешь в день' },
    { icon: BadgeCheck, text: 'PRO значок', desc: 'Выделяйся среди других авторов' },
  ];

  const plans = {
    monthly: { price: 299, period: 'месяц' },
    yearly: { price: 2390, period: 'год', savings: '33%' },
  };

  const handlePayment = () => {
    // TODO: Integrate Telegram Payments
    console.log('Processing payment for', selectedPlan, 'plan');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={cn(
          'absolute inset-x-0 bottom-0 max-h-[90vh] overflow-y-auto rounded-t-2xl bg-card animate-slide-up',
          'md:inset-auto md:left-1/2 md:top-1/2 md:w-full md:max-w-md md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-lg'
        )}
      >
        {/* Handle bar for mobile */}
        <div className="sticky top-0 z-10 flex justify-center bg-card pt-3 md:hidden">
          <div className="h-1 w-12 rounded-full bg-border" />
        </div>

        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 h-8 w-8"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="p-6">
          {/* Header */}
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-foreground/20 to-foreground/5">
              <Crown className="h-8 w-8" />
            </div>
            <h2 className="mb-2 font-heading text-2xl font-bold">Premium</h2>
            <p className="text-muted-foreground">
              Получите доступ ко всем возможностям платформы
            </p>
          </div>

          {/* Features */}
          <div className="mb-6 space-y-2">
            {features.map((feature) => (
              <div
                key={feature.text}
                className="flex items-start gap-3 rounded-lg bg-secondary/50 p-3"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground/10">
                  <feature.icon className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{feature.text}</span>
                  <span className="text-xs text-muted-foreground">{feature.desc}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Plan selection */}
          <div className="mb-6 space-y-3">
            <button
              onClick={() => setSelectedPlan('monthly')}
              className={cn(
                'flex w-full items-center justify-between rounded-lg border-2 p-4 transition-colors',
                selectedPlan === 'monthly'
                  ? 'border-foreground bg-foreground/5'
                  : 'border-border hover:border-foreground/50'
              )}
            >
              <div className="text-left">
                <p className="font-medium">Ежемесячно</p>
                <p className="text-sm text-muted-foreground">Оплата каждый месяц</p>
              </div>
              <div className="text-right">
                <p className="font-heading text-xl font-bold">{plans.monthly.price}₽</p>
                <p className="text-xs text-muted-foreground">/{plans.monthly.period}</p>
              </div>
            </button>

            <button
              onClick={() => setSelectedPlan('yearly')}
              className={cn(
                'relative flex w-full items-center justify-between rounded-lg border-2 p-4 transition-colors',
                selectedPlan === 'yearly'
                  ? 'border-foreground bg-foreground/5'
                  : 'border-border hover:border-foreground/50'
              )}
            >
              {plans.yearly.savings && (
                <span className="absolute -top-2 right-4 rounded-full bg-foreground px-2 py-0.5 text-xs font-medium text-background">
                  -{plans.yearly.savings}
                </span>
              )}
              <div className="text-left">
                <p className="font-medium">Ежегодно</p>
                <p className="text-sm text-muted-foreground">Экономия {plans.yearly.savings}</p>
              </div>
              <div className="text-right">
                <p className="font-heading text-xl font-bold">{plans.yearly.price}₽</p>
                <p className="text-xs text-muted-foreground">/{plans.yearly.period}</p>
              </div>
            </button>
          </div>

          {/* Payment button */}
          <Button onClick={handlePayment} className="w-full gap-2" size="lg">
            <Crown className="h-4 w-4" />
            Оплатить {selectedPlan === 'monthly' ? plans.monthly.price : plans.yearly.price}₽
          </Button>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Оплата производится через Telegram Payments. Подписку можно отменить в любое время.
          </p>
        </div>
      </div>
    </div>
  );
}
