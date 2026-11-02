// Estimated delivery date. Deliveries happen Monday to Friday only.
// Dates are handled in UTC so results do not depend on the server time zone.
function isWeekend(date) {
  const d = date.getUTCDay();
  return d === 0 || d === 6;
}

const MS_PER_DAY = 24 * 60 * 60 * 1000;

// UTC calendar day number, ignoring time of day.
function dayNumber(date) {
  return Math.floor(date.getTime() / MS_PER_DAY);
}

// holidays: optional array of Date objects or ISO date strings (YYYY-MM-DD).
function addBusinessDays(start, days, holidays = []) {
  const blocked = new Set(holidays.map((h) => dayNumber(new Date(h))));
  const result = new Date(start.getTime());
  let remaining = days;
  while (remaining > 0) {
    result.setUTCDate(result.getUTCDate() + 1);
    if (!isWeekend(result) && !blocked.has(dayNumber(result))) {
      remaining--;
    }
  }
  return result;
}

module.exports = { isWeekend, addBusinessDays };
