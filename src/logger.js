const colors = {
  'red': '\x1b[31m%s\x1b[0m',
  'green': '\x1b[32m%s\x1b[0m',
}


export function withLogger(handler) {
  return async function loggedHandler(request, response) {
    const started = performance.now();
    // Registrera finish-lyssnaren här, före handlern.

    // 1st version log;
    
    response.once('finish', () => {
        const ms = Math.round(performance.now() - started);
        if (response.statusCode >= 200 && response.statusCode <= 299) {
          console.log(`${colors['green']}`, `${(new Date()).toISOString()} ${request.method} ${request.url} ${response.statusCode} ${ms}ms`);
        } else {
          console.log(`${colors['red']}`, `${(new Date()).toISOString()} ${request.method} ${request.url} ${response.statusCode} ${ms}ms`);
        }
    })

    return handler(request, response);
  };
}