function applyDiscount(subtotal, discountAmount) {
  return Math.max(0, subtotal - discountAmount);
}

module.exports = { applyDiscount };
