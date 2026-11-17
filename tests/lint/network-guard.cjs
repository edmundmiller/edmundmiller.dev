const { appendFileSync } = require('node:fs');

const net = require('node:net');

const { registerHooks, syncBuiltinESMExports } = require('node:module');

// TMPDIR stays in the repo for orb recovery. Isolate upstream's explicitly SDK-free consumer
// fixture from ancestor node_modules, as it would be when created outside the checkout.
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (context.parentURL?.includes('/diff-rules-vendored-') && specifier === 'ai') {
      const error = new Error('SDK intentionally absent from isolated consumer fixture');
      error.code = 'ERR_MODULE_NOT_FOUND';
      throw error;
    }

    return nextResolve(specifier, context);
  },
});

function checkHost(host) {
  if (['127.0.0.1', '::1', '[::1]', 'localhost'].includes(host)) return;

  if (process.env.ANTI_SLOP_NETWORK_AUDIT) {
    appendFileSync(process.env.ANTI_SLOP_NETWORK_AUDIT, 'blocked external network attempt\n');
  }

  throw new Error('External network is disabled in anti-slop tests');
}

const connect = net.Socket.prototype.connect;

net.Socket.prototype.connect = function (...args) {
  const options = Array.isArray(args[0]) ? args[0][0] : args[0];
  const host = options.host ?? (Number.isInteger(options) ? (args[1] ?? 'localhost') : 'localhost');
  checkHost(host);

  return connect.apply(this, args);
};

const fetch = globalThis.fetch;

globalThis.fetch = function (input, options) {
  checkHost(new URL(input.url ?? input).hostname);

  return fetch(input, options);
};

syncBuiltinESMExports();
