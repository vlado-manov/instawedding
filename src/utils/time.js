export function formatTimeAgo(dateString) {
  const now = new Date();
  const then = new Date(dateString);
  const diffMs = now - then;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHrs = Math.floor(diffMins / 60);

  if (diffMins < 1) return "току-що";
  if (diffMins === 1) return "преди 1 минута";
  if (diffMins < 60) return `преди ${diffMins} минути`;

  if (diffHrs === 1) return "преди 1 час";
  return `преди ${diffHrs} часа`;
}
