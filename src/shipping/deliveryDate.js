// Estimated delivery date. Deliveries happen Monday to Friday only.
// Dates are handled in UTC so results do not depend on the server time zone.
function isWeekend(date) {
  const d = date.getUTCDay();
  return d === 0 || d === 6;
}

const MAX_DAYS = 100000;
const KEY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function holidayKey(value) {
  if (typeof value === 'string') {
    if (!KEY_PATTERN.test(value)) {
      throw new TypeError('holiday strings must look like YYYY-MM-DD');
    }
    return value;
  }
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  throw new TypeError('holidays must be valid Dates or YYYY-MM-DD strings');
}

// holidays: optional array of Dates or 'YYYY-MM-DD' strings that are not delivery days.
function addBusinessDays(start, days, holidays) {
  if (!(start instanceof Date) || Number.isNaN(start.getTime())) {
    throw new TypeError('start must be a valid Date');
  }
  if (typeof days !== 'number' || !Number.isFinite(days)) {
    throw new TypeError('days must be a finite number');
  }
  if (holidays === undefined || holidays === null) {
    holidays = [];
  }
  if (!Array.isArray(holidays)) {
    throw new TypeError('holidays must be an array');
  }
  const n = Math.trunc(days);
  if (Math.abs(n) > MAX_DAYS) {
    throw new RangeError('days is too large');
  }

  const off = new Set(holidays.map(holidayKey));
  const step = n < 0 ? -1 : 1;
  let remaining = Math.abs(n);
  const result = new Date(start.getTime());
  while (remaining > 0) {
    result.setUTCDate(result.getUTCDate() + step);
    if (!isWeekend(result) && !off.has(result.toISOString().slice(0, 10))) {
      remaining--;
    }
  }
  return result;
}

module.exports = { isWeekend, addBusinessDays };
