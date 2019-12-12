import express from "express";

const app = express();
const port = 8080;

app.get( "/", ( req, res ): void => {
    res.send( "Hello world! Hello mars!" );
} );

app.listen(port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
