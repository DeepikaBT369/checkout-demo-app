function chunk(list, size) {
  const out = [];
  for (let i = 0; i < list.length; i += size) {
    out.push({ items: list.slice(i, i + size) });
  }
  return out;
}

function paginate(list, page, pageSize) {
  const pages = chunk(list, pageSize);
  const target = pages[page - 1];
  return target ? target.items : [];
}

module.exports = { paginate, chunk };
