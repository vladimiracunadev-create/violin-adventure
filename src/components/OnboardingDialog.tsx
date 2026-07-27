import { useState } from "react";
import { useModalA11y } from "../hooks/useModalA11y";

export function OnboardingDialog({ onComplete }: {
  onComplete: (name: string, weeklyGoalMinutes: number) => void;
}) {
  const [name, setName] = useState("");
  const [weeklyGoal, setWeeklyGoal] = useState(45);
  const [adultSupport, setAdultSupport] = useState(false);
  const dialogRef = useModalA11y<HTMLElement>();

  return (
    <div className="dialog-backdrop welcome-backdrop" role="presentation">
      <article ref={dialogRef} className="lesson-dialog welcome-dialog" role="dialog" aria-modal="true" aria-labelledby="welcome-title" tabIndex={-1}>
        <header className="welcome-heading">
          <span className="welcome-violin" aria-hidden="true">🎻</span>
          <span className="eyebrow">PRIMERA CONFIGURACIÓN</span>
          <h1 id="welcome-title">¡Comencemos la aventura!</h1>
          <p>No necesitas una cuenta. El nombre y el progreso se guardarán solamente en este dispositivo.</p>
        </header>
        <div className="welcome-points">
          <div><strong>1</strong><span>Sesiones cortas y progresivas</span></div>
          <div><strong>2</strong><span>Sin publicidad ni competencia</span></div>
          <div><strong>3</strong><span>Con apoyo de una persona adulta o profesora</span></div>
        </div>
        <form onSubmit={(event: { preventDefault(): void }) => {
          event.preventDefault();
          if (!adultSupport) return;
          onComplete(name.trim() || "Violinista", weeklyGoal);
        }}>
          <label>Nombre o apodo
            <input autoComplete="nickname" type="text" value={name} maxLength={24} placeholder="Ejemplo: Sofía" onChange={(event: { target: HTMLInputElement }) => setName(event.target.value)} />
          </label>
          <label>Meta semanal
            <select value={weeklyGoal} onChange={(event: { target: HTMLSelectElement }) => setWeeklyGoal(Number(event.target.value))}>
              <option value={30}>30 minutos · comenzar con calma</option>
              <option value={45}>45 minutos · recomendada</option>
              <option value={60}>60 minutos · práctica frecuente</option>
              <option value={90}>90 minutos · con orientación docente</option>
            </select>
          </label>
          <label className="welcome-check">
            <input type="checkbox" checked={adultSupport} onChange={(event: { target: HTMLInputElement }) => setAdultSupport(event.target.checked)} />
            <span>Una persona adulta ayudará con el tamaño del violín, las clavijas, la postura y cualquier molestia física.</span>
          </label>
          <button className="primary-button" type="submit" disabled={!adultSupport}>Entrar a mi aventura</button>
        </form>
      </article>
    </div>
  );
}
