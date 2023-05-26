import app, { PORT } from './app.js';

// SERVER
try {
    app.listen(PORT, () => {
        console.log(`Server Run`);
    })
} catch(err) {
    console.log(err);
}