export function getTesterProgress() {
  return JSON.parse(localStorage.getItem('testerProgress') || '{"points":0,"done":[]}');
}
export function setTesterProgress(progress: { points: number, done: number[] }) {
  localStorage.setItem('testerProgress', JSON.stringify(progress));
}
export function markChallengeDone(id: number, points: number) {
  const progress = getTesterProgress();
  if (!progress.done.includes(id)) {
    progress.done.push(id);
    progress.points += points;
    setTesterProgress(progress);
  }
}
export function isChallengeDone(id: number) {
  return getTesterProgress().done.includes(id);
}
export function getTesterPoints() {
  return getTesterProgress().points;
} 