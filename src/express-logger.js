export default function logger(req, res, next) {
    const colors = {
        'red': '\x1b[31m%s\x1b[0m',
        'green': '\x1b[32m%s\x1b[0m',
    };
    const started = performance.now();
    // Registrera finish-lyssnaren här, före handlern.

    // 1st version log;
    
    res.once('finish', () => {
        const ms = Math.round(performance.now() - started);
        if (res.statusCode >= 200 && res.statusCode <= 299) {
          console.log(`${colors['green']}`, `${(new Date()).toISOString()} ${req.method} ${req.url} ${res.statusCode} ${ms}ms`);
        } else {
          console.log(`${colors['red']}`, `${(new Date()).toISOString()} ${req.method} ${req.url} ${res.statusCode} ${ms}ms`);
        }
    })

    // skicka vidare till nästa handler i request-reponse-kedjan
    next();
};