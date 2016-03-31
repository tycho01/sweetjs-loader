// #lang "sweet.js"

// export
syntax id = function (ctx) {
  let bodyCtx = ctx.next().value.inner();
  let result = #``;
  for (let stx of bodyCtx) {
    result = result.concat(#`${stx}`);
  }
  return result;
}
