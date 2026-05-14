export {Project};

class Project {
    #id;
    title;
    notes;
    toDosIds = [];

    constructor(title, notes, toDosIds) {
        this.#id = crypto.randomUUID();
        this.title = title;
        this.toDosIds = toDosIds;
        this.notes = notes;
    }

    get Id() {
        return this.#id;
    }
}