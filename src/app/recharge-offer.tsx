'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Check,
  Copy,
  Gift,
  Loader2,
  Share2,
  PartyPopper,
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
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { PlaceHolderImages } from '@/lib/placeholder-images';
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

const REFERRAL_GOAL = 3;

export default function RechargeOffer() {
  const [referrals, setReferrals] = useState(0);
  const [referralLink, setReferralLink] = useState('');
  const [isCopied, setIsCopied] = useState(false);
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

  const offerImage = PlaceHolderImages.find(
    (img) => img.id === 'recharge-offer-gift'
  );

  const handleShare = () => {
    if (referrals < REFERRAL_GOAL) {
      setReferrals(referrals + 1);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setIsCopied(true);
    toast({
      title: 'Copied to clipboard!',
      description: 'Now share the link with your friends.',
    });
    setTimeout(() => setIsCopied(false), 2000);
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
      setShowSuccessDialog(true);
    }
  };

  const progressValue = (referrals / REFERRAL_GOAL) * 100;
  const isGoalReached = referrals >= REFERRAL_GOAL;

  return (
    <>
      <Card className="overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl">
        <CardHeader className="p-0">
          {offerImage && (
            <div className="aspect-video overflow-hidden">
              <Image
                src={offerImage.imageUrl}
                alt={offerImage.description}
                data-ai-hint={offerImage.imageHint}
                width={600}
                height={400}
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          )}
          <div className="p-6 pb-2">
            <CardTitle className="text-2xl font-bold">
              New Year Free Recharge Offer!
            </CardTitle>
            <CardDescription className="text-md mt-1">
              Share with <strong>{REFERRAL_GOAL} friends</strong> & get a free
              recharge!
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-2">
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

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">
                Your Unique Referral Link
              </label>
              <div className="flex items-center gap-2">
                <Input
                  readOnly
                  value={referralLink}
                  placeholder="Generating link..."
                  className="bg-muted/50"
                  aria-label="Referral Link"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopyLink}
                  aria-label="Copy link"
                >
                  {isCopied ? (
                    <Check className="h-4 w-4 text-primary" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
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
                  Verifying...
                </>
              ) : (
                <>
                  <Gift className="mr-2 h-5 w-5" />
                  Claim Your Reward!
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
              Share with a Friend
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
              Congratulations!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              You've successfully referred {REFERRAL_GOAL} friends. Your free
              recharge from Mukesh Ambani is on its way. Happy New Year!
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
