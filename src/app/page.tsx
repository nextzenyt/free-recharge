import RechargeOffer from './recharge-offer';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 sm:p-8">
      <div className="w-full max-w-md">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold font-headline" style={{ color: 'hsl(var(--primary))' }}>
            RechargeRelay
          </h1>
          <p className="text-muted-foreground mt-2">
            Your New Year's Gift from Mukesh Ambani!
          </p>
        </header>
        <RechargeOffer />
        <footer className="text-center mt-8 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} RechargeRelay. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
