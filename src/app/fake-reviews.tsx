'use client';

import { Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const reviews = [
  {
    name: 'Rohan S.',
    location: 'Mumbai, MH',
    avatarId: 'avatar-rohan',
    review:
      "Wow! I thought it was a joke, but I actually got a 3-month recharge for free! Just had to share with a few friends. Thank you, Mr. Ambani! Best New Year gift ever.",
  },
  {
    name: 'Priya K.',
    location: 'Delhi, DL',
    avatarId: 'avatar-priya',
    review:
      "This is 100% real! I completed the steps and my phone was recharged within minutes. The process was so simple. Don't miss this opportunity, everyone!",
  },
  {
    name: 'Amit P.',
    location: 'Bengaluru, KA',
    avatarId: 'avatar-amit',
    review:
      "Thanks, RechargeRelay! I was skeptical at first, but it works. My brother and I both got the free recharge. Spreading the word now!",
  },
  {
    name: 'Sunita M.',
    location: 'Kolkata, WB',
    avatarId: 'avatar-sunita',
    review:
      "My free 3-month recharge is active! Sharing is caring, and in this case, it's also rewarding. So happy I tried this offer.",
  },
  {
    name: 'Vikram Singh',
    location: 'Jaipur, RJ',
    avatarId: 'avatar-vikram',
    review:
      "Unbelievable offer! I shared it in my family WhatsApp group, and my progress bar filled up instantly. The reward was credited almost immediately. Truly amazing!",
  },
  {
    name: 'Anjali D.',
    location: 'Chennai, TN',
    avatarId: 'avatar-anjali',
    review:
      "This is the best New Year's surprise. I received my free recharge as promised. The website is easy to use and the instructions are clear. Thank you!",
  },
];

const ReviewCard = ({ review }: { review: (typeof reviews)[0] }) => {
  const avatarImage = PlaceHolderImages.find((img) => img.id === review.avatarId);
  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={avatarImage?.imageUrl}
              alt={review.name}
              data-ai-hint={avatarImage?.imageHint}
            />
            <AvatarFallback>
              {review.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{review.name}</p>
                <p className="text-xs text-muted-foreground">{review.location}</p>
              </div>
              <div className="flex items-center gap-0.5 text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
            </div>
            <p className="mt-2 text-sm text-foreground/80">"{review.review}"</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


export default function FakeReviews() {
  return (
    <Card className="mt-8">
      <CardHeader className="text-center">
        <CardTitle>Don't Just Take Our Word For It!</CardTitle>
      </CardHeader>
      <CardContent>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {reviews.map((review, index) => (
              <CarouselItem key={index}>
                <ReviewCard review={review} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-12" />
          <CarouselNext className="mr-12" />
        </Carousel>
      </CardContent>
    </Card>
  );
}
