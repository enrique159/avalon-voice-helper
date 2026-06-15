export type PlayerCount = 5 | 6 | 7 | 8 | 9 | 10;
export type Allegiance = 'good' | 'evil';
export type RoleId = 'merlin' | 'assassin' | 'percival' | 'mordred' | 'morgana' | 'oberon';
export type NarrationMode = 'original' | 'simple';
export type TranslationValues = Record<string, string | number>;
export type Translate = (key: string, values?: TranslationValues) => string;

export interface Role {
  id: RoleId;
  name: string;
  allegiance: Allegiance;
  required: boolean;
  impact: 'bien' | 'mal' | 'neutral';
  summary: string;
}

export interface ScriptStep {
  id: string;
  title: string;
  text: string;
  tone: 'setup' | 'evil' | 'merlin' | 'percival' | 'open';
}

export interface AvalonDeck {
  good: number;
  evil: number;
  specialRoles: Role[];
  loyalServants: number;
  minions: number;
  total: number;
  isValid: boolean;
}

export const playerDistribution: Record<PlayerCount, { good: number; evil: number }> = {
  5: { good: 3, evil: 2 },
  6: { good: 4, evil: 2 },
  7: { good: 4, evil: 3 },
  8: { good: 5, evil: 3 },
  9: { good: 6, evil: 3 },
  10: { good: 6, evil: 4 }
};

export const questTeamSizes: Record<PlayerCount, [number, number, number, number, number]> = {
  5: [2, 3, 2, 3, 3],
  6: [2, 3, 4, 3, 4],
  7: [2, 3, 3, 4, 4],
  8: [3, 4, 4, 5, 5],
  9: [3, 4, 4, 5, 5],
  10: [3, 4, 4, 5, 5]
};

export const roles: Role[] = [
  {
    id: 'merlin',
    name: 'Merlín',
    allegiance: 'good',
    required: true,
    impact: 'bien',
    summary: 'Conoce a los agentes del mal, excepto Mordred si está en juego.'
  },
  {
    id: 'assassin',
    name: 'Asesino',
    allegiance: 'evil',
    required: true,
    impact: 'mal',
    summary: 'Tiene la oportunidad final de señalar a Merlín si el bien completa tres gestas.'
  },
  {
    id: 'percival',
    name: 'Perceval',
    allegiance: 'good',
    required: false,
    impact: 'bien',
    summary: 'Ve a Merlín; si Morgana participa, ve a ambos sin distinguirlos.'
  },
  {
    id: 'mordred',
    name: 'Mordred',
    allegiance: 'evil',
    required: false,
    impact: 'mal',
    summary: 'No se revela a Merlín durante el reconocimiento inicial.'
  },
  {
    id: 'morgana',
    name: 'Morgana',
    allegiance: 'evil',
    required: false,
    impact: 'mal',
    summary: 'Se muestra ante Perceval como si también pudiera ser Merlín.'
  },
  {
    id: 'oberon',
    name: 'Oberón',
    allegiance: 'evil',
    required: false,
    impact: 'bien',
    summary: 'No conoce al resto del mal y el resto del mal no lo reconoce al inicio.'
  }
];

export const optionalRoles = roles.filter((role) => !role.required);

export const defaultRoleIds: RoleId[] = ['merlin', 'assassin'];

export function buildDeck(playerCount: PlayerCount, selectedRoles: RoleId[]): AvalonDeck {
  const distribution = playerDistribution[playerCount];
  const selected = new Set([...defaultRoleIds, ...selectedRoles]);
  const specialRoles = roles.filter((role) => selected.has(role.id));
  const goodSpecials = specialRoles.filter((role) => role.allegiance === 'good');
  const evilSpecials = specialRoles.filter((role) => role.allegiance === 'evil');
  const loyalServants = distribution.good - goodSpecials.length;
  const minions = distribution.evil - evilSpecials.length;

  return {
    good: distribution.good,
    evil: distribution.evil,
    specialRoles,
    loyalServants,
    minions,
    total: distribution.good + distribution.evil,
    isValid: loyalServants >= 0 && minions >= 0
  };
}

export function buildOpeningScript(
  selectedRoles: RoleId[],
  narrationMode: NarrationMode,
  t: Translate
): ScriptStep[] {
  const selected = new Set<RoleId>(['merlin', 'assassin', ...selectedRoles]);
  const hasPercival = selected.has('percival');
  const hasMordred = selected.has('mordred');
  const hasMorgana = selected.has('morgana');
  const hasOberon = selected.has('oberon');
  const isSimple = narrationMode === 'simple';
  const evilName = t(isSimple ? 'narration.terms.evilNameSimple' : 'narration.terms.evilNameOriginal');
  const evilRevealLabel = hasOberon
    ? t('narration.labels.evilRevealWithOberon', { evilName })
    : t('narration.labels.evilReveal', { evilName });
  const merlinRevealLabel = hasMordred
    ? t('narration.labels.merlinRevealWithMordred', { evilName })
    : t('narration.labels.merlinReveal', { evilName });
  const evilGroupLabel = t(isSimple ? 'narration.terms.evilGroupSimple' : 'narration.terms.evilGroupOriginal');
  const otherEvilGroupLabel = t(
    isSimple ? 'narration.terms.otherEvilGroupSimple' : 'narration.terms.otherEvilGroupOriginal'
  );
  const percivalRevealLabel = t(
    hasMorgana ? 'narration.labels.percivalRevealWithMorgana' : 'narration.labels.percivalReveal'
  );

  const steps: ScriptStep[] = [
    {
      id: 'close-eyes',
      title: t('narration.steps.closeEyes.title'),
      text: t('narration.steps.closeEyes.text'),
      tone: 'setup'
    },
    {
      id: 'evil-open',
      title: t('narration.steps.evilOpen.title'),
      text: t('narration.steps.evilOpen.text', { evilRevealLabel, otherEvilGroupLabel }),
      tone: 'evil'
    },
    {
      id: 'evil-close',
      title: t('narration.steps.evilClose.title'),
      text: t('narration.steps.evilClose.text', { evilCloseLabel: evilName }),
      tone: 'evil'
    },
    {
      id: 'evil-thumbs',
      title: t('narration.steps.evilThumbs.title'),
      text: t('narration.steps.evilThumbs.text', { merlinRevealLabel }),
      tone: 'merlin'
    },
    {
      id: 'merlin-open',
      title: t('narration.steps.merlinOpen.title'),
      text: t('narration.steps.merlinOpen.text', { evilGroupLabel }),
      tone: 'merlin'
    },
    {
      id: 'evil-thumbs-down',
      title: t('narration.steps.evilThumbsDown.title'),
      text: t('narration.steps.evilThumbsDown.text', { evilCloseLabel: evilName }),
      tone: 'merlin'
    },
    {
      id: 'merlin-close',
      title: t('narration.steps.merlinClose.title'),
      text: t('narration.steps.merlinClose.text'),
      tone: 'merlin'
    }
  ];

  if (hasPercival) {
    steps.push(
      {
        id: 'merlin-morgana-thumbs',
        title: t('narration.steps.percivalThumbs.title'),
        text: t(
          hasMorgana ? 'narration.steps.percivalThumbs.textPlural' : 'narration.steps.percivalThumbs.textSingular',
          { percivalRevealLabel }
        ),
        tone: 'percival'
      },
      {
        id: 'percival-open',
        title: t('narration.steps.percivalOpen.title'),
        text: t(
          hasMorgana ? 'narration.steps.percivalOpen.textPlural' : 'narration.steps.percivalOpen.textSingular'
        ),
        tone: 'percival'
      },
      {
        id: 'merlin-morgana-down',
        title: t('narration.steps.merlinMorganaDown.title'),
        text: t(
          hasMorgana
            ? 'narration.steps.merlinMorganaDown.textPlural'
            : 'narration.steps.merlinMorganaDown.textSingular',
          { percivalRevealLabel }
        ),
        tone: 'percival'
      },
      {
        id: 'percival-close',
        title: t('narration.steps.percivalClose.title'),
        text: t('narration.steps.percivalClose.text'),
        tone: 'percival'
      }
    );
  }

  steps.push({
    id: 'everyone-open',
    title: t('narration.steps.everyoneOpen.title'),
    text: t('narration.steps.everyoneOpen.text'),
    tone: 'open'
  });

  return steps;
}
