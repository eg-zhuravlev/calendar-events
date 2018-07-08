import View from "./view";
import Model from "./model";
import Controller from "./controller";
import "../sass/main.sass";

const view = new View();
const model = new Model();
const controller = new Controller(model, view);

view.generate();