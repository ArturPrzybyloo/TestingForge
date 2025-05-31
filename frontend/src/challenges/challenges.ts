import React from 'react';

const challenges = [
  {
    id: 18,
    titleKey: 'challenge.accessibilityAudit.title',
    descriptionKey: 'challenge.accessibilityAudit.description',
    categoryKey: 'challenge.accessibilityAudit.category',
    difficultyKey: 'difficulty.medium',
    component: React.lazy(() => import('./Challenge18AccessibilityAudit')),
  },
];

export default challenges; 