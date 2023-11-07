export default function calculateCalorie(type, distance, duration) {
  if (type === "Run") {
    return Math.floor((distance / 1000) * 60);
  } else if (type === "Swim") {
    return Math.floor((duration / 360) * 223);
  } else if (type === "Ride") {
    return Math.floor((duration / 360) * 300);
  }
}
