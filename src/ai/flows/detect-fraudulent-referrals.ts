'use server';

/**
 * @fileOverview Detects potentially fraudulent referral patterns.
 *
 * - detectFraudulentReferrals - A function to detect fraudulent referrals.
 * - DetectFraudulentReferralsInput - The input type for the detectFraudulentReferrals function.
 * - DetectFraudulentReferralsOutput - The return type for the detectFraudulentReferrals function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectFraudulentReferralsInputSchema = z.object({
  userId: z.string().describe('The ID of the user.'),
  referralCount: z.number().describe('The number of referrals made by the user.'),
  deviceFingerprint: z.string().describe('The device fingerprint of the user.'),
  ipAddress: z.string().describe('The IP address of the user.'),
});
export type DetectFraudulentReferralsInput = z.infer<
  typeof DetectFraudulentReferralsInputSchema
>;

const DetectFraudulentReferralsOutputSchema = z.object({
  isFraudulent: z
    .boolean()
    .describe(
      'Whether the referral pattern is potentially fraudulent (true) or not (false).'
    ),
  fraudulentReason: z
    .string()
    .describe('The reason why the referral pattern is considered fraudulent.'),
});
export type DetectFraudulentReferralsOutput = z.infer<
  typeof DetectFraudulentReferralsOutputSchema
>;

export async function detectFraudulentReferrals(
  input: DetectFraudulentReferralsInput
): Promise<DetectFraudulentReferralsOutput> {
  return detectFraudulentReferralsFlow(input);
}

const detectFraudulentReferralsPrompt = ai.definePrompt({
  name: 'detectFraudulentReferralsPrompt',
  input: {schema: DetectFraudulentReferralsInputSchema},
  output: {schema: DetectFraudulentReferralsOutputSchema},
  prompt: `You are an expert in fraud detection. Analyze the provided referral
  pattern and determine if it is potentially fraudulent.

  Consider factors such as the number of referrals, device fingerprint, and IP
  address.  Provide a reason for your determination.

  User ID: {{{userId}}}
  Referral Count: {{{referralCount}}}
  Device Fingerprint: {{{deviceFingerprint}}}
  IP Address: {{{ipAddress}}}

  Based on this information, determine if the referral pattern is fraudulent.
  Set the isFraudulent field to true if it is, and false if it is not. Provide
  a reason for your determination in the fraudulentReason field.
  Make sure the output is valid JSON.`,
});

const detectFraudulentReferralsFlow = ai.defineFlow(
  {
    name: 'detectFraudulentReferralsFlow',
    inputSchema: DetectFraudulentReferralsInputSchema,
    outputSchema: DetectFraudulentReferralsOutputSchema,
  },
  async input => {
    const {output} = await detectFraudulentReferralsPrompt(input);
    return output!;
  }
);
