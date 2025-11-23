'use server';

import {
  detectFraudulentReferrals,
  type DetectFraudulentReferralsOutput,
} from '@/ai/flows/detect-fraudulent-referrals';

export async function checkForFraud(
  referralCount: number
): Promise<DetectFraudulentReferralsOutput> {
  // Simulate user data for the demo. In a real app, this would come
  // from the user's session and request data.
  const input = {
    userId: 'user-abc-123',
    referralCount: referralCount,
    deviceFingerprint: 'a1b2c3d4e5f6g7h8i9j0',
    ipAddress: '198.51.100.1',
  };

  try {
    const result = await detectFraudulentReferrals(input);
    // Add a small delay for demo purposes to show loading state
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return result;
  } catch (error) {
    console.error('Error in fraud detection:', error);
    // Return a non-fraudulent response in case of an error to not block the user in this demo
    return {
      isFraudulent: false,
      fraudulentReason: 'Fraud check service is currently unavailable.',
    };
  }
}
