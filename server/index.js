const app = require("./app");

const port = 3000;

// Actually start the server listening
app.listen(port, () => {
    console.log(`Server is now listening on port ${port}...`)
});
