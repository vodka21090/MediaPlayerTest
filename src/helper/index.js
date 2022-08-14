export const formatSeconds = (seconds) => {
  const [hour, minute, second, sign] =
    seconds > 0
      ? [seconds / 3600, (seconds / 60) % 60, seconds % 60, ""]
      : [-seconds / 3600, (-seconds / 60) % 60, -seconds % 60, "-"];
  if (Math.floor(hour) > 0) {
    return sign + [hour, minute, second].map((v) => `${Math.floor(v)}`.padStart(2, "0")).join(":");
  }
  return sign + [minute, second].map((v) => `${Math.floor(v)}`.padStart(2, "0")).join(":");
};
