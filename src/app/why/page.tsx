export default function WhyPage() {
  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-xl font-semibold">Why these habits?</h1>
        <p className="text-sm opacity-80">Gentle guidance for mono recovery</p>
      </header>

      <section className="card space-y-2">
        <h2 className="text-base font-semibold">Sleep 9–11 hours</h2>
        <p className="text-sm opacity-90">
          Your body heals during sleep. Longer sleep supports your immune system and may reduce fatigue.
        </p>
      </section>

      <section className="card space-y-2">
        <h2 className="text-base font-semibold">Eat gentle meals</h2>
        <p className="text-sm opacity-90">
          Smaller, balanced meals are easier to tolerate when youre tired or have a sore throat. Aim for protein,
          whole grains, fruits, and veggies as you can.
        </p>
      </section>

      <section className="card space-y-2">
        <h2 className="text-base font-semibold">Take medicine as directed</h2>
        <p className="text-sm opacity-90">
          Follow your clinicians guidance for pain, fever, and inflammation. Always check dosing and interactions.
        </p>
      </section>

      <section className="card space-y-2">
        <h2 className="text-base font-semibold">Hydrate often</h2>
        <p className="text-sm opacity-90">
          Fluids keep you hydrated and can soothe the throat. Water, broth, warm tea, and electrolyte drinks are good options.
        </p>
      </section>

      <section className="card space-y-2">
        <h2 className="text-base font-semibold">Light rest, avoid strain</h2>
        <p className="text-sm opacity-90">
          During recovery, avoid strenuous activity (especially contact sports) until cleared by your clinician due to spleen risk.
        </p>
      </section>

      <p className="text-xs opacity-70">
        This app is for supportive guidance only and doesnt replace medical advice. If symptoms worsen or you have concerns,
        contact your healthcare professional.
      </p>
    </div>
  );
}


