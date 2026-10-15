const colors = {
  'red': '\x1b[31m%s\x1b[0m',
  'green': '\x1b[32m%s\x1b[0m',
}

export function logger(request, response, next) {

    const started = performance.now();
    
    response.once('finish', () => {
        const ms = Math.round(performance.now() - started);
        if (response.statusCode >= 200 && response.statusCode <= 299) {
          console.log(`${colors['green']}`, `${(new Date()).toISOString()} ${request.method} ${request.url} ${response.statusCode} ${ms}ms`);
        } else {
          console.log(`${colors['red']}`, `${(new Date()).toISOString()} ${request.method} ${request.url} ${response.statusCode} ${ms}ms`);
        }
    })

    // skicka vidare requesten i kedjan
    next();
}