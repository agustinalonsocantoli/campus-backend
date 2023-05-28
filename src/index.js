import app, { PORT } from './app.js';
import './database.js'

// SERVER
try {
    app.listen(PORT, () => {
        console.log(`Server Run`);
    })

} catch(err) {
    console.error(err);
}