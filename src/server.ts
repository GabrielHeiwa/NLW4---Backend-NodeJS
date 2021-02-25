import "reflect-metadata";
import { app } from "./app";

app.listen(3333, 
    () => console.log("> Server running in http://localhost:3333/")
);